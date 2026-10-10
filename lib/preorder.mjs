export const preorderConsentVersion = "2026-10-09-preorder-v1";
export const preorderSource = "prism-order-page";
export const preorderBodyLimit = 16 * 1024;

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/i;
const fields = ["fullName", "email", "company", "role", "useCase", "robot", "quantity", "updatesOptIn", "website"];
const successMessage = "You're on the Prism preorder list. We'll be in touch. No payment has been taken.";

/** Validate the values collected by the public interest form; metadata is server-owned. */
export function validatePreorder(input, now = new Date()) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, fields: { form: "Please complete the preorder form." } };
  }
  if (input.website !== undefined && input.website !== null && input.website !== "") {
    return { ok: false, fields: { form: "We couldn't save your request. Please try again." } };
  }

  const errors = {};
  function textField(name, label, maxLength, required = false, multiline = false) {
    const value = input[name];
    if (value === undefined || value === null || value === "") {
      if (required) errors[name] = `Enter your ${label}.`;
      return null;
    }
    if (typeof value !== "string") {
      errors[name] = `Enter a valid ${label}.`;
      return null;
    }
    const trimmed = value.trim();
    if ((required && !trimmed) || trimmed.length > maxLength
      || (multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/ : /[\u0000-\u001f\u007f]/).test(trimmed)) {
      errors[name] = `Enter ${required ? "your " : "a "}${label} in ${maxLength} characters or fewer.`;
      return null;
    }
    return trimmed || null;
  }

  const fullName = textField("fullName", "name", 120, true);
  const email = textField("email", "email address", 254, true)?.toLowerCase() ?? null;
  const company = textField("company", "company or lab", 160, true);
  const role = textField("role", "role", 120);
  const useCase = textField("useCase", "use case", 2000, false, true);
  const robot = textField("robot", "robot or platform", 200);
  if (email && !emailPattern.test(email)) errors.email = "Enter a valid email address.";

  let quantity = null;
  if (input.quantity !== undefined && input.quantity !== null && input.quantity !== "") {
    const value = input.quantity;
    const isIntegerInput = typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value.trim()));
    const parsed = isIntegerInput ? Number(value) : NaN;
    if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > 1000) {
      errors.quantity = "Enter a whole number from 1 to 1000, or leave this blank.";
    } else {
      quantity = parsed;
    }
  }

  const optIn = input.updatesOptIn;
  const updatesOptIn = optIn === true || optIn === "true" || optIn === "on" || optIn === "1";
  if (![undefined, null, false, true, "", "false", "true", "off", "on", "0", "1"].includes(optIn)) {
    errors.updatesOptIn = "Choose whether you would like Prism updates.";
  }
  if (Object.keys(errors).length) return { ok: false, fields: errors };

  const timestamp = now.toISOString();
  return {
    ok: true,
    data: {
      fullName, email, company, role, useCase, robot, quantity, updatesOptIn,
      source: preorderSource,
      consentVersion: preorderConsentVersion,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
}

function sameOrigin(request) {
  const expected = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (origin !== null) return origin === expected;
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    return new URL(referer).origin === expected;
  } catch {
    return false;
  }
}

async function readLimitedBody(request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > preorderBodyLimit) throw new RangeError("Body too large");
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing body");
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > preorderBodyLimit) {
        await reader.cancel();
        throw new RangeError("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function reply(request, status, payload) {
  const json = request.headers.get("content-type")?.toLowerCase().startsWith("application/json")
    || request.headers.get("accept")?.toLowerCase().includes("application/json");
  const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (json) return Response.json(payload, { status, headers });
  const saved = status === 200 && payload.ok === true;
  const title = saved ? "You're on the list" : "We couldn't save your request";
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>${escapeHtml(title)} — The Light Company</title>
    <style>
      *{box-sizing:border-box}body{margin:0;background:#fff;color:#101820;font-family:Arial,Helvetica,sans-serif;line-height:1.5}
      main{max-width:700px;margin:12vh auto;padding:32px}small{display:block;margin-bottom:32px;font-weight:700;letter-spacing:.08em}
      h1{font-size:clamp(32px,7vw,56px);line-height:1.08;letter-spacing:-.04em;margin:0 0 24px}p{font-size:18px;max-width:540px;margin:0 0 32px}
      nav{display:flex;flex-wrap:wrap;gap:16px 28px}a{color:#006e8e;text-underline-offset:5px}a:focus-visible{outline:3px solid #00bce4;outline-offset:5px}
    </style>
  </head>
  <body><main><small>THE LIGHT COMPANY / PRISM</small><h1>${escapeHtml(title)}</h1><p>${escapeHtml(payload.message)}</p>
    <nav aria-label="Next steps"><a href="${saved ? "/order" : "/order#preorder"}">${saved ? "Back to Prism" : "Back to the form"}</a><a href="/robotics">Explore Robotics</a></nav>
  </main></body>
</html>`;
  headers["Content-Type"] = "text/html; charset=utf-8";
  return new Response(html, { status: status === 422 ? 400 : status, headers });
}

/** Process a request using an injected persistence callback; no success is returned before it completes. */
export async function handlePreorderRequest(request, save, now = new Date()) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } });
  }
  if (!sameOrigin(request)) {
    return reply(request, 403, { ok: false, error: "origin", message: "Submit this form from the Prism order page." });
  }

  const contentType = request.headers.get("content-type") ?? "";
  const type = contentType.split(";")[0].trim().toLowerCase();
  if (!["application/json", "application/x-www-form-urlencoded", "multipart/form-data"].includes(type)) {
    return reply(request, 415, { ok: false, error: "format", message: "Please submit the preorder form." });
  }

  let input;
  try {
    const body = await readLimitedBody(request);
    if (type === "application/json") {
      input = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body));
    } else {
      const form = await new Response(body, { headers: { "Content-Type": contentType } }).formData();
      input = {};
      for (const name of fields) {
        if (form.getAll(name).length > 1) throw new SyntaxError("Duplicate field");
        const value = form.get(name);
        if (value !== null) input[name] = value;
      }
    }
  } catch (error) {
    const tooLarge = error instanceof RangeError;
    return reply(request, tooLarge ? 413 : 400, {
      ok: false,
      error: tooLarge ? "too-large" : "invalid-body",
      message: tooLarge ? "Your request is too long. Please shorten it and try again." : "We couldn't read your request. Please try again.",
    });
  }

  const validated = validatePreorder(input, now);
  if (!validated.ok) {
    return reply(request, 422, { ok: false, error: "validation", message: "Please check the form and try again.", fields: validated.fields });
  }
  try {
    await save(validated.data);
    return reply(request, 200, { ok: true, message: successMessage });
  } catch {
    return reply(request, 503, { ok: false, error: "unavailable", message: "We couldn't save your request. Please try again or email hi@lightcompany.ai." });
  }
}
