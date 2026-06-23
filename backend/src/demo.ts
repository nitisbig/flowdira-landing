/**
 * Book-a-demo — request validation + transactional email via Resend.
 *
 * Mirrors the durable-guard style of chat.ts: regardless of rate limiting, a
 * single request can never exceed the per-field caps. A valid submission is
 * emailed to the owner (DEMO_TO, with reply_to set to the visitor) plus a
 * best-effort confirmation auto-reply to the visitor — the auto-reply is
 * non-fatal so a Resend rejection (e.g. before domain verification) never
 * fails the whole request.
 */
import type { Env } from "./env";

export interface DemoSubmission {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  budget: string;
  timeline: string;
}

export interface DemoConfig {
  maxMessageChars: number;
}

const MAX_NAME = 120;
const MAX_COMPANY = 160;
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const CONTACT = "contact@flowdira.com";

// Conservative single-line check — we filter typos/abuse, not RFC-validate.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fixed allowlists — anything else is coerced to "" so the form can't inject junk.
const SERVICES = ["Design", "Development", "AI integration", "Not sure"];
const BUDGETS = ["< $1k", "$1k–$3k", "$3k–$8k", "$8k+", "Not sure"];
const TIMELINES = ["ASAP", "1–3 months", "Flexible"];

function toInt(value: string | undefined, fallback: number): number {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function parseDemoConfig(env: Env): DemoConfig {
  return { maxMessageChars: toInt(env.MAX_DEMO_MESSAGE_CHARS, 2000) };
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function pick(value: unknown, allowed: string[]): string {
  const v = str(value);
  return allowed.includes(v) ? v : "";
}

function emptySubmission(): DemoSubmission {
  return { name: "", email: "", company: "", service: "", message: "", budget: "", timeline: "" };
}

export type DemoValidation =
  | { ok: true; bot: boolean; data: DemoSubmission }
  | { ok: false; error: string };

/**
 * Validate the booking body. On success returns a cleaned submission; `bot`
 * is true when the honeypot was filled, signalling the caller to accept the
 * request silently (HTTP 200) without sending any email.
 */
export function validateDemo(body: unknown, cfg: DemoConfig): DemoValidation {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Request body must be a JSON object." };
  }
  const b = body as Record<string, unknown>;

  // Honeypot: real users never see/fill this. If present, accept silently.
  if (str(b.company_url) !== "") {
    return { ok: true, bot: true, data: emptySubmission() };
  }

  const name = str(b.name);
  const email = str(b.email);
  const message = str(b.message);

  if (name === "") return { ok: false, error: "Please enter your name." };
  if (name.length > MAX_NAME) return { ok: false, error: "That name is too long." };
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (message === "") {
    return { ok: false, error: "Please tell us a little about your project." };
  }
  if (message.length > cfg.maxMessageChars) {
    return {
      ok: false,
      error: `Please keep your message under ${cfg.maxMessageChars} characters.`,
    };
  }

  return {
    ok: true,
    bot: false,
    data: {
      name,
      email,
      company: str(b.company).slice(0, MAX_COMPANY),
      service: pick(b.service, SERVICES),
      message,
      budget: pick(b.budget, BUDGETS),
      timeline: pick(b.timeline, TIMELINES),
    },
  };
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

interface ResendPayload {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  reply_to: string;
}

async function sendEmail(env: Env, payload: ResendPayload): Promise<boolean> {
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend unreachable", err);
    return false;
  }
}

/** Owner notification — formatted lead, with reply_to pointed at the visitor. */
function ownerEmail(env: Env, d: DemoSubmission): ResendPayload {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Company / site", d.company],
    ["Service", d.service],
    ["Budget", d.budget],
    ["Timeline", d.timeline],
  ].filter((r): r is [string, string] => r[1] !== "");

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nProject details:\n${d.message}`;

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 14px 4px 0;color:#6c6555">${escapeHtml(k)}</td>` +
        `<td style="padding:4px 0;color:#16140d"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("");

  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#16140d">
<h2 style="margin:0 0 14px;font-size:18px">New demo request</h2>
<table style="border-collapse:collapse;font-size:14px">${htmlRows}</table>
<p style="margin:18px 0 4px;color:#6c6555;font-size:13px">Project details</p>
<p style="white-space:pre-wrap;margin:0;font-size:14px">${escapeHtml(d.message)}</p>
</div>`;

  return {
    from: env.DEMO_FROM,
    to: env.DEMO_TO,
    reply_to: d.email,
    subject: `New demo request — ${d.name}`,
    text,
    html,
  };
}

/** Visitor confirmation auto-reply. */
function visitorEmail(env: Env, d: DemoSubmission): ResendPayload {
  const text = `Hi ${d.name},

Thanks for booking a demo with Flowdira — we've received your request and will reply within one business day.

Here's a copy of what you sent:
${d.message}

Talk soon,
The Flowdira team
${CONTACT}`;

  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#16140d">
<p>Hi ${escapeHtml(d.name)},</p>
<p>Thanks for booking a demo with <strong>Flowdira</strong> — we've received your request and will reply within one business day.</p>
<p style="color:#6c6555;font-size:13px">Here's a copy of what you sent:</p>
<blockquote style="margin:0;padding:8px 14px;border-left:3px solid #c9a86a;white-space:pre-wrap">${escapeHtml(d.message)}</blockquote>
<p>Talk soon,<br>The Flowdira team</p>
</div>`;

  return {
    from: env.DEMO_FROM,
    to: d.email,
    reply_to: env.DEMO_TO,
    subject: "We got your demo request — Flowdira",
    text,
    html,
  };
}

/**
 * Send the owner notification (required) and a visitor confirmation
 * (best-effort). Returns whether the owner email — the one that matters —
 * was accepted by Resend.
 */
export async function sendDemoEmails(env: Env, d: DemoSubmission): Promise<boolean> {
  const ownerOk = await sendEmail(env, ownerEmail(env, d));
  // Best-effort: before domain verification Resend rejects sends to arbitrary
  // addresses, which must not fail the whole request.
  await sendEmail(env, visitorEmail(env, d));
  return ownerOk;
}
