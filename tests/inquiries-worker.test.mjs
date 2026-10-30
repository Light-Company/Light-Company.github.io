import assert from "node:assert/strict";
import test from "node:test";
import worker from "../workers/inquiries/src/index.mjs";
import { inquiryEmail } from "../workers/inquiries/src/email.mjs";

function fakeDb() {
  const rows = [];
  return { rows, prepare: () => ({ bind: (...values) => ({ run: async () => { rows.push(values); return { success: true, meta: { changes: 1 } }; } }) }) };
}
const post = (body, origin = "https://lightcompany.ai") => new Request("https://lightcompany.ai/api/preorder", {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json", Origin: origin },
  body: JSON.stringify(body),
});

test("stores the lead, then emails Jon with reply-to set to the visitor", async () => {
  const DB = fakeDb(), sent = [], waits = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => { sent.push({ url, body: JSON.parse(init.body) }); return new Response("{}", { status: 200 }); };
  try {
    const env = { DB, RESEND_API_KEY: "test", NOTIFY_TO: "jon@lightcompany.ai", NOTIFY_FROM: "Prism inquiries <inquiries@lightcompany.ai>" };
    const res = await worker.fetch(post({ fullName: "Ada", email: "Ada@Lab.org", company: "Lab", useCase: "Pick & place <cups>" }), env, { waitUntil: (p) => waits.push(p) });
    await Promise.all(waits);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).ok, true);
    assert.equal(DB.rows.length, 1);
    assert.equal(sent[0].url, "https://api.resend.com/emails");
    assert.deepEqual(sent[0].body.to, ["jon@lightcompany.ai"]);
    assert.equal(sent[0].body.reply_to, "ada@lab.org");
    assert.match(sent[0].body.subject, /Ada, Lab/);
    assert.match(sent[0].body.html, /Pick &amp; place &lt;cups&gt;/);
  } finally { globalThis.fetch = realFetch; }
});

test("a mail outage never loses the lead or fails the visitor", async () => {
  const DB = fakeDb(), waits = [];
  const env = { DB, NOTIFY_TO: "jon@lightcompany.ai" }; // no API key
  const realError = console.error; console.error = () => {};
  try {
    const res = await worker.fetch(post({ fullName: "Ada", email: "ada@lab.org", company: "Lab" }), env, { waitUntil: (p) => waits.push(p) });
    await Promise.all(waits);
    assert.equal(res.status, 200);
    assert.equal(DB.rows.length, 1);
  } finally { console.error = realError; }
});

test("rejects other origins and unknown paths without storing anything", async () => {
  const DB = fakeDb();
  assert.equal((await worker.fetch(post({ fullName: "A", email: "a@b.co", company: "C" }, "https://evil.example"), { DB }, { waitUntil() {} })).status, 403);
  assert.equal((await worker.fetch(new Request("https://lightcompany.ai/api/other", { method: "POST" }), { DB }, { waitUntil() {} })).status, 404);
  assert.equal(DB.rows.length, 0);
});

test("email body leaves out empty fields", () => {
  const mail = inquiryEmail({ fullName: "A", email: "a@b.co", company: "C", role: null, quantity: null, updatesOptIn: false, source: "prism-order-page", createdAt: "2026-10-30T00:00:00Z" });
  assert.doesNotMatch(mail.text, /Role|Stations/);
  assert.match(mail.text, /Product updates: No/);
});
