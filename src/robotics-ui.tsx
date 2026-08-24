import { createRoot } from "react-dom/client";

const dataRows = [
  {
    label: "Physical test variability",
    value: "3%",
    note: "From 40%",
    detail: "The estimated change in results between repeated runs of the same staged test condition.",
  },
  {
    label: "Engineering time saved",
    value: "20,000 hr",
    note: "Pilot estimate to date",
    detail: "Estimated time not spent on manual resets, repeated runs, and result cleanup across pilot evaluations.",
  },
];

function MetricHelp({ id, label, children }: { id: string; label: string; children: string }) {
  return (
    <span className="metric-help">
      <button type="button" aria-label={`Explain ${label}`} aria-describedby={id}>i</button>
      <span className="metric-tooltip" id={id} role="tooltip">{children}</span>
    </span>
  );
}

function EvaluationDataSheet() {
  return (
    <article className="data-sheet" aria-labelledby="data-sheet-title">
      <header className="data-sheet-header">
        <div>
          <p>Policy evaluation outcomes</p>
          <h3 id="data-sheet-title">Pilot customer estimates</h3>
        </div>
        <span>Pilot estimates</span>
      </header>

      <div className="data-sheet-summary">
        <p className="metric-label">
          <span>Measured impact</span>
          <MetricHelp id="evaluation-cycle-help" label="faster evaluation cycles">
            Projection stages the required scene and vision verifies it before every run. With less variation between runs, teams need fewer evaluations to compare policy versions.
          </MetricHelp>
        </p>
        <strong><b>10×</b><span>faster evaluation cycles</span></strong>
        <span>Projection stages the same scene. Vision verifies it before each run. Less scene-to-scene noise lets teams compare policies in 30 controlled runs instead of 300 brute-force runs.</span>
      </div>

      <dl className="data-sheet-grid">
        {dataRows.map((row, index) => (
          <div key={row.label}>
            <dt>
              <span>{row.label}</span>
              <MetricHelp id={`metric-help-${index}`} label={row.label}>{row.detail}</MetricHelp>
            </dt>
            <dd>{row.value}</dd>
            <p>{row.note}</p>
          </div>
        ))}
      </dl>

      <div className="data-sheet-footer">
        <span>Source</span>
        <strong>Evaluation estimates from pilot customers</strong>
      </div>
    </article>
  );
}

const rootElement = document.getElementById("prism-console");

if (rootElement) {
  createRoot(rootElement).render(<EvaluationDataSheet />);
}
