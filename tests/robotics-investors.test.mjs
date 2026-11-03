import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { cells, successRate, cellChange, coverageSummary, nextTest, caseFromHash, annualSoftwareRevenue, annualRevenue, STATION, buildIllustrativeCase } from '../public/site/robotics-investors/model.mjs';

const cell = id => cells.find(item => item.id === id);

test('illustrative cases compare the same physical conditions with matched valid trials', () => {
  assert.equal(new Set(cells.map(c => c.id)).size, 36);
  for (const c of cells) {
    assert.equal(c.earlier.trials, c.newer.trials);
    assert.ok(c.x > 0 && c.y > 0 && c.tolerance > 0);
    for (const result of [c.earlier, c.newer]) {
      assert.ok(result.successes >= 0 && result.successes <= result.trials);
    }
  }
  assert.deepEqual(coverageSummary(), { sampled: 28, positions: 36, earlierTrials: 560, newerTrials: 560, trialsPerModel: 560 });
});

test('scores preserve zero outcomes, missing evidence, regressions, and valid denominators', () => {
  assert.equal(successRate(cell('F1').earlier), null);
  assert.equal(successRate(cell('F4').earlier), 0);
  assert.equal(successRate(cell('F4').newer), 25);
  assert.equal(successRate(cell('C4').earlier), 50);
  assert.equal(successRate(cell('C4').newer), 85);
  assert.equal(cellChange(cell('C4')), 35);
  assert.equal(cellChange(cell('C2')), -15);
  assert.equal(cellChange(cell('F1')), null);
  assert.equal(successRate({ successes: 10, trials: 20, rejected: 100 }), 50);
});

test('next test prioritizes absent evidence from either model before weak observed outcomes', () => {
  assert.equal(nextTest().cell.id, 'F1');
  assert.equal(nextTest(cells.filter(c => c.newer.trials)).cell.id, 'F4');
  assert.equal(nextTest([]), null);
  const incomplete = { ...cell('C4'), earlier: { successes: 0, trials: 0, rejected: 0 } };
  assert.equal(nextTest([cell('F4'), incomplete]).cell, incomplete);
  assert.equal(coverageSummary([incomplete]).sampled, 0);
  assert.equal(coverageSummary([incomplete]).trialsPerModel, null);
});

test('case deep links resolve exact known IDs and reject malformed inputs', () => {
  for (const c of cells) assert.equal(caseFromHash(`#case-${c.id}`), c);
  for (const hash of ['', '#data', '#case-A0', '#case-G1', '#case-A1-extra', '#case-<script>', '#case-a1']) assert.equal(caseFromHash(hash), null);
});

test('downloaded example retains physical conditions, model context, and illustrative identity', () => {
  const record = JSON.parse(JSON.stringify(buildIllustrativeCase(cell('C4'))));
  assert.equal(record.illustrative, true);
  assert.equal(record.case, 'CUP-TO-TRAY-C4');
  assert.equal(record.startingCondition.xCm, 30);
  assert.equal(record.startingCondition.yCm, 40);
  assert.equal(record.startingCondition.positionToleranceMm, 5);
  assert.equal(record.results.newer.successes, 17);
  assert.equal(record.results.earlier.rejected, 2);
  assert.match(record.outcomeSource, /Illustrated/);
});

test('software scenarios calculate usage and monthly revenue without mixing them', () => {
  assert.equal(annualSoftwareRevenue({ stations: 1000 }), 25000000);
  assert.equal(annualSoftwareRevenue({ stations: 1000, price: 100, mode: 'monthly' }), 1200000);
  assert.equal(annualSoftwareRevenue({ stations: 100, price: .5 }), 1250000);
  assert.equal(annualSoftwareRevenue({ stations: 0 }), 0);
  assert.equal(annualSoftwareRevenue({ stations: 1000, price: 0 }), 0);
  for (const stations of [-1, NaN, Infinity]) assert.throws(() => annualSoftwareRevenue({ stations }), RangeError);
  assert.throws(() => annualSoftwareRevenue({ stations: 10, mode: 'both' }), RangeError);
});

test('the revenue model stacks platform, tooling and enterprise on top of the per-evaluation line', () => {
  // today's buyers at 20 stations each
  assert.deepEqual(annualRevenue({ labs: 250, stationsPerLab: 20 }), {
    stations: 5000, evaluations: 125e6, platform: 12e6, tooling: 12.5e6, enterprise: 37.5e6, total: 187e6, hardware: 7.5e6,
  });
  // the deck's $25M at 1,000 stations is the evaluations line alone
  const thousand = annualRevenue({ labs: 50, stationsPerLab: 20 });
  assert.equal(thousand.evaluations, annualSoftwareRevenue({ stations: 1000 }));
  assert.equal(thousand.total, 37.4e6);
  // enterprise contracts start at 10 stations a lab
  assert.equal(annualRevenue({ labs: 10, stationsPerLab: 9 }).enterprise, 0);
  assert.equal(annualRevenue({ labs: 10, stationsPerLab: 10 }).enterprise, 1.5e6);
  for (const bad of [{ labs: -1, stationsPerLab: 5 }, { labs: 5, stationsPerLab: NaN }, { labs: Infinity, stationsPerLab: 1 }]) {
    assert.throws(() => annualRevenue(bad), RangeError);
  }
  assert.equal(STATION.price, 1500);
  assert.equal(STATION.margin, 0.8);
});

// Text drawn in a ReportLab PDF: each content stream is ASCII85 then Flate; decode both and join the (string) Tj operands.
function ascii85(src) {
  const s = src.replace(/\s+/g, '').replace(/^<~/, '').replace(/~>.*$/, '');
  const out = [];
  for (let i = 0; i < s.length;) {
    if (s[i] === 'z') { out.push(0, 0, 0, 0); i++; continue; }
    const group = s.slice(i, i + 5), pad = 5 - group.length;
    let n = 0;
    for (const ch of group.padEnd(5, 'u')) n = n * 85 + (ch.charCodeAt(0) - 33);
    out.push(...[n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].slice(0, 4 - pad));
    i += 5;
  }
  return Buffer.from(out);
}
async function pdfText(path) {
  const { inflateSync } = await import('node:zlib');
  const buf = await readFile(path);
  let text = '';
  for (let at = buf.indexOf('stream'); at !== -1; at = buf.indexOf('stream', at + 6)) {
    const start = at + (buf[at + 6] === 0x0d ? 8 : 7), end = buf.indexOf('endstream', start);
    if (end === -1) break;
    try { text += inflateSync(ascii85(buf.subarray(start, end).toString('latin1'))).toString('latin1') + '\n'; } catch {}
    at = end;
  }
  return [...text.matchAll(/\(((?:\\.|[^\\)])*)\)\s*Tj/g)].map(m => m[1].replace(/\\(.)/g, '$1')).join(' ');
}

test('the business section shows the layered model, the 80% station margin and sourced market facts', async () => {
  const root = new URL('../.pages-dist/', import.meta.url);
  const html = await readFile(new URL('robotics/investors/index.html', root), 'utf8');
  const business = html.match(/<section class="sec sec-alt" id="business"[\s\S]*?<\/section>/)?.[0] || '';
  assert.match(business, /\$1,500[^<]*80% margin/);
  assert.match(business, /<input id="calc-labs"[^>]*value="250" data-calc-labs \/>/);
  assert.match(business, /<input id="calc-per-lab"[^>]*value="20" data-calc-per-lab \/>/);
  const model = annualRevenue({ labs: 250, stationsPerLab: 20 });
  assert.equal(model.total, 187e6);
  assert.match(business, /<b data-calc-out>\$187M<\/b>/);
  for (const line of ['evaluations', 'platform', 'tooling', 'enterprise']) assert.match(business, new RegExp(`data-line="${line}"`), line);
  // every market fact carries its source
  const text = business.replace(/<[^>]+>/g, '');
  for (const [fact, source] of [[/\$15B[\s\S]*Applied Intuition/, /bloomberg\.com/], [/10–100\+/, /trossenrobotics\.com/], [/70\+/, /cbinsights\.com/], [/1 → 5[\s\S]*Enact/, null]]) {
    assert.match(text, fact);
    if (source) assert.match(business, source);
  }
  assert.doesNotMatch(html, /margin is not|not established/i);
});

test('the white paper and overview state the same margin and pricing as the investor page', async () => {
  for (const file of ['white-paper.pdf', 'overview.pdf']) {
    const text = await pdfText(new URL(`../public/investors/${file}`, import.meta.url));
    assert.ok(text.length > 1000, `${file}: no text extracted`);
    assert.match(text, /80% margin/, file);
    assert.doesNotMatch(text, /margin is not|remain open|being explored|potentially around/i, file);
    assert.match(text, /\$187M|\$187 million/, file);
  }
});

test('static export contains the investor story, valid local assets, and entry links', async () => {
  const root = new URL('../.pages-dist/', import.meta.url);
  const html = await readFile(new URL('robotics/investors/index.html', root), 'utf8');
  const assets = new Set([...html.matchAll(/(?:src|poster|href)="(\/(?:site|media|investors)\/[^"?#]+)/g)].map(match => match[1]));
  for (const path of assets) await access(new URL(path.slice(1), root));
  await access(new URL('site/robotics-investors/model.mjs', root));
  assert.match(html, /https:\/\/lightcompany.ai\/robotics\/investors/);
  assert.match(html, /Illustrative workflow/);
  assert.match(html, /<p class="mono dim">Targets<\/p>/);
  assert.match(html, /src="\/media\/brand-film\/platform-demo.mp4"/);
  assert.doesNotMatch(html, /evals-explainer/);
  assert.doesNotMatch(html, /STORY_CONTINUES|not independently verified|localhost/);
  assert.match(await readFile(new URL('investors/index.html', root), 'utf8'), /\/robotics\/investors/);
  // Investor material remains reachable, but its noindex directive excludes it from the sitemap.
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(await readFile(new URL('sitemap.xml', root), 'utf8'), /<loc>[^<]*\/robotics\/investors/);
});
