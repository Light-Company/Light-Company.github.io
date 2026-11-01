# Prism capability and editorial summary

Updated November 1, 2026.

## Product positioning

Prism is a platform for evaluating robot policies in the real world. It defines the test scene, guides setup, verifies the starting conditions and records the run. Teams compare policies across conditions and review the evidence behind each result.

The website explains the evaluation workflow first. Calibration and other implementation details belong in supporting documentation.

## Confirmed capabilities

- **Test definitions:** tasks, object placements, orientations, setup instructions, prompts and success criteria.
- **Scene setup:** projected placement guides and checks against the intended starting state.
- **Versioned scenes:** saved test libraries and links between a run, its scene and model settings.
- **Evaluation operations:** model presets, operator assignments, station queues and experiment priorities.
- **Scoring:** task rubrics, per-step outcomes, completion times, success thresholds and abnormal-run review.
- **Evidence review:** camera recordings, 3D telemetry, notes and attachments alongside the result.
- **Comparisons:** results grouped by task, condition and model, including success rate, progress and execution time.
- **Reports:** saved experiment summaries and exports for further analysis.
- **Imports and connections:** Notion, CSV and API connections for existing test libraries.
- **Team access:** roles that distinguish station operation from result review and administration.

## Customer workflow

1. Define the task, starting scene and scoring rubric.
2. Stage the scene with projected guides.
3. Verify the starting conditions.
4. Run the policy and record the evidence.
5. Score the outcome and review exceptions.
6. Compare results and select the next test.

Change one variable at a time: position, orientation, objects, clutter or lighting. Show performance by condition and keep untested conditions visible. A capability map describes the conditions evaluated; it does not imply exhaustive coverage.

## Editorial direction

Use short, direct descriptions of what the product does. Prefer concrete labels such as Scene, Placement, Model, Run, Rubric, Recording, Compare and Export. Keep headings at a comfortable reading size and use product records, tables and footage to explain the workflow.

“Git for your physical space” is a compact analogy for saved test scenes and traceable changes. Explain the actual actions immediately afterward: save a setup, change a variable, run a model and compare the result.

Use “replay” for reviewing a recorded rollout and “re-run” for a new physical trial. Describe rubric scoring accurately without implying that every outcome is judged automatically. A saved report is a published snapshot; it is not necessarily an immutable record.

## Benchmark presentation

Product capabilities and measured results are different kinds of claims. Sample scores, rankings, charts and model comparisons must remain clearly labeled as illustrative until the underlying results are supplied. Do not present sample values as completed benchmark findings.

Published results should identify the task, tested conditions, model configuration, scoring method, trial count and exclusions. Quantified accuracy, speed or performance claims require the corresponding measurements.

## Messaging reference

[Bifrost’s official website](https://www.bifrost.ai/) is a reference for clear product explanation: lead with the work the product does, organize features around the evaluation workflow, and show concrete examples alongside short claims. Prism uses its own product language and evidence. Competitor performance claims, customers and supported-model lists are not transferable.

## Recommended page sequence

Product definition → See, verify, record → Evaluation workflow → Scene versions → Results by condition → Lab operations → Evidence review → Imports and connections → Questions and contact.
