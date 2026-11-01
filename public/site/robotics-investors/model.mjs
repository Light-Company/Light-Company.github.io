// Explicitly illustrative paired cases, independent of customer records.
const missing = new Set([5, 11, 17, 24, 29, 30, 34, 35]);
const earlier = [18, 17, 15, 10, 8, 0, 19, 18, 16, 11, 7, 0, 18, 17, 15, 10, 6, 0, 17, 16, 10, 9, 5, 0, 0, 15, 12, 8, 4, 0, 0, 12, 10, 6, 0, 0];
const changes = [1, 1, 2, 5, 4, 0, 0, 1, -3, 4, 5, 0, 1, 0, 2, 5, 6, 0, 1, -2, 7, 5, 6, 5, 0, 2, 3, 4, 5, 0, 0, 3, 4, 5, 0, 0];
export const cells = Object.freeze(earlier.map((successes, index) => {
  const trials = missing.has(index) ? 0 : 20;
  return Object.freeze({
    id: `${String.fromCharCode(65 + index % 6)}${Math.floor(index / 6) + 1}`,
    x: (index % 6 + 1) * 10,
    y: (Math.floor(index / 6) + 1) * 10,
    orientation: 0,
    tolerance: 5,
    earlier: Object.freeze({ successes: trials ? successes : 0, trials, rejected: trials ? index % 3 : 0 }),
    newer: Object.freeze({ successes: trials ? successes + changes[index] : 0, trials, rejected: trials ? (index + 1) % 3 : 0 }),
  });
}));
export function successRate(result) {
  return result.trials ? result.successes / result.trials * 100 : null;
}
export function cellChange(cell) {
  const before = successRate(cell.earlier);
  const after = successRate(cell.newer);
  return before === null || after === null ? null : after - before;
}
export function coverageSummary(data = cells) {
  const earlierTrials = data.reduce((sum, c) => sum + c.earlier.trials, 0);
  const newerTrials = data.reduce((sum, c) => sum + c.newer.trials, 0);
  return {
    earlierTrials,
    newerTrials,
    sampled: data.filter(c => c.earlier.trials > 0 && c.newer.trials > 0).length,
    positions: data.length,
    trialsPerModel: earlierTrials === newerTrials ? earlierTrials : null,
  };
}
export function nextTest(data = cells) {
  const uncovered = data.find(c => !c.earlier.trials || !c.newer.trials);
  if (uncovered) return { cell: uncovered, reason: 'uncovered' };
  const weakest = [...data].sort((a, b) => successRate(a.newer) - successRate(b.newer))[0];
  return weakest ? { cell: weakest, reason: 'weakest' } : null;
}
export function caseFromHash(hash) {
  const match = /^#case-([A-F][1-6])$/.exec(hash);
  return cells.find(cell => cell.id === match?.[1]) ?? null;
}
export function annualSoftwareRevenue({ stations, evaluationsPerDay = 100, price = 1, activeDays = 250, mode = 'usage' }) {
  const numbers = [stations, price, evaluationsPerDay, activeDays];
  if (numbers.some(n => !Number.isFinite(n) || n < 0)) throw new RangeError('Scenario inputs must be finite and non-negative.');
  if (mode === 'monthly') return stations * price * 12;
  if (mode !== 'usage') throw new RangeError('Unknown pricing mode.');
  return stations * evaluationsPerDay * activeDays * price;
}
export function buildIllustrativeCase(cell) {
  return {
    illustrative: true,
    case: `CUP-TO-TRAY-${cell.id}`,
    task: 'Place the cup fully inside the tray and release it.',
    object: 'Rigid cup; matching object specification required for comparison.',
    startingCondition: { xCm: cell.x, yCm: cell.y, yawDegrees: cell.orientation, positionToleranceMm: cell.tolerance, frame: 'Calibrated work-surface origin' },
    modelVersions: { earlier: 'policy-v1', newer: 'policy-v2' },
    outcomeSource: 'Illustrated evaluator results',
    results: { earlier: cell.earlier, newer: cell.newer },
    localRequirements: ['Compatible task and robot', 'Calibrated workspace', 'Matching objects and success criterion'],
  };
}
