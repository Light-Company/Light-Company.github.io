# Prism benchmark release

The October website rebrand is the base. The existing live order and investor routes are retained. `/benchmarks` works through the Vinext route and GitHub Pages export.

The navigation button opens a native dialog. The Robotics homepage offers a nonmodal announcement after 6.5 seconds. Dismissal lasts for the browser session; the navigation button remains available. Escape closes the dialog and returns focus. Motion respects the visitor's reduced-motion preference.

## Data status

All benchmark scores, counts, ranks and heatmaps are explicitly illustrative. No Prism run report was supplied for this change. Do not describe these data as a completed experiment, measured performance, or a validated winner.

The page is excluded from indexing while it contains illustrative data. The page, modal, announcement, chart and social metadata all describe a preview.

## Replacing the example

1. Supply the exact model versions, runtime settings, hardware, tasks, rubric, reset acceptance criteria, and action budgets.
2. Supply trial records and the policy for setup rejections, timeouts, faults and exclusions. Keep missing evidence separate from failure.
3. Replace `public/site/benchmarks/data.mjs`, the workspace copy and the abstract using the verified report. The map is a separate dataset; do not derive it from the aggregate score.
4. Add uncertainty and replication information before describing a model as a clear winner.
5. Update the preview notices, share metadata and indexing policy only after those checks. Reset the announcement session key for the verified release.

Model icons: Lobe Icons, MIT license, https://github.com/lobehub/lobe-icons . Marks identify the example lineup; no affiliation or endorsement is implied.

## Arena workspace

The benchmark is the product interface: a searchable leaderboard with task filtering and shared ranks for tied rates, model detail panels, side-by-side task comparisons, five controlled-variable sweeps, paginated trial records, and methodology. Model families are examples; exact versions remain pending.

95% Wilson intervals are calculated from illustrative counts only. Trial records are synthetic, generated to match the counts exactly; setup verification and recordings remain null. Downloads retain their illustrative status. The map is a separate example policy and cannot be attributed to the listed models.
