import { useState } from "react";
import { createRoot } from "react-dom/client";

type Mode = "stage" | "verify" | "compare";

const modes: Record<Mode, {
  name: string;
  label: string;
  primary: string;
  primaryNote: string;
  secondary: string;
  secondaryNote: string;
  footer: string;
}> = {
  stage: {
    name: "Stage",
    label: "Condition recipe loaded",
    primary: "± 4 mm",
    primaryNote: "target pose tolerance",
    secondary: "6 / 6",
    secondaryNote: "required objects present",
    footer: "Scene recipe / PRS-047",
  },
  verify: {
    name: "Verify",
    label: "Start state verified",
    primary: "99.2%",
    primaryNote: "condition match",
    secondary: "Clear",
    secondaryNote: "occlusion gate",
    footer: "Vision gate / frame 1842",
  },
  compare: {
    name: "Compare",
    label: "Policy delta isolated",
    primary: "+12 pts",
    primaryNote: "success-rate change",
    secondary: "3",
    secondaryNote: "failure surfaces found",
    footer: "v0.19.3 / versus v0.18.7",
  },
};

function EvaluationConsole() {
  const [mode, setMode] = useState<Mode>("stage");
  const active = modes[mode];

  return (
    <div className="eval-console">
      <div className="eval-toolbar">
        <span>Prism station 02</span>
        <strong>Evaluation 047</strong>
      </div>

      <div className="eval-tabs" role="tablist" aria-label="Evaluation phases">
        {(Object.keys(modes) as Mode[]).map((key) => (
          <button
            className="eval-tab"
            type="button"
            role="tab"
            aria-selected={mode === key}
            key={key}
            onClick={() => setMode(key)}
          >
            {modes[key].name}
          </button>
        ))}
      </div>

      <section className="eval-stage" role="tabpanel" aria-live="polite">
        <div className="eval-visual" aria-hidden="true">
          <div className="eval-axis" />
          <div className="eval-object" />
          <div className="eval-scan" />
          <div className="eval-stage-label"><i />{active.label}</div>
        </div>
        <div className="eval-detail">
          <div>
            <label>{active.primaryNote}</label>
            <strong>{active.primary}</strong>
            <p>Measured against the registered physical condition.</p>
          </div>
          <div>
            <label>{active.secondaryNote}</label>
            <strong>{active.secondary}</strong>
            <p>Stored with the run for policy-to-policy comparison.</p>
          </div>
        </div>
      </section>

      <div className="eval-footer">
        <span>{active.footer}</span>
        <strong>World state valid</strong>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("prism-console");

if (rootElement) {
  createRoot(rootElement).render(<EvaluationConsole />);
}
