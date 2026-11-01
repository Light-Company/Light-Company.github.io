import { benchmark, summarize, rankModels, wilsonInterval, exampleRecords } from './data.mjs';

const tasks = benchmark.tasks.filter((task) => task.id !== 'all');
const modelById = (id) => benchmark.models.find((model) => model.id === id);
const taskName = (id) => benchmark.tasks.find((task) => task.id === id).name;
const viewTitles = { leaderboard: 'Physical AI leaderboard', compare: 'Compare models', maps: 'Capability maps', trials: 'Trial records', method: 'Evaluation methodology' };
const viewDescriptions = {
  leaderboard: 'Compare completion across controlled physical tasks.',
  compare: 'Compare two models against the same tasks and sample counts.',
  maps: 'Explore how completion changes as one scene variable changes.',
  trials: 'Inspect the attempts behind a model’s completion rate.',
  method: 'How test conditions, completion and uncertainty are reported.',
};
const defaults = { view: 'leaderboard', task: 'all', sort: 'score', query: '', a: 'gemini', b: 'gpt', model: 'gemini', outcome: 'all', page: 0 };
const pageSize = 12;

// The URL carries the task across ranking, comparison and evidence views.
export function parseArenaState(hash = '') {
  const [view, query = ''] = hash.replace(/^#/, '').split('?');
  const params = new URLSearchParams(query);
  const state = { ...defaults, view: Object.hasOwn(viewTitles, view) ? view : defaults.view };
  if (benchmark.tasks.some((task) => task.id === params.get('task'))) state.task = params.get('task');
  if (['score', 'name', 'trials'].includes(params.get('sort'))) state.sort = params.get('sort');
  if (['all', 'completed', 'failed'].includes(params.get('outcome'))) state.outcome = params.get('outcome');
  for (const key of ['a', 'b', 'model']) if (modelById(params.get(key))) state[key] = params.get(key);
  state.query = (params.get('q') || '').slice(0, 100);
  const page = Number(params.get('page'));
  if (Number.isSafeInteger(page) && page >= 0) state.page = page;
  return state;
}

export function arenaStateHash(state) {
  const params = new URLSearchParams();
  for (const key of ['task', 'sort', 'a', 'b', 'model', 'outcome', 'page']) {
    if (state[key] !== defaults[key]) params.set(key, state[key]);
  }
  if (state.query) params.set('q', state.query);
  return '#' + state.view + (params.size ? '?' + params.toString() : '');
}

export function selectArenaTrials(modelId, task = 'all', outcome = 'all', requestedPage = 0) {
  const records = exampleRecords(modelById(modelId) || benchmark.models[0])
    .filter((record) => (task === 'all' || record.task === task) && (outcome === 'all' || record.outcome === outcome));
  const lastPage = Math.max(0, Math.ceil(records.length / pageSize) - 1);
  const page = Math.max(0, Math.min(Number.isSafeInteger(requestedPage) ? requestedPage : 0, lastPage));
  const start = page * pageSize;
  return { records: records.slice(start, start + pageSize), total: records.length, page, start, lastPage };
}

function initArena() {
  const $ = (id) => document.getElementById(id);
  const percent = (value) => value === null ? 'Not tested' : value.toFixed(1) + '%';
  const icon = (model) => `<img src="/site/benchmarks/logos/${model.logo}.svg" class="${model.logo === 'openai' ? 'logo-invert' : ''}" alt="" />`;
  const detailIcon = '<svg class="arena-icon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10M7 17 17 7" /></svg>';
  const interval = (model, task = state.task) => {
    const result = summarize(model, task);
    const ci = wilsonInterval(result.completed, result.trials);
    return ci ? ci.map((value) => value.toFixed(1)).join('–') : 'Not tested';
  };
  let state = parseArenaState(location.hash);
  const modelDialog = $('model-dialog');
  let modelOpener;

  for (const id of ['compare-a', 'compare-b', 'trial-model']) {
    $(id).innerHTML = benchmark.models.map((model) => `<option value="${model.id}">${model.name}</option>`).join('');
  }

  function setState(patch, navigate = false) {
    state = { ...state, ...patch };
    render();
    history[navigate ? 'pushState' : 'replaceState'](null, '', arenaStateHash(state));
    if (navigate) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      $('view-title').focus({ preventScroll: true });
      document.querySelector('.arena-nav.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  function openTrials(id) {
    if (modelDialog.open) modelDialog.close();
    setState({ view: 'trials', model: id, outcome: 'all', page: 0 }, true);
  }

  function renderLeaderboard() {
    const ranked = rankModels(state.task);
    let priorScore = null;
    let rank = 0;
    const ranks = new Map(ranked.map((model, index) => {
      if (index === 0 || model.score !== priorScore) rank = index + 1;
      priorScore = model.score;
      return [model.id, rank];
    }));
    const filtered = ranked.filter((model) => `${model.name} ${model.provider}`.toLowerCase().includes(state.query.trim().toLowerCase()));
    if (state.sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (state.sort === 'trials') filtered.sort((a, b) => b.trials - a.trials);
    $('arena-rows').innerHTML = filtered.map((model) => `<tr>
      <td><span class="arena-rank ${ranks.get(model.id) === 1 ? 'is-first' : ''}">${ranks.get(model.id)}</span></td>
      <td><button class="arena-model-button" data-model="${model.id}" aria-label="View ${model.name} model profile">${icon(model)}<span><strong>${model.name}</strong><small>${model.provider}</small></span></button></td>
      <td><strong class="arena-score">${percent(model.score)}</strong><span class="arena-score-bar" aria-hidden="true"><i style="width:${model.score ?? 0}%"></i></span><small class="arena-score-count">${model.completed} / ${model.trials} completed</small></td>
      <td class="arena-mono">${interval(model)}</td><td class="arena-mono">${model.completed} / ${model.trials}</td>
      ${tasks.map((task) => `<td><span class="arena-task-cell">${percent(summarize(model, task.id).score)}</span></td>`).join('')}
      <td><button class="arena-detail" data-model="${model.id}" aria-label="View ${model.name} details">${detailIcon}</button></td>
    </tr>`).join('') || '<tr><td colspan="9" class="arena-empty"><strong>No matching models</strong><p>Search a model or provider name, or clear the search to see all four models.</p><button class="arena-button" id="clear-model-search">Clear search</button></td></tr>';
    $('arena-count').textContent = `${filtered.length} of ${benchmark.models.length} models · ${taskName(state.task)}`;
    $('dataset-tasks').textContent = state.task === 'all' ? tasks.length : 1;
    $('dataset-task-label').textContent = state.task === 'all' ? 'task families' : 'task family';
    $('dataset-attempts').textContent = ranked.reduce((total, model) => total + model.trials, 0);
    $('clear-model-search')?.addEventListener('click', () => { setState({ query: '' }); $('model-search').focus(); });
    $('arena-rows').querySelectorAll('[data-model]').forEach((button) => button.addEventListener('click', () => openModel(button.dataset.model, button)));
  }

  function compareModel(model, slot) {
    const result = summarize(model, state.task);
    return `<div class="arena-versus-model"><div class="arena-model-heading">${icon(model)}<h3>${model.name}</h3></div><strong>${percent(result.score)}</strong><p>${result.completed} / ${result.trials} completed</p><p>95% interval: <span class="arena-ci-range">${interval(model)}</span></p><button class="arena-text-button" data-trials="${model.id}" aria-label="Inspect ${model.name} trials for model ${slot}">Inspect trials <span aria-hidden="true">→</span></button></div>`;
  }

  function renderComparison() {
    const a = modelById(state.a);
    const b = modelById(state.b);
    const gap = summarize(a, state.task).score - summarize(b, state.task).score;
    $('comparison-content').innerHTML = `<p class="arena-versus-context">${taskName(state.task)} · sample completion</p><div class="arena-versus">${compareModel(a, 'A')}<div class="arena-versus-gap"><strong>${gap > 0 ? '+' : ''}${gap.toFixed(1)}<span>percentage points</span></strong><span>A relative to B</span></div>${compareModel(b, 'B')}</div>
      <div class="arena-table-wrap" tabindex="0" role="region" aria-label="Comparison by task"><table class="arena-table arena-comparison-table"><thead><tr><th scope="col">Task</th><th scope="col">${a.name}</th><th scope="col">${b.name}</th><th scope="col">Difference (A − B)</th></tr></thead><tbody>${tasks.map((task) => {
        const x = summarize(a, task.id); const y = summarize(b, task.id); const difference = x.score - y.score;
        return `<tr${state.task === task.id ? ' class="is-selected"' : ''}><td>${task.name}</td><td class="arena-mono">${percent(x.score)} · ${x.completed}/${x.trials}</td><td class="arena-mono">${percent(y.score)} · ${y.completed}/${y.trials}</td><td class="arena-mono">${difference > 0 ? '+' : ''}${difference.toFixed(1)} pp${difference === 0 ? ' · Tie' : ''}</td></tr>`;
      }).join('')}</tbody></table></div><div class="arena-table-footer"><span>${a.id === b.id ? 'Same model selected; every difference is zero.' : 'Completion = completed attempts / total attempts.'}</span><span>${taskName(state.task)}</span></div>`;
    $('comparison-content').querySelectorAll('[data-trials]').forEach((button) => button.addEventListener('click', () => openTrials(button.dataset.trials)));
  }

  function renderTrials() {
    const selected = selectArenaTrials(state.model, state.task, state.outcome, state.page);
    state.page = selected.page;
    $('trial-rows').innerHTML = selected.records.map((record) => `<tr><td class="arena-mono">${record.id}</td><td>${taskName(record.task)}</td><td><span class="arena-outcome ${record.outcome}">${record.outcome === 'completed' ? 'Completed' : 'Failed'}</span></td><td class="arena-unavailable">Not supplied</td><td class="arena-unavailable">Not supplied</td></tr>`).join('') || '<tr><td colspan="5" class="arena-empty">No sample records match these filters.</td></tr>';
    $('trial-count').textContent = selected.total ? `${selected.start + 1}–${Math.min(selected.start + pageSize, selected.total)} of ${selected.total} synthetic records · ${taskName(state.task)}` : '0 records';
    $('trial-prev').disabled = selected.page === 0;
    $('trial-next').disabled = selected.page === selected.lastPage;
  }

  function openModel(id, opener) {
    const model = modelById(id);
    const result = summarize(model, state.task);
    modelOpener = opener;
    $('model-dialog-content').innerHTML = `<div class="arena-model-heading">${icon(model)}<div><h2 id="model-dialog-title">${model.name}</h2><p>${model.provider} · model family</p></div></div><p class="arena-model-scope">${taskName(state.task)} · illustrative sample</p><div class="arena-stats"><div><span>Completion</span><strong>${percent(result.score)}</strong></div><div><span>Completed</span><strong>${result.completed} / ${result.trials}</strong></div><div><span>Failed</span><strong>${result.trials - result.completed}</strong></div></div>
      <table class="arena-table"><thead><tr><th scope="col">Task</th><th scope="col">Completion</th><th scope="col">95% interval</th></tr></thead><tbody>${tasks.map((task) => `<tr${state.task === task.id ? ' class="is-selected"' : ''}><td>${task.name}</td><td class="arena-mono">${percent(summarize(model, task.id).score)}</td><td class="arena-mono">${interval(model, task.id)}</td></tr>`).join('')}</tbody></table>
      <p class="arena-model-evidence">Example counts for a model family. Exact checkpoints, runtime settings and rollout recordings are not included in this dataset.</p><div class="arena-model-actions"><button class="arena-button arena-button-primary" id="compare-this-model">Compare ${model.name} <span aria-hidden="true">→</span></button><button class="arena-button" id="inspect-model-trials">Inspect trial records</button></div>`;
    $('inspect-model-trials').addEventListener('click', () => openTrials(model.id));
    $('compare-this-model').addEventListener('click', () => {
      modelDialog.close();
      setState({ view: 'compare', a: model.id, b: state.b === model.id ? benchmark.models.find((other) => other.id !== model.id).id : state.b }, true);
    });
    modelDialog.showModal();
  }

  function render() {
    document.querySelectorAll('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== state.view; });
    document.querySelectorAll('.arena-nav').forEach((button) => {
      const active = button.dataset.view === state.view;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
    $('view-title').textContent = viewTitles[state.view];
    $('view-description').textContent = viewDescriptions[state.view];
    document.querySelector('[data-task-controls]').hidden = !['leaderboard', 'compare', 'trials'].includes(state.view);
    $('arena-task').value = state.task;
    $('arena-sort').value = state.sort;
    $('model-search').value = state.query;
    $('compare-a').value = state.a;
    $('compare-b').value = state.b;
    $('trial-model').value = state.model;
    $('trial-outcome').value = state.outcome;
    renderLeaderboard();
    renderComparison();
    renderTrials();
  }

  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => setState({ view: button.dataset.view }, true)));
  $('arena-task').addEventListener('change', (event) => setState({ task: event.target.value, page: 0 }));
  $('arena-sort').addEventListener('change', (event) => setState({ sort: event.target.value }));
  $('model-search').addEventListener('input', (event) => setState({ query: event.target.value.slice(0, 100) }));
  $('compare-a').addEventListener('change', (event) => setState({ a: event.target.value }));
  $('compare-b').addEventListener('change', (event) => setState({ b: event.target.value }));
  $('swap-models').addEventListener('click', () => setState({ a: state.b, b: state.a }));
  $('trial-model').addEventListener('change', (event) => setState({ model: event.target.value, page: 0 }));
  $('trial-outcome').addEventListener('change', (event) => setState({ outcome: event.target.value, page: 0 }));
  $('trial-prev').addEventListener('click', () => setState({ page: state.page - 1 }));
  $('trial-next').addEventListener('click', () => setState({ page: state.page + 1 }));
  const restoreState = () => {
    if (location.hash === '#main') return;
    if (modelDialog.open) modelDialog.close();
    state = parseArenaState(location.hash);
    render();
  };
  window.addEventListener('hashchange', restoreState);
  window.addEventListener('popstate', restoreState);
  modelDialog.querySelector('.arena-modal-close').addEventListener('click', () => modelDialog.close());
  modelDialog.addEventListener('close', () => { if (modelOpener?.isConnected && !modelOpener.closest('[hidden]')) modelOpener.focus({ preventScroll: true }); });
  modelDialog.addEventListener('click', (event) => {
    if (event.target === modelDialog) {
      const bounds = modelDialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modelDialog.close();
    }
  });
  document.querySelectorAll('[data-download-results]').forEach((button) => button.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ ...benchmark, records: benchmark.models.flatMap(exampleRecords) }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = 'prism-illustrative-benchmark.json'; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }));

  const colors = ['#e0dfd6', '#b3bdb8', '#969e9a', '#727f7a'];
  $('task-chart').innerHTML = '<div class="arena-chart-legend">' + benchmark.models.map((model, index) => `<span><i style="background:${colors[index]}"></i>${model.name}</span>`).join('') + '</div>' + tasks.map((task) => `<div class="arena-chart-group"><span>${task.name}</span><div class="arena-chart-bars">${benchmark.models.map((model, index) => {
    const score = summarize(model, task.id).score;
    return `<div class="arena-chart-bar" role="img" aria-label="${model.name}, ${task.name}: ${percent(score)} illustrative completion"><div class="arena-chart-track"><i style="width:${score}%;background:${colors[index]}"></i></div><span aria-hidden="true">${score.toFixed(0)}%</span></div>`;
  }).join('')}</div></div>`).join('');
  render();
}

if (typeof document !== 'undefined') initArena();
