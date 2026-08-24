import { createRoot } from "react-dom/client";

const dataRows = [
  { label: "Stations deployed", value: "4", note: "Pilot systems" },
  { label: "Tests per policy evaluation", value: "30", previous: "Previous: 300" },
  { label: "Physical test variability", value: "3%", previous: "Previous: 40%" },
  { label: "Engineering time saved", value: "2,000 hr", note: "Each month" },
];

function EvaluationDataSheet() {
  return (
    <article className="data-sheet" aria-labelledby="data-sheet-title">
      <header className="data-sheet-header">
        <div>
          <p>Prism evaluation data sheet</p>
          <h3 id="data-sheet-title">Pilot customer estimates</h3>
        </div>
        <span>Deployed</span>
      </header>

      <div className="data-sheet-summary">
        <p>Measured outcome</p>
        <strong>Clear policy comparison</strong>
        <span>Prism controls the physical state before each test.</span>
      </div>

      <dl className="data-sheet-grid">
        {dataRows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
            <p>{row.previous || row.note}</p>
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
