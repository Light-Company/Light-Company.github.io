import { createRoot } from "react-dom/client";

const dataRows = [
  { label: "Tests per policy evaluation", value: "30", note: "From 300" },
  { label: "Physical test variability", value: "3%", note: "From 40%" },
  { label: "Engineering time saved", value: "20,000 hr", note: "Pilot estimate to date" },
];

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
        <p>Measured impact</p>
        <strong><b>10×</b><span>faster evaluation cycles</span></strong>
        <span>Reduce a 300-test loop to 30 controlled evaluations.</span>
      </div>

      <dl className="data-sheet-grid">
        {dataRows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
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
