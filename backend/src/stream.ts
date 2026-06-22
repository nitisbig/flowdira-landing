/**
 * Transform an upstream OpenAI-compatible SSE stream into clean, provider-neutral
 * frames the browser client can consume without knowing the provider's shape:
 *
 *   data: {"delta":"some text"}\n\n      (one per content chunk)
 *   data: [DONE]\n\n                     (exactly once, at the end)
 *
 * Robustness:
 * - Buffers across network chunks (an SSE line can be split mid-flight).
 * - Skips keep-alives, role-only deltas, and malformed JSON lines.
 * - Processes any trailing buffered line on flush before emitting [DONE].
 */

const encoder = new TextEncoder();

/** Parse one raw SSE line; enqueue a clean delta frame if it carries content. */
function processLine(raw: string, controller: TransformStreamDefaultController<Uint8Array>): void {
  const line = raw.trim();
  if (!line.startsWith("data:")) return;

  const data = line.slice(5).trim();
  if (data === "" || data === "[DONE]") return;

  try {
    const json = JSON.parse(data) as {
      choices?: Array<{ delta?: { content?: unknown } }>;
    };
    const delta = json.choices?.[0]?.delta?.content;
    if (typeof delta === "string" && delta.length > 0) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
    }
  } catch {
    // Ignore malformed/partial JSON lines.
  }
}

export function transformUpstreamSSE(
  upstream: ReadableStream<Uint8Array>,
): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  let buffer = "";

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      // Keep the last (possibly partial) line buffered for the next chunk.
      buffer = lines.pop() ?? "";
      for (const line of lines) processLine(line, controller);
    },
    flush(controller) {
      buffer += decoder.decode();
      if (buffer.length > 0) processLine(buffer, controller);
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
    },
  });

  return upstream.pipeThrough(transform);
}
