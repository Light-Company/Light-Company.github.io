import assert from 'node:assert/strict';
import test from 'node:test';
import { arenaStateHash, parseArenaState, selectArenaTrials } from '../public/site/benchmarks/arena.js';
import { benchmark, summarize } from '../public/site/benchmarks/data.mjs';

test('shared comparison links preserve the task, selected models and search without changing data', () => {
  const state = parseArenaState('#compare?task=placement&a=claude&b=gemini&q=Google+DeepMind&sort=name');
  assert.equal(state.view, 'compare');
  assert.equal(state.task, 'placement');
  assert.equal(state.a, 'claude');
  assert.equal(state.b, 'gemini');
  assert.equal(state.query, 'Google DeepMind');
  assert.deepEqual(parseArenaState(arenaStateHash(state)), state);
  assert.equal(benchmark.status, 'illustrative');
});

test('unrecognized link parameters fall back to supported views, tasks and models', () => {
  const state = parseArenaState('#__proto__?task=unknown&model=missing&a=missing&sort=bad&outcome=bad&page=Infinity&q=%3Cscript%3E');
  assert.equal(state.view, 'leaderboard');
  assert.equal(state.task, 'all');
  assert.equal(state.model, 'gemini');
  assert.equal(state.a, 'gemini');
  assert.equal(state.sort, 'score');
  assert.equal(state.outcome, 'all');
  assert.equal(state.page, 0);
  assert.equal(state.query, '<script>'); // Search remains text, never rendered as markup.
  assert.equal(parseArenaState('#trials?page=-1').page, 0);
  assert.equal(parseArenaState('#trials?page=1.5').page, 0);
  assert.equal(parseArenaState('#maps').view, 'maps');
});

test('trial inspection preserves the ranking denominator and selected task for every model', () => {
  for (const model of benchmark.models) {
    for (const task of benchmark.tasks) {
      const summary = summarize(model, task.id);
      const all = selectArenaTrials(model.id, task.id);
      const completed = selectArenaTrials(model.id, task.id, 'completed');
      const failed = selectArenaTrials(model.id, task.id, 'failed');
      assert.equal(all.total, summary.trials);
      assert.equal(completed.total, summary.completed);
      assert.equal(failed.total, summary.trials - summary.completed);
      assert.ok(all.records.every((record) => task.id === 'all' || record.task === task.id));
      assert.ok(all.records.every((record) => record.status === 'illustrative' && record.setupVerified === null && record.recording === null));
    }
  }
});

test('restored trial pagination clamps to the filtered dataset and never loses remaining rows', () => {
  const state = parseArenaState('#trials?task=placement&model=gemini&outcome=failed&page=999');
  const failed = selectArenaTrials(state.model, state.task, state.outcome, state.page);
  assert.equal(failed.page, 0);
  assert.equal(failed.total, 2);
  assert.equal(failed.records.length, 2);
  assert.ok(failed.records.every((record) => record.task === 'placement' && record.outcome === 'failed'));
  const first = selectArenaTrials('gemini', 'placement', 'all', 0);
  const last = selectArenaTrials('gemini', 'placement', 'all', 1);
  assert.equal(last.start, 12);
  assert.equal(last.records.length, 8);
  assert.equal(new Set([...first.records, ...last.records].map((record) => record.id)).size, 20);
});
