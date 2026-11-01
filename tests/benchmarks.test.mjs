import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { benchmark, rankModels, summarize, sweeps } from "../public/site/benchmarks/data.mjs";

test("benchmark completion is calculated from valid counts and preserves missing evidence", () => {
  assert.deepEqual(summarize(benchmark.models[0]), { completed: 52, trials: 60, score: 52 / 60 * 100 });
  assert.equal(summarize({ results: { a: [1, 2], b: [9, 10] } }).score, 10 / 12 * 100);
  assert.equal(summarize({ results: { a: [0, 0] } }).score, null);
  assert.equal(summarize({ results: { a: [0, 2] } }).score, 0);
  assert.throws(() => summarize({ results: { a: [3, 2] } }), RangeError);
  assert.throws(() => summarize(benchmark.models[0], "unknown"), RangeError);
  const tied = rankModels("placement");
  assert.equal(tied[0].score, tied[1].score);
  assert.equal(rankModels()[0].id, "gemini");
});

test("illustrative sweeps keep untested cells separate from failed trials", () => {
  assert.equal(benchmark.status, "illustrative");
  for (const sweep of Object.values(sweeps)) {
    assert.equal(sweep.values.length, 30);
    assert.ok(sweep.values.includes(null));
    assert.ok(sweep.values.every((value) => value === null || Number.isInteger(value) && value >= 0 && value <= 12));
  }
});

test("both publishing paths include the benchmark page, assets and honest preview labels", async () => {
  const root = new URL("../.pages-dist/", import.meta.url);
  const html = await readFile(new URL("benchmarks/index.html", root), "utf8");
  assert.match(html, /Illustrative preview/);
  assert.match(html, /not measured results/);
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.match(html, /Abstract/);
  for (const path of new Set([...html.matchAll(/(?:src|href)="(\/site\/[^"?#]+)/g)].map((m) => m[1]))) await access(new URL(path.slice(1), root));
  for (const route of ["index.html", "prism/index.html"]) {
    assert.match(await readFile(new URL(route, root), "utf8"), /data-benchmark-open aria-haspopup="dialog"/);
  }
  assert.match(await readFile(new URL("../app/benchmarks/route.ts", import.meta.url), "utf8"), /site\/benchmarks.html\?raw/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), id);
});
