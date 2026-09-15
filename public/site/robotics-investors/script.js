import { cells, successRate, cellChange, coverageSummary, nextTest, caseFromHash, annualSoftwareRevenue, buildIllustrativeCase } from './model.mjs';

const $ = selector => document.querySelector(selector);
const formatNumber = number => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(number);
const rounded = number => Math.round(number * 100) / 100;
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scrollOptions = () => ({ behavior: motion.matches ? 'instant' : 'smooth', block: 'start' });

// Stable paired samples: only setup spread changes, never the model difference.
const svgNS = 'http://www.w3.org/2000/svg';
function svgNode(tag, attrs, text) {
  const element = document.createElementNS(svgNS, tag);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  if (text !== undefined) element.textContent = text;
  return element;
}
const spread = $('#setup-spread');
const drawing = $('#spread-drawing');
const spreadChart = $('#spread-chart');
function drawSpread() {
  const amount = Number(spread.value);
  const compact = spreadChart.clientWidth < 600;
  const width = compact ? 600 : 960;
  const start = compact ? 105 : 140;
  const scale = (width - start - 25) / 100;
  spreadChart.setAttribute('viewBox', `0 0 ${width} 300`);
  drawing.replaceChildren();
  const x = score => start + score * scale;
  for (let score = 0; score <= 100; score += 20) {
    drawing.append(svgNode('line', { x1: x(score), x2: x(score), y1: 20, y2: 218, stroke: '#dddde2', 'stroke-dasharray': '3 6' }));
    drawing.append(svgNode('text', { x: x(score), y: 246, fill: '#626269', 'font-size': compact ? 20 : 15, 'text-anchor': 'middle' }, score));
  }
  [[60, 72, 'Model A', '#a64a06'], [70, 173, 'Model B', '#0071e3']].forEach(([center, y, label, color]) => {
    drawing.append(svgNode('text', { x: 0, y: y + 6, fill: '#1d1d1f', 'font-size': compact ? 23 : 20, 'font-weight': 600 }, label));
    drawing.append(svgNode('rect', { x: x(center - amount / 2), y: y - 34, width: amount * scale, height: 68, rx: 9, fill: color, opacity: .08 }));
    for (let i = 0; i < 36; i++) {
      const offset = ((i * 19 % 37) / 36 - .5) * amount;
      drawing.append(svgNode('circle', { cx: x(center + offset), cy: y + Math.sin(i * 2.4) * 23, r: compact ? 4 : 3.5, fill: color, opacity: .65 }));
    }
    drawing.append(svgNode('line', { x1: x(center), x2: x(center), y1: y - 38, y2: y + 38, stroke: color, 'stroke-width': 2 }));
  });
  drawing.append(svgNode('path', { d: `M${x(60)} 122H${x(70)}m-5 -4 5 4 -5 4`, stroke: '#1d1d1f', 'stroke-width': 1.5, fill: 'none' }));
  drawing.append(svgNode('text', { x: width / 2, y: 284, fill: '#55555c', 'font-size': compact ? 20 : 15, 'text-anchor': 'middle' }, 'Illustrative score · model improvement stays at +10 points'));
  $('#spread-value').textContent = amount > 24 ? 'High' : amount > 10 ? 'Narrowing' : 'Controlled';
  $('#spread-conclusion').textContent = amount > 10 ? 'The results overlap. The improvement is hard to see.' : 'Same model change. Now the improvement is visible.';
  spread.setAttribute('aria-valuetext', `${amount > 24 ? 'High' : amount > 10 ? 'Moderate' : 'Low'} physical setup variation`);
}
spread.addEventListener('input', drawSpread);
new ResizeObserver(drawSpread).observe(spreadChart);
drawSpread();

// The case explorer never reads a customer API or sends commands to a station.
const heatmap = $('#heatmap');
let selectedCell = caseFromHash(location.hash) ?? cells.find(cell => cell.id === 'C4');
let mapMode = 'earlier';
let reuseMode = 'customer';
const rateText = result => successRate(result) === null ? 'Untested' : `${rounded(successRate(result))}%`;
const signed = number => `${number > 0 ? '+' : ''}${rounded(number)}`;
function cellColor(value, isChange) {
  if (value === null) return ['#f1f1f4', '#65656b'];
  if (isChange) {
    if (value < 0) return ['#f3b69c', '#662d0d'];
    if (value === 0) return ['#e5e7ec', '#41444c'];
    return [`hsl(209 75% ${91 - Math.min(value, 40) * .8}%)`, '#073760'];
  }
  return value < 50 ? [`hsl(23 82% ${79 + value * .2}%)`, '#713304'] : [`hsl(209 75% ${94 - (value - 50) * .65}%)`, '#073760'];
}
function updateCaseLink() {
  history.replaceState(null, '', `#case-${selectedCell.id}`);
}
function selectCell(cell, updateHash = true) {
  selectedCell = cell;
  if (updateHash) updateCaseLink();
  renderMap();
  renderInspector();
  renderReuse();
  $('#case-action-status').textContent = '';
}
function renderMap() {
  for (const button of heatmap.children) {
    const cell = cells.find(item => item.id === button.dataset.cell);
    const value = mapMode === 'change' ? cellChange(cell) : successRate(cell[mapMode]);
    const text = value === null ? '—' : mapMode === 'change' ? `${signed(value)}` : `${rounded(value)}%`;
    button.querySelector('b').textContent = text;
    button.classList.toggle('uncovered', value === null);
    const [background, ink] = cellColor(value, mapMode === 'change');
    button.style.setProperty('--cell-bg', background);
    button.style.setProperty('--cell-ink', ink);
    button.setAttribute('aria-pressed', String(cell.id === selectedCell.id));
    button.tabIndex = cell.id === selectedCell.id ? 0 : -1;
    button.setAttribute('aria-label', value === null ? `Position ${cell.id}: untested` : mapMode === 'change' ? `Position ${cell.id}: ${signed(value)} percentage-point change` : `Position ${cell.id}: ${rounded(value)} percent success, ${cell[mapMode].successes} of ${cell[mapMode].trials} valid trials, ${mapMode === 'earlier' ? 'earlier' : 'new'} model`);
  }
  const legend = $('#map-legend');
  legend.children[0].lastChild.textContent = mapMode === 'change' ? 'Regression' : 'Lower success';
  legend.children[1].lastChild.textContent = mapMode === 'change' ? 'Improvement · points' : 'Higher success';
}
function renderInspector() {
  const cell = selectedCell;
  $('#cell-name').textContent = cell.id;
  $('#cell-position').textContent = `x ${cell.x} cm · y ${cell.y} cm · same position in both models`;
  $('#cell-earlier').textContent = rateText(cell.earlier);
  $('#cell-newer').textContent = rateText(cell.newer);
  for (const version of ['earlier', 'newer']) $('#cell-' + version + '-count').textContent = cell[version].trials ? `${cell[version].successes} / ${cell[version].trials} valid trials` : 'No valid trials';
  const change = cellChange(cell);
  $('#cell-insight').textContent = change === null ? 'No evidence yet. An untested condition is different from a failure.' : change > 0 ? `${signed(change)} percentage points at the same starting position.` : change < 0 ? `${Math.abs(rounded(change))} percentage points worse. The new model regressed here.` : 'Same success rate at this position. Keep it in the comparison suite.';
  $('#cell-valid').textContent = `${cell.earlier.trials} per model`;
  $('#cell-rejected').textContent = `${cell.earlier.rejected} / ${cell.newer.rejected}`;
  $('#case-id').textContent = `CUP-TO-TRAY-${cell.id}`;
  $('#save-case').innerHTML = `${change === null ? 'Prepare this missing test' : 'Preserve this example case'} <span aria-hidden="true">↓</span>`;
}
for (const cell of cells) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'map-cell';
  button.dataset.cell = cell.id;
  button.id = `case-${cell.id}`;
  const label = document.createElement('span');
  label.textContent = cell.id;
  button.append(label, document.createElement('b'));
  button.addEventListener('click', () => selectCell(cell));
  button.addEventListener('keydown', event => {
    const index = cells.indexOf(cell);
    let target = index;
    if (event.key === 'ArrowRight') target = Math.min(index + 1, cells.length - 1);
    else if (event.key === 'ArrowLeft') target = Math.max(index - 1, 0);
    else if (event.key === 'ArrowDown') target = Math.min(index + 6, cells.length - 1);
    else if (event.key === 'ArrowUp') target = Math.max(index - 6, 0);
    else if (event.key === 'Home') target = Math.floor(index / 6) * 6;
    else if (event.key === 'End') target = Math.floor(index / 6) * 6 + 5;
    else return;
    event.preventDefault();
    selectCell(cells[target]);
    heatmap.children[target].focus({ preventScroll: true });
  });
  heatmap.append(button);
}
for (const button of document.querySelectorAll('[data-map]')) button.addEventListener('click', () => {
  mapMode = button.dataset.map;
  document.querySelectorAll('[data-map]').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
  renderMap();
});
const summary = coverageSummary();
$('#coverage-count').textContent = `${summary.sampled} / ${summary.positions}`;
$('#episode-count').textContent = formatNumber(summary.trialsPerModel);
$('#next-test').addEventListener('click', () => {
  const recommendation = nextTest();
  if (!recommendation) return;
  selectCell(recommendation.cell);
  $('#next-explanation').textContent = recommendation.reason === 'uncovered' ? `Test ${recommendation.cell.id} next: this position has no valid trials. Run it with the same task and scoring rule to start filling the gap.` : `Revisit ${recommendation.cell.id}: it has the lowest success rate in the new model. Repeat the case to investigate.`;
});
$('#save-case').addEventListener('click', () => {
  $('#case-action-status').textContent = `Example case ${selectedCell.id} prepared below. Its conditions and results stay together.`;
  $('#case-reuse').scrollIntoView(scrollOptions());
});
const reuseContent = {
  customer: ['A failure becomes a regression test.', 'Recreate this setup on a compatible, calibrated station. Run the next model against it and check whether the weakness returns.', 'Matching objects, a calibrated work surface, a feasible task, and the same scoring rule.'],
  labs: ['Buy a useful challenge you have not found yet.', 'A participating lab contributes a recreatable failure case. Another lab with a comparable setup tests its own model against it. That is the first shared data product we want to prove.', 'Permission to share the case, compatible robot and task, matching object requirements, local calibration, and consistent scoring.'],
  robots: ['Transfer the question. Test the new robot.', 'The broader ambition is to adapt a useful case to other robot hardware. The receiving lab must establish what a comparable challenge means for its robot.', 'Reachability, embodiment, sensing, object and task compatibility, calibration, and scoring. Difficulty and scores are not automatically equivalent.'],
};
function renderReuse() {
  const untested = cellChange(selectedCell) === null;
  let [headline, description, local] = reuseContent[reuseMode];
  if (untested && reuseMode === 'customer') {
    headline = 'Turn a coverage gap into a new test.';
    description = 'Preserve the intended conditions, then run both models against them. This position has no valid trials yet; there is no observed failure to replay.';
  } else if (untested && reuseMode === 'labs') {
    headline = 'Share the test specification, not a conclusion.';
    description = 'A comparable lab can recreate this intended condition and collect its own results. Until the test is run, this case is a coverage proposal, not evidence of a model weakness.';
  }
  $('#reuse-headline').textContent = headline;
  $('#reuse-description').textContent = description;
  $('#reuse-local').replaceChildren();
  const strong = document.createElement('strong');
  strong.textContent = 'Establish locally: ';
  $('#reuse-local').append(strong, document.createTextNode(local));
}
for (const button of document.querySelectorAll('[data-reuse]')) button.addEventListener('click', () => {
  reuseMode = button.dataset.reuse;
  document.querySelectorAll('[data-reuse]').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
  renderReuse();
});
$('#download-case').addEventListener('click', () => {
  const record = buildIllustrativeCase(selectedCell);
  const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `prism-illustrative-case-${selectedCell.id}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('#case-action-status').textContent = 'Illustrative case downloaded. No customer data included.';
});
$('#share-case').addEventListener('click', async () => {
  updateCaseLink();
  const url = new URL(location.href);
  try {
    await navigator.clipboard.writeText(url.href);
    $('#case-action-status').textContent = `Link to case ${selectedCell.id} copied.`;
  } catch {
    $('#case-action-status').textContent = `Case ${selectedCell.id} is in this page’s address. Copy the address to share it.`;
  }
});
window.addEventListener('hashchange', () => {
  const cell = caseFromHash(location.hash);
  if (cell) selectCell(cell, false);
});
renderMap();
renderInspector();
renderReuse();
if (caseFromHash(location.hash)) requestAnimationFrame(() => document.getElementById(`case-${selectedCell.id}`).scrollIntoView({ block: 'center' }));

// Revenue arithmetic is an optional, explicitly labeled scenario.
const mode = $('#pricing-mode');
const stations = $('#station-count');
const evaluations = $('#eval-count');
const price = $('#usage-price');
const scenarioPrices = { usage: '1', monthly: '100' };
function renderRevenue() {
  $('#station-output').textContent = formatNumber(Number(stations.value));
  $('#eval-output').textContent = formatNumber(Number(evaluations.value));
  const valid = price.value.trim() !== '' && price.validity.valid && Number.isFinite(price.valueAsNumber);
  price.setAttribute('aria-invalid', String(!valid));
  $('#price-error').hidden = valid;
  if (!valid) {
    $('#price-error').textContent = 'Enter a price from $0 to $1,000.';
    $('#annual-revenue').textContent = '—';
    $('#revenue-formula').textContent = 'Add a valid price to calculate this scenario.';
    return;
  }
  scenarioPrices[mode.value] = price.value;
  const total = annualSoftwareRevenue({ stations: Number(stations.value), evaluationsPerDay: Number(evaluations.value), price: price.valueAsNumber, mode: mode.value });
  $('#annual-revenue').textContent = total >= 1e6 ? `$${formatNumber(total / 1e6)}M` : `$${formatNumber(total)}`;
  $('#revenue-formula').textContent = mode.value === 'monthly' ? `${formatNumber(Number(stations.value))} paying stations × $${formatNumber(price.valueAsNumber)} × 12 months` : `${formatNumber(Number(stations.value))} paying stations × ${evaluations.value} billable evaluations × 250 active days × $${formatNumber(price.valueAsNumber)}`;
}
mode.addEventListener('change', () => {
  const monthly = mode.value === 'monthly';
  $('#usage-controls').hidden = monthly;
  $('#price-label').textContent = monthly ? 'Price per station / month ($)' : 'Price per verified evaluation ($)';
  price.value = scenarioPrices[mode.value];
  renderRevenue();
});
[stations, evaluations, price].forEach(input => input.addEventListener('input', renderRevenue));
renderRevenue();

// Start the opening film once. Respect every user pause; never auto-resume it.
const heroFilm = $('[data-auto-film]');
let heroStarted = false;
const filmObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const video = entry.target;
    if (video === heroFilm && entry.isIntersecting && !motion.matches && !heroStarted) {
      heroStarted = true;
      video.play().catch(() => {});
    } else if (!entry.isIntersecting && !video.paused) video.pause();
  }
}, { threshold: .2 });
document.querySelectorAll('video').forEach(video => filmObserver.observe(video));
document.addEventListener('visibilitychange', () => { if (document.hidden) document.querySelectorAll('video').forEach(video => video.pause()); });
motion.addEventListener('change', () => { if (motion.matches) document.querySelectorAll('video').forEach(video => video.pause()); });
