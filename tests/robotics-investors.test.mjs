import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { cells, successRate, cellChange, coverageSummary, nextTest, caseFromHash, annualSoftwareRevenue, buildIllustrativeCase } from '../public/site/robotics-investors/model.mjs';

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

test('static export contains the investor story, valid local assets, and entry links', async () => {
  const root = new URL('../.pages-dist/', import.meta.url);
  const html = await readFile(new URL('robotics/investors/index.html', root), 'utf8');
  const assets = new Set([...html.matchAll(/(?:src|poster|href)="(\/(?:site|media|investors)\/[^"?#]+)/g)].map(match => match[1]));
  for (const path of assets) await access(new URL(path.slice(1), root));
  await access(new URL('site/robotics-investors/model.mjs', root));
  assert.match(html, /https:\/\/lightcompany.ai\/robotics\/investors/);
  assert.match(html, /Illustrative workflow/);
  assert.match(html, /Targets · not current traction/);
  assert.doesNotMatch(html, /STORY_CONTINUES|not independently verified|localhost/);
  assert.match(await readFile(new URL('investors/index.html', root), 'utf8'), /\/robotics\/investors/);
  // Investor material remains reachable, but its noindex directive excludes it from the sitemap.
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(await readFile(new URL('sitemap.xml', root), 'utf8'), /<loc>[^<]*\/robotics\/investors/);
});
