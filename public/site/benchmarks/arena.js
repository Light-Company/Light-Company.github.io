import { benchmark, summarize, rankModels, wilsonInterval, exampleRecords } from './data.mjs';

const $ = (id) => document.getElementById(id);
const detailIcon = '<svg class="arena-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" > <path d="M7 7h10v10" /> <path d="M7 17 17 7" /> </svg>';
const colors = ['#88c8f0', '#a09cdb', '#d5ad8e', '#8bbca4'];
const tasks = benchmark.tasks.filter((t) => t.id !== 'all');
const modelById = (id) => benchmark.models.find((m) => m.id === id);
const percent = (v) => v === null ? 'Not tested' : v.toFixed(1) + '%';
const icon = (m) => '<img src="/site/benchmarks/logos/' + m.logo + '.svg" class="' + (m.logo === 'openai' ? 'logo-invert' : '') + '" alt="" />';
const interval = (m, task = 'all') => {
  const s = summarize(m, task);
  const ci = wilsonInterval(s.completed, s.trials);
  return ci ? ci.map((n) => n.toFixed(1)).join('–') : 'Not tested';
};
const phoneLayout = window.matchMedia('(max-width: 760px)');
const contextPanel = document.querySelector('.arena-context');
const adaptContext = () => { contextPanel.open = !phoneLayout.matches; };
adaptContext();
phoneLayout.addEventListener('change', adaptContext);

const viewTitles = { leaderboard: 'Physical AI leaderboard', compare: 'Compare models', maps: 'Capability maps', trials: 'Trial records', method: 'Evaluation methodology' };
function showView(view, updateUrl = true) {
  if (!viewTitles[view]) view = 'leaderboard';
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== view; });
  document.querySelectorAll('.arena-nav').forEach((b) => {
    const active = b.dataset.view === view;
    b.classList.toggle('active', active);
    if (active) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  $('view-title').textContent = viewTitles[view];
  $('arena-view').value = view;
  if (updateUrl) { history.replaceState(null, '', '#' + view); window.scrollTo({ top: 0, behavior: 'auto' }); }
}
document.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => showView(b.dataset.view)));
$('arena-view').addEventListener('change', (event) => showView(event.target.value));
window.addEventListener('hashchange', () => showView(location.hash.slice(1), false));
showView(location.hash.slice(1), false);

function renderLeaderboard() {
  const task = $('arena-task').value;
  const search = $('model-search').value.trim().toLowerCase();
  const ranked = rankModels(task);
  let priorScore = null;
  let rank = 0;
  const modelRanks = new Map(ranked.map((m, i) => {
    if (i === 0 || m.score !== priorScore) rank = i + 1;
    priorScore = m.score;
    return [m.id, rank];
  }));
  const filtered = ranked.filter((m) => (m.name + ' ' + m.provider).toLowerCase().includes(search));
  if ($('arena-sort').value === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  if ($('arena-sort').value === 'trials') filtered.sort((a, b) => b.trials - a.trials);
  $('arena-rows').innerHTML = filtered.map((m) => '<tr><td><span class="arena-rank ' + (modelRanks.get(m.id) === 1 ? 'is-first' : '') + '">' + modelRanks.get(m.id) + '</span></td><td><button class="arena-model-button" data-model="' + m.id + '">' + icon(m) + '<span><strong>' + m.name + '</strong><small>' + m.provider + ' · version pending</small></span></button></td><td><strong class="arena-score">' + percent(m.score) + '</strong><span class="arena-score-bar"><i style="width:' + (m.score ?? 0) + '%"></i></span></td><td class="arena-mono">' + interval(m, task) + '</td><td class="arena-mono">' + m.completed + ' / ' + m.trials + '</td>' + tasks.map((t) => '<td><span class="arena-task-cell">' + percent(summarize(m, t.id).score) + '</span></td>').join('') + '<td><button class="arena-detail" data-model="' + m.id + '" aria-label="View ' + m.name + ' details">' + detailIcon + '</button></td></tr>').join('') || '<tr><td colspan="9" class="arena-empty"><strong>No matching models</strong><p>Try a model or provider name, or clear your search to see the full lineup.</p><button class="arena-button" id="clear-model-search">Clear search</button></td></tr>';
  $('arena-count').textContent = filtered.length + ' of ' + benchmark.models.length + ' models · ' + benchmark.tasks.find((t) => t.id === task).name;
  $('clear-model-search')?.addEventListener('click', () => { $('model-search').value = ''; renderLeaderboard(); $('model-search').focus(); });
  $('arena-rows').querySelectorAll('[data-model]').forEach((b) => b.addEventListener('click', () => openModel(b.dataset.model, b)));
}
$('model-search').addEventListener('input', renderLeaderboard);
$('arena-task').addEventListener('change', renderLeaderboard);
$('arena-sort').addEventListener('change', renderLeaderboard);
renderLeaderboard();
$('task-chart').innerHTML = '<div class="arena-chart-legend">' + benchmark.models.map((m, i) => '<span><i style="background:' + colors[i] + '"></i>' + m.name + '</span>').join('') + '</div>' + tasks.map((t) => '<div class="arena-chart-group"><span>' + t.name + '</span><div class="arena-chart-bars">' + benchmark.models.map((m, i) => '<div class="arena-chart-bar" role="img" aria-label="' + m.name + ', ' + t.name + ': ' + percent(summarize(m, t.id).score) + ' illustrative completion"><i style="width:' + summarize(m, t.id).score + '%;background:' + colors[i] + '"></i></div>').join('') + '</div></div>').join('');

for (const id of ['compare-a', 'compare-b', 'trial-model']) {
  $('' + id).innerHTML = benchmark.models.map((m) => '<option value="' + m.id + '">' + m.name + ' · ' + m.provider + '</option>').join('');
}
$('compare-b').value = benchmark.models[1].id;
function compareModel(m) {
  const s = summarize(m);
  return '<div class="arena-versus-model">' + icon(m) + '<h3>' + m.name + '</h3><strong>' + percent(s.score) + '</strong><p>' + s.completed + ' / ' + s.trials + ' example attempts</p><p>95% interval: ' + interval(m) + '</p></div>';
}
function renderComparison() {
  const a = modelById($('compare-a').value);
  const b = modelById($('compare-b').value);
  const gap = summarize(a).score - summarize(b).score;
  $('comparison-content').innerHTML = '<div class="arena-versus">' + compareModel(a) + '<div class="arena-versus-gap"><strong>' + (gap > 0 ? '+' : '') + gap.toFixed(1) + '<span>percentage points</span></strong><span>A relative to B</span></div>' + compareModel(b) + '</div><div class="arena-table-wrap"><table class="arena-table"><thead><tr><th>Task</th><th>' + a.name + '</th><th>' + b.name + '</th><th>Difference (A − B)</th></tr></thead><tbody>' + tasks.map((t) => { const x = summarize(a, t.id); const y = summarize(b, t.id); const d = x.score - y.score; return '<tr><td>' + t.name + '</td><td class="arena-mono">' + percent(x.score) + ' · ' + x.completed + '/' + x.trials + '</td><td class="arena-mono">' + percent(y.score) + ' · ' + y.completed + '/' + y.trials + '</td><td class="arena-mono arena-gap-positive">' + (d > 0 ? '+' : '') + d.toFixed(1) + ' pp' + (d === 0 ? ' · Tie' : '') + '</td></tr>'; }).join('') + '</tbody></table></div><div class="arena-table-footer"><span>' + (a.id === b.id ? 'Same model selected; every difference is zero.' : 'Comparisons use sample aggregates, not paired observed rollouts.') + '</span><span>Illustrative data</span></div>';
}
$('compare-a').addEventListener('change', renderComparison);
$('compare-b').addEventListener('change', renderComparison);
$('swap-models').addEventListener('click', () => { const a = $('compare-a').value; $('compare-a').value = $('compare-b').value; $('compare-b').value = a; renderComparison(); });
renderComparison();

let page = 0;
const pageSize = 12;
function renderTrials() {
  const model = modelById($('trial-model').value);
  const outcome = $('trial-outcome').value;
  const records = exampleRecords(model).filter((r) => outcome === 'all' || r.outcome === outcome);
  page = Math.max(0, Math.min(page, Math.ceil(records.length / pageSize) - 1));
  const start = page * pageSize;
  $('trial-rows').innerHTML = records.slice(start, start + pageSize).map((r) => '<tr><td class="arena-mono">' + r.id + '</td><td>' + tasks.find((t) => t.id === r.task).name + '</td><td><span class="arena-outcome ' + r.outcome + '">' + (r.outcome === 'completed' ? 'Completed' : 'Failed') + '</span></td><td class="arena-unavailable">Not supplied</td><td class="arena-unavailable">Not supplied</td></tr>').join('') || '<tr><td colspan="5" class="arena-empty">No sample records match this filter.</td></tr>';
  $('trial-count').textContent = records.length ? (start + 1) + '–' + Math.min(start + pageSize, records.length) + ' of ' + records.length + ' synthetic records' : '0 records';
  $('trial-prev').disabled = page === 0;
  $('trial-next').disabled = start + pageSize >= records.length;
}
$('trial-model').addEventListener('change', () => { page = 0; renderTrials(); });
$('trial-outcome').addEventListener('change', () => { page = 0; renderTrials(); });
$('trial-prev').addEventListener('click', () => { page -= 1; renderTrials(); });
$('trial-next').addEventListener('click', () => { page += 1; renderTrials(); });
renderTrials();

const modelDialog = $('model-dialog');
let modelOpener;
function openModel(id, opener) {
  const m = modelById(id);
  const s = summarize(m);
  modelOpener = opener;
  $('model-dialog-content').innerHTML = '<span class="preview-label">Illustrative model profile</span><div class="arena-model-heading">' + icon(m) + '<div><h2 id="model-dialog-title">' + m.name + '</h2><p>' + m.provider + ' · exact version pending</p></div></div><div class="arena-stats"><div><span>Completion</span><strong>' + percent(s.score) + '</strong></div><div><span>Completed</span><strong>' + s.completed + ' / ' + s.trials + '</strong></div><div><span>Failed</span><strong>' + (s.trials - s.completed) + '</strong></div></div><table class="arena-table"><thead><tr><th>Task</th><th>Completion</th><th>95% interval</th></tr></thead><tbody>' + tasks.map((t) => '<tr><td>' + t.name + '</td><td class="arena-mono">' + percent(summarize(m, t.id).score) + '</td><td class="arena-mono">' + interval(m, t.id) + '</td></tr>').join('') + '</tbody></table><p class="arena-model-evidence">Sample counts only. No checkpoint, runtime settings, accepted reset evidence, or rollout recordings have been supplied. This profile does not establish model performance.</p><button class="arena-button" id="inspect-model-trials">Explore example trial records <svg class="arena-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg></button>';
  $('inspect-model-trials').addEventListener('click', () => { modelDialog.close(); $('trial-model').value = m.id; $('trial-outcome').value = 'all'; page = 0; renderTrials(); showView('trials'); $('view-title').focus(); });
  modelDialog.showModal();
}
modelDialog.querySelector('.arena-modal-close').addEventListener('click', () => modelDialog.close());
modelDialog.addEventListener('close', () => { if (modelOpener?.isConnected && !modelOpener.closest('[hidden]')) modelOpener.focus({ preventScroll: true }); });
modelDialog.addEventListener('click', (event) => { if (event.target === modelDialog) { const r = modelDialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) modelDialog.close(); } });
document.querySelectorAll('[data-download-results]').forEach((button) => button.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ ...benchmark, records: benchmark.models.flatMap(exampleRecords) }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = 'prism-illustrative-benchmark.json'; link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}));
