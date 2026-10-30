import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { handlePreorderRequest, preorderBodyLimit, validatePreorder } from "../lib/preorder.mjs";
import { savePreorderInterest } from "../lib/preorder-store.mjs";

const origin = "https://lightcompany.ai";
const timestamp = new Date("2026-10-09T12:00:00.000Z");
const input = { fullName: "Ada Example", email: "Ada+Prism@Example.com", company: "Example Lab" };
function jsonRequest(value = input, headers = {}) {
  return new Request(`${origin}/api/preorder`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin, ...headers },
    body: JSON.stringify(value),
  });
}

test("validates and normalizes an interest record while keeping metadata server-owned", () => {
  const result = validatePreorder({
    ...input,
    fullName: "  Ada Example  ",
    company: " Example Lab ",
    role: "Researcher",
    useCase: "Compare policies.\nKeep the same setup.",
    robot: "Example arm",
    quantity: "2",
    updatesOptIn: "on",
    source: "untrusted",
    createdAt: "untrusted",
    consentVersion: "untrusted",
  }, timestamp);
  assert.equal(result.ok, true);
  assert.deepEqual(result.data, {
    fullName: "Ada Example", email: "ada+prism@example.com", company: "Example Lab",
    role: "Researcher", useCase: "Compare policies.\nKeep the same setup.", robot: "Example arm",
    quantity: 2, updatesOptIn: true, source: "prism-order-page",
    consentVersion: "2026-10-09-preorder-v1", createdAt: timestamp.toISOString(), updatedAt: timestamp.toISOString(),
  });
  const minimal = validatePreorder(input, timestamp).data;
  assert.equal(minimal.updatesOptIn, false);
  assert.equal(minimal.quantity, null);
  assert.equal(minimal.useCase, null);
  assert.equal(validatePreorder({ ...input, email: "person@research.example.co.uk" }).ok, true);
});

test("rejects missing required fields, malformed input, field overflow, and invalid optional values", () => {
  for (const value of [null, [], "Ada", 1, {}, { ...input, website: "bot.example" }]) {
    assert.equal(validatePreorder(value).ok, false);
  }
  const cases = [
    ["fullName", " "], ["fullName", "x".repeat(121)], ["fullName", { name: "Ada" }],
    ["email", "not-an-email"], ["email", "a@b\n.example"], ["email", `${"x".repeat(250)}@example.com`],
    ["company", ""], ["company", "x".repeat(161)], ["role", "x".repeat(121)],
    ["robot", "x".repeat(201)], ["useCase", "x".repeat(2001)], ["useCase", "text\0text"],
    ["quantity", 0], ["quantity", -1], ["quantity", 1001], ["quantity", 1.5],
    ["quantity", "1e2"], ["quantity", "NaN"], ["quantity", true], ["updatesOptIn", "yes please"],
  ];
  for (const [field, value] of cases) {
    const result = validatePreorder({ ...input, [field]: value });
    assert.equal(result.ok, false, field);
    assert.ok(result.fields[field], field);
  }
  for (const updatesOptIn of [undefined, null, false, "false", "off", "0", ""]) {
    assert.equal(validatePreorder({ ...input, updatesOptIn }).data.updatesOptIn, false);
  }
});

test("JSON success is returned only after persistence completes, without echoing personal data", async () => {
  let finish;
  const pendingSave = new Promise((resolve) => { finish = resolve; });
  let saved;
  let completed = false;
  const pendingResponse = handlePreorderRequest(jsonRequest(), async (record) => {
    saved = record;
    await pendingSave;
  }, timestamp).then((response) => { completed = true; return response; });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(saved.email, "ada+prism@example.com");
  assert.equal(completed, false);
  finish();
  const response = await pendingResponse;
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.match(body.message, /preorder list/);
  assert.match(body.message, /No payment has been taken/);
  assert.doesNotMatch(JSON.stringify(body), /Ada|Example Lab|@example.com/);
});

test("rejects cross-origin or unidentified-origin submissions before persistence", async () => {
  let saves = 0;
  for (const Origin of ["https://evil.example", "https://lightcompany.ai.evil.example", "null", "http://lightcompany.ai"]) {
    const response = await handlePreorderRequest(jsonRequest(input, { Origin }), async () => { saves++; });
    assert.equal(response.status, 403);
  }
  const unidentified = jsonRequest();
  unidentified.headers.delete("origin");
  assert.equal((await handlePreorderRequest(unidentified, async () => { saves++; })).status, 403);
  const sameOriginReferer = jsonRequest(input, { Referer: `${origin}/order` });
  sameOriginReferer.headers.delete("origin");
  assert.equal((await handlePreorderRequest(sameOriginReferer, async () => { saves++; })).status, 200);
  assert.equal(saves, 1);
});

test("invalid or honeypot-filled submissions never return success or write a record", async () => {
  let saves = 0;
  for (const payload of [null, {}, { ...input, email: "invalid" }, { ...input, website: "filled" }]) {
    const response = await handlePreorderRequest(jsonRequest(payload), async () => { saves++; });
    assert.equal(response.status, 422);
    assert.equal((await response.json()).ok, false);
  }
  assert.equal(saves, 0);
});

test("persistence failures return retry guidance rather than a saved confirmation", async () => {
  const response = await handlePreorderRequest(jsonRequest(), async () => { throw new Error("private DB details"); });
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.ok, false);
  assert.equal(body.error, "unavailable");
  assert.match(body.message, /couldn't save/);
  assert.doesNotMatch(JSON.stringify(body), /private DB details/);
});

test("native forms receive a direct saved receipt while JSON and multipart submissions remain supported", async () => {
  const request = () => new Request(`${origin}/api/preorder`, {
    method: "POST", headers: { Origin: origin }, body: new URLSearchParams(input),
  });
  let saved;
  const response = await handlePreorderRequest(request(), async (record) => { saved = record; });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null);
  assert.match(response.headers.get("content-type"), /^text\/html/);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const receipt = await response.text();
  assert.match(receipt, /<h1>You&#39;re on the list<\/h1>/);
  assert.match(receipt, /No payment has been taken/);
  assert.match(receipt, /href="\/order"/);
  assert.match(receipt, /href="\/robotics"/);
  assert.doesNotMatch(receipt, /Ada|Example Lab|@example.com|preorder=saved/);
  assert.equal(saved.email, "ada+prism@example.com");
  const jsonForm = request();
  jsonForm.headers.set("accept", "application/json");
  assert.equal((await handlePreorderRequest(jsonForm, async () => {})).status, 200);
  const failure = await handlePreorderRequest(request(), async () => { throw new Error("offline"); });
  assert.equal(failure.status, 503);
  assert.equal(failure.headers.get("location"), null);
  const failureHtml = await failure.text();
  assert.match(failureHtml, /href="\/order#preorder"/);
  assert.match(failureHtml, /We couldn&#39;t save your request/);
  assert.doesNotMatch(failureHtml, /on the list|offline/);
  let invalidSaved = false;
  const invalidRequest = new Request(`${origin}/api/preorder`, {
    method: "POST", headers: { Origin: origin }, body: new URLSearchParams({ ...input, email: "bad" }),
  });
  const invalid = await handlePreorderRequest(invalidRequest, async () => { invalidSaved = true; });
  assert.equal(invalid.status, 400);
  assert.equal(invalidSaved, false);
  const invalidHtml = await invalid.text();
  assert.match(invalidHtml, /Please check the form and try again/);
  assert.match(invalidHtml, /href="\/order#preorder"/);
  assert.doesNotMatch(invalidHtml, /on the list/);
  const boundary = "CaseSensitiveBoundaryABC";
  const multipartBody = Object.entries(input).map(([name, value]) =>
    `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`).join("") + `--${boundary}--\r\n`;
  const multipart = new Request(`${origin}/api/preorder`, {
    method: "POST", headers: { Origin: origin, "Content-Type": `multipart/form-data; boundary=${boundary}`, Accept: "application/json" }, body: multipartBody,
  });
  assert.equal((await handlePreorderRequest(multipart, async () => {})).status, 200);
});

test("bounds payload bytes and rejects malformed, duplicate, and unsupported bodies", async () => {
  let saves = 0;
  const save = async () => { saves++; };
  const oversized = new Request(`${origin}/api/preorder`, {
    method: "POST", headers: { Origin: origin, "Content-Type": "application/json" },
    body: "x".repeat(preorderBodyLimit + 1),
  });
  assert.equal((await handlePreorderRequest(oversized, save)).status, 413);
  const oversizedHeader = jsonRequest(input, { "Content-Length": String(preorderBodyLimit + 1) });
  assert.equal((await handlePreorderRequest(oversizedHeader, save)).status, 413);
  const broken = new Request(`${origin}/api/preorder`, {
    method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: "{",
  });
  assert.equal((await handlePreorderRequest(broken, save)).status, 400);
  const unsupported = jsonRequest(input, { "Content-Type": "text/plain", Accept: "application/json" });
  assert.equal((await handlePreorderRequest(unsupported, save)).status, 415);
  const duplicates = new URLSearchParams(input);
  duplicates.append("email", "other@example.com");
  const duplicateRequest = new Request(`${origin}/api/preorder`, {
    method: "POST", headers: { Origin: origin, Accept: "application/json" }, body: duplicates,
  });
  assert.equal((await handlePreorderRequest(duplicateRequest, save)).status, 400);
  assert.equal((await handlePreorderRequest(new Request(`${origin}/api/preorder`), save)).status, 405);
  assert.equal(saves, 0);
});

test("the additive migration saves one canonical record and duplicates cannot change personal data or consent", async () => {
  const database = new DatabaseSync(":memory:");
  try {
    const journal = JSON.parse(await readFile(new URL("../drizzle/meta/_journal.json", import.meta.url), "utf8"));
    for (const migration of journal.entries) {
      database.exec(await readFile(new URL(`../drizzle/${migration.tag}.sql`, import.meta.url), "utf8"));
    }
    const binding = {
      prepare(sql) {
        const statement = database.prepare(sql);
        return { bind(...values) {
          return { async run() {
            const result = statement.run(...values);
            return { success: true, meta: { changes: Number(result.changes) } };
          } };
        } };
      },
    };
    const hostileName = "Ada'); DROP TABLE rsvps; --";
    const firstInput = {
      ...input, fullName: hostileName, role: "Researcher", useCase: "Original use case",
      robot: "Original robot", quantity: 2, updatesOptIn: false,
    };
    const save = (record) => savePreorderInterest(binding, record);
    const firstResponse = await handlePreorderRequest(jsonRequest(firstInput), save, timestamp);
    assert.equal(firstResponse.status, 200);
    const beforeDuplicate = database.prepare("SELECT * FROM preorder_interest").get();
    const later = new Date("2026-10-10T12:00:00.000Z");
    const duplicateResponse = await handlePreorderRequest(jsonRequest({
      ...input, email: "ADA+PRISM@EXAMPLE.COM", fullName: "Different Person", company: "Changed Lab",
      role: "Changed role", useCase: "Changed use case", robot: "Changed robot", quantity: 4,
      updatesOptIn: true, source: "changed-source", consentVersion: "changed-consent-version",
    }), save, later);
    assert.equal(duplicateResponse.status, 200);
    assert.deepEqual(await duplicateResponse.json(), await firstResponse.json());
    assert.equal(database.prepare("SELECT COUNT(*) AS count FROM preorder_interest").get().count, 1);
    const row = database.prepare("SELECT * FROM preorder_interest").get();
    assert.deepEqual(row, beforeDuplicate);
    assert.equal(row.full_name, hostileName);
    assert.equal(row.email, "ada+prism@example.com");
    assert.equal(row.company, "Example Lab");
    assert.equal(row.quantity, 2);
    assert.equal(row.updates_opt_in, 0);
    assert.equal(row.created_at, timestamp.toISOString());
    assert.equal(row.updated_at, timestamp.toISOString());
    assert.equal(row.consent_version, "2026-10-09-preorder-v1");
    assert.equal(database.prepare("SELECT COUNT(*) AS count FROM rsvps").get().count, 0);
  } finally {
    database.close();
  }
});

test("D1 failures or unexpected write counts cannot return a successful acknowledgment", async () => {
  for (const result of [undefined, { success: false }, { success: true }, { success: true, meta: { changes: 2 } }, { success: true, meta: { changes: "0" } }]) {
    const binding = { prepare() { return { bind() { return { run: async () => result }; } }; } };
    await assert.rejects(savePreorderInterest(binding, validatePreorder(input).data), /not persisted/);
  }
});
