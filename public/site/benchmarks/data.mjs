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
    { id: "gemini", name: "Gemini 4 Argon", provider: "Google DeepMind", logo: "gemini-color", results: { placement: [18, 20], transfer: [17, 20], recovery: [17, 20] } },
    { id: "gpt", name: "GPT-6.1 Sol", provider: "OpenAI", logo: "openai", results: { placement: [18, 20], transfer: [16, 20], recovery: [15, 20] } },
    { id: "claude", name: "Opus 5.5", provider: "Anthropic", logo: "claude-color", results: { placement: [16, 20], transfer: [15, 20], recovery: [14, 20] } },
    { id: "groot", name: "GR00T N1.7", provider: "NVIDIA", logo: "nvidia-color", results: { placement: [14, 20], transfer: [12, 20], recovery: [11, 20] } },
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
