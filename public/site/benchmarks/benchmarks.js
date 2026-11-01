import { benchmark, rankModels, sweeps } from "./data.mjs";

const logo = (name) => `/site/benchmarks/logos/${name}.svg`;
const triggers = [...document.querySelectorAll("[data-benchmark-open]")];
if (triggers.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "benchmark-dialog";
  dialog.setAttribute("aria-labelledby", "benchmark-dialog-title");
  dialog.setAttribute("aria-describedby", "benchmark-dialog-description");
  dialog.innerHTML = `<div class="benchmark-dialog-inner"><button class="benchmark-dialog-close" aria-label="Close benchmark introduction" autofocus>×</button><p class="eyebrow">The Light Company Research</p><span class="preview-label">Illustrative preview</span><h2 id="benchmark-dialog-title">See our scores.</h2><p id="benchmark-dialog-description">Prism controls and verifies the initial state of every rollout, so results reflect the policy, not the reset.</p><div class="benchmark-dialog-logos" aria-label="Example lineup: Google DeepMind, OpenAI, Anthropic, NVIDIA">${benchmark.models.map((m) => `<img src="${logo(m.logo)}" alt="" class="${m.logo === "openai" ? "logo-invert" : ""}" />`).join("")}</div><a class="btn btn-primary" href="/benchmarks">Explore the benchmark <span aria-hidden="true">↗</span></a><p class="dialog-example-note">Illustrative scores and rankings. Verified run data will replace this preview.</p></div>`;
  document.body.append(dialog);
  let opener;
  let teaser;
  const dismissTeaser = () => { if (teaser) teaser.hidden = true; try { sessionStorage.setItem("prism-benchmark-intro-v1", "seen"); } catch { /* Storage may be unavailable. */ } };
  const open = (event) => { opener = event.currentTarget; dismissTeaser(); if (!dialog.open) dialog.showModal(); triggers.forEach((button) => button.setAttribute("aria-expanded", "true")); };
  triggers.forEach((button) => button.addEventListener("click", open));
  dialog.querySelector("button").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener("close", () => { triggers.forEach((button) => button.setAttribute("aria-expanded", "false")); const target = opener?.isConnected && !opener.closest("[hidden]") ? opener : triggers[0]; target?.focus({ preventScroll: true }); });
  let seen = false;
  try { seen = sessionStorage.getItem("prism-benchmark-intro-v1") === "seen"; } catch { /* Keep the entry button available without storage. */ }
  if (document.body.hasAttribute("data-benchmark-announcement") && !seen) {
    teaser = document.createElement("aside");
    teaser.className = "benchmark-teaser";
    teaser.hidden = true;
    teaser.setAttribute("aria-label", "Benchmark research preview");
    teaser.innerHTML = `<button class="benchmark-teaser-close" aria-label="Dismiss benchmark announcement">×</button><p class="eyebrow">Research preview</p><h2>See our scores.</h2><p>A first look at model comparisons and capability maps. Illustrative data.</p><button data-teaser-open>Explore benchmarks <span aria-hidden="true">↗</span></button>`;
    document.body.append(teaser);
    teaser.querySelector(".benchmark-teaser-close").addEventListener("click", dismissTeaser);
    teaser.querySelector("[data-teaser-open]").addEventListener("click", open);
    window.setTimeout(() => { if (!dialog.open && !document.hidden) { let dismissed = false; try { dismissed = sessionStorage.getItem("prism-benchmark-intro-v1") === "seen"; } catch { /* No persistent storage. */ } if (!dismissed) teaser.hidden = false; } }, 6500);
  }
}

const rows = document.getElementById("benchmark-rows");
if (rows) {
  const render = (task) => {
    const ranked = rankModels(task);
    rows.innerHTML = ranked.map((m) => `<tr><td><div class="model-cell"><img src="${logo(m.logo)}" class="${m.logo === "openai" ? "logo-invert" : ""}" alt="" /><span><strong>${m.name}</strong><small>${m.provider}</small></span></div></td><td class="score-cell"><strong>${m.score === null ? "Not tested" : `${m.score.toFixed(1)}%`}</strong><span class="score-track" aria-hidden="true"><i style="--score:${m.score ?? 0}%"></i></span></td><td class="trial-count">${m.completed} / ${m.trials}</td></tr>`).join("");
    document.getElementById("benchmark-result-summary").textContent = `${benchmark.tasks.find((t) => t.id === task).name} · ${ranked[0].trials} example trials per model · Illustrative data`;
  };
  render("all");
  document.getElementById("benchmark-task").addEventListener("change", (event) => render(event.target.value));
}

const cells = document.getElementById("capability-cells");
if (cells) {
  const selectCell = (button, id, successes) => {
    cells.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    document.getElementById("cell-name").textContent = id;
    document.getElementById("cell-score").textContent = successes === null ? "Not tested. No result is inferred." : `${successes} / 12 example trials completed`;
  };
  const render = (name) => {
    const sweep = sweeps[name];
    document.querySelectorAll("[data-sweep]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.sweep === name)));
    document.getElementById("map-title").textContent = `${sweep.label} sweep`;
    document.getElementById("sweep-name").textContent = sweep.label;
    document.getElementById("sweep-description").textContent = sweep.note;
    document.getElementById("map-x").textContent = sweep.x;
    document.getElementById("map-y").textContent = sweep.y;
    cells.replaceChildren();
    sweep.values.forEach((successes, index) => {
      const id = `${String.fromCharCode(65 + index % 6)}${Math.floor(index / 6) + 1}`;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = id;
      button.setAttribute("aria-label", `${sweep.label} ${id}: ${successes === null ? "not tested" : `${successes} of 12 sample trials completed`}`);
      button.setAttribute("aria-pressed", "false");
      button.className = successes === null ? "is-empty" : "";
      button.style.setProperty("--cell-color", `hsl(204 65% ${18 + (successes ?? 0) * 5.5}%)`);
      button.style.setProperty("--cell-text", successes < 6 ? "#d8e8f3" : "#0e2333");
      button.addEventListener("click", () => selectCell(button, id, successes));
      cells.append(button);
      if (index === 0) selectCell(button, id, successes);
    });
  };
  document.querySelectorAll("[data-sweep]").forEach((b) => b.addEventListener("click", () => render(b.dataset.sweep)));
  render("position");
}
