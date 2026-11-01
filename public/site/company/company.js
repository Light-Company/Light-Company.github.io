import { sceneRevisions } from "./scene-data.mjs";

const history = document.querySelector("[data-scene-history]");
if (history) {
  const buttons = [...history.querySelectorAll("[data-revision]")];
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const scene = sceneRevisions[button.dataset.revision];
      if (!scene) return;
      for (const item of buttons) item.setAttribute("aria-pressed", String(item === button));
      history.querySelector("[data-scene-cup]").setAttribute("transform", scene.transform);
      history.querySelector("[data-scene-cup]").setAttribute("visibility", scene.object === "block" ? "hidden" : "visible");
      history.querySelector("[data-scene-block]").setAttribute("visibility", scene.object === "block" ? "visible" : "hidden");
      history.querySelector("[data-scene-surface]").setAttribute("fill", scene.lighting === "dim" ? "#080b0f" : "#17212a");
      history.querySelector("[data-scene-light]").textContent = scene.lighting === "dim" ? "Lighting: dim example" : "Lighting: baseline";
      history.querySelector("[data-scene-clutter]").setAttribute("visibility", scene.clutter ? "visible" : "hidden");
      history.querySelector("#scene-plan-title").textContent = `Example scene: ${scene.label.toLowerCase()}`;
      history.querySelector("#scene-plan-desc").textContent = scene.description;
      history.querySelector("[data-scene-change]").textContent = scene.change;
      history.querySelector("[data-scene-question]").textContent = scene.question;
      history.querySelector("[data-scene-status]").textContent = `Viewing ${scene.label.toLowerCase()} · example only · no physical verification`;
    });
  }
}
