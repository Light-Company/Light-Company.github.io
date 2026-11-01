// Replace only after the run report, model versions, and scoring rubric are confirmed.
export const benchmark = {
  status: "illustrative",
  title: "Prism Benchmarks",
  disclosure: "Illustrative preview. Scores, rankings, trial counts, and maps are sample data, not measured model performance.",
  tasks: [
    { id: "all", name: "All tasks" },
    { id: "placement", name: "Pick & place" },
    { id: "transfer", name: "Transfer" },
    { id: "recovery", name: "Recovery" },
  ],
  models: [
    { id: "gemini", name: "Gemini", provider: "Google DeepMind", logo: "gemini-color", results: { placement: [18, 20], transfer: [17, 20], recovery: [17, 20] } },
    { id: "gpt", name: "GPT", provider: "OpenAI", logo: "openai", results: { placement: [18, 20], transfer: [16, 20], recovery: [15, 20] } },
    { id: "claude", name: "Claude", provider: "Anthropic", logo: "claude-color", results: { placement: [16, 20], transfer: [15, 20], recovery: [14, 20] } },
    { id: "groot", name: "GR00T", provider: "NVIDIA", logo: "nvidia-color", results: { placement: [14, 20], transfer: [12, 20], recovery: [11, 20] } },
  ],
};

export function summarize(model, task = "all") {
  const values = task === "all" ? Object.values(model.results) : [model.results[task]];
  if (values.some((value) => !value)) throw new RangeError("Unknown task");
  const [completed, trials] = values.reduce(([a, b], [successes, attempts]) => {
    if (!Number.isInteger(successes) || !Number.isInteger(attempts) || successes < 0 || attempts < successes) throw new RangeError("Invalid trial counts");
    return [a + successes, b + attempts];
  }, [0, 0]);
  return { completed, trials, score: trials ? completed / trials * 100 : null };
}

export function rankModels(task = "all", models = benchmark.models) {
  return models.map((model) => ({ ...model, ...summarize(model, task) }))
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
}

// Separate illustrative sweeps, not observations or inputs to the headline score.
export const sweeps = {
  position: { label: "Position", x: "Object position →", y: "Near to far reach", note: "Move the starting position. Keep the object, angle, clutter, and light fixed.", values: [11,12,12,12,10,8,11,12,12,11,9,7,10,11,12,11,8,6,8,10,11,9,6,4,5,7,8,6,3,null] },
  orientation: { label: "Orientation", x: "Rotation →", y: "Tested start pose", note: "Rotate the object. Keep its position and the rest of the scene fixed.", values: [12,12,10,8,5,3,12,11,10,8,6,4,11,11,9,7,5,3,11,10,9,6,4,2,10,9,7,5,3,null] },
  clutter: { label: "Clutter", x: "Added clutter →", y: "Tested layout", note: "Add surrounding items. Keep the target object and its starting pose fixed.", values: [12,12,11,9,7,4,12,11,10,8,6,4,11,11,9,8,5,3,12,10,9,7,4,2,11,10,8,6,3,null] },
  objects: { label: "Objects", x: "Object identity →", y: "Tested case", note: "Swap the target object. Keep the layout, light, and task instruction fixed.", values: [12,10,12,8,11,6,11,9,11,7,10,5,12,9,10,7,9,4,11,8,10,6,8,4,10,8,9,5,7,null] },
  lighting: { label: "Lighting", x: "Lighting condition →", y: "Tested case", note: "Change the light. Keep the object, starting pose, and surrounding scene fixed.", values: [6,9,12,12,10,7,5,8,11,12,10,7,5,8,12,11,9,6,4,7,10,11,8,5,3,6,9,10,7,null] },
};


export function wilsonInterval(completed, trials) {
  summarize({ results: { count: [completed, trials] } });
  if (!trials) return null;
  const z = 1.959963984540054;
  const p = completed / trials;
  const denominator = 1 + z * z / trials;
  const center = (p + z * z / (2 * trials)) / denominator;
  const margin = z * Math.sqrt(p * (1 - p) / trials + z * z / (4 * trials * trials)) / denominator;
  return [Math.max(0, center - margin) * 100, Math.min(1, center + margin) * 100];
}

// Synthetic records for exploring this interface; never label them observed rollouts.
export function exampleRecords(model) {
  summarize(model);
  return Object.entries(model.results).flatMap(([task, [completed, trials]]) =>
    Array.from({ length: trials }, (_, i) => ({
      id: 'EX-' + model.id.toUpperCase() + '-' + task.slice(0, 3).toUpperCase() + '-' + String(i + 1).padStart(2, '0'),
      model: model.id, task, status: 'illustrative',
      outcome: Math.floor((i + 1) * completed / trials) > Math.floor(i * completed / trials) ? 'completed' : 'failed',
      setupVerified: null, recording: null,
    })));
}
