// Investor overview: the setup-spread illustration, the case map and the revenue scenario.
import { cells, successRate, cellChange, nextTest, caseFromHash, annualSoftwareRevenue } from "./model.mjs";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const press = (group, btn) => $$("button", group).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

// 02: same two models, two ways of setting up the scene
const spread = $("[data-spread]");
if (spread) {
  // deterministic jitter so the picture is identical on every load
  let seed = 7;
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280) * 2 - 1;
  const jitter = Array.from({ length: 2 }, () => Array.from({ length: 24 }, rand));
  const read = {
    eye: "The results overlap. Nobody can say B is better without hundreds more trials.",
    prism: "Same models, same trial count. With the setup held fixed, B is clearly better.",
  };
  const draw = (mode) => {
    const width = mode === "eye" ? 22 : 3.5;
    ["a", "b"].forEach((k, i) => {
      const mean = k === "a" ? 60 : 70;
      $(`[data-track="${k}"]`, spread).innerHTML = jitter[i]
        .map((j) => `<i style="left:${Math.max(1, Math.min(99, mean + j * width)).toFixed(1)}%"></i>`)
        .join("") + `<em style="left:${mean}%"></em>`;
    });
    $("[data-spread-read]", spread).textContent = read[mode];
    spread.dataset.mode = mode;
  };
  $$("[data-mode]", spread).forEach((b) => b.addEventListener("click", () => { press(b.parentElement, b); draw(b.dataset.mode); }));
  draw("eye");
}

// 05: one task across 36 table positions
const map = $("[data-casemap]");
if (map) {
  const grid = $("[data-grid]", map);
  let view = "newer";
  let selected = caseFromHash(location.hash) ?? cells.find((c) => c.id === "C4");
  const pct = (v) => (v === null ? "No data" : `${Math.round(v)}%`);
  const label = (cell) => {
    if (!cell.earlier.trials) return "untested";
    const v = view === "change" ? cellChange(cell) : successRate(cell[view]);
    return view === "change" ? `${v > 0 ? "+" : ""}${Math.round(v)}` : `${Math.round(v)}`;
  };
  const tone = (cell) => {
    if (!cell.earlier.trials) return "";
    if (view === "change") {
      const d = cellChange(cell);
      return d < 0 ? "--warn:1" : `--a:${Math.min(1, 0.12 + d / 40).toFixed(2)}`;
    }
    return `--a:${(0.08 + successRate(cell[view]) / 110).toFixed(2)}`;
  };
  const render = () => {
    grid.innerHTML = cells.map((c) => `<button type="button" role="gridcell" class="${c.earlier.trials ? "" : "empty"}${c === selected ? " on" : ""}" style="${tone(c)}" data-id="${c.id}" aria-label="Position ${c.id}, ${label(c)}"><span class="mono">${c.id}</span><b>${label(c)}</b></button>`).join("");
    const c = selected;
    $("[data-case-id]", map).textContent = `Position ${c.id}`;
    $("[data-case-pos]", map).textContent = `x ${c.x} cm · y ${c.y} cm`;
    $("[data-case-a]", map).textContent = pct(successRate(c.earlier));
    $("[data-case-b]", map).textContent = pct(successRate(c.newer));
    $("[data-case-at]", map).textContent = `${c.earlier.successes} / ${c.earlier.trials} valid trials`;
    $("[data-case-bt]", map).textContent = `${c.newer.successes} / ${c.newer.trials} valid trials`;
    const d = cellChange(c);
    $("[data-case-read]", map).textContent = d === null
      ? "Never tested. The average can't tell you anything about this spot."
      : d < 0 ? `${Math.round(d)} points. A regression the average hides.` : `+${Math.round(d)} points at the same starting position.`;
    const next = nextTest();
    $("[data-next]", map).textContent = next ? `Next test Prism would stage: ${next.cell.id} (${next.reason === "uncovered" ? "never tested" : "weakest result"})` : "";
  };
  grid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-id]");
    if (!b) return;
    selected = cells.find((c) => c.id === b.dataset.id);
    history.replaceState(null, "", `#case-${selected.id}`);
    render();
  });
  grid.addEventListener("keydown", (e) => {
    const i = cells.indexOf(selected);
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 6, ArrowUp: -6 }[e.key];
    if (step === undefined || !cells[i + step]) return;
    e.preventDefault();
    selected = cells[i + step];
    render();
    $(`[data-id="${selected.id}"]`, grid)?.focus();
  });
  $$("[data-view]", map).forEach((b) => b.addEventListener("click", () => { press(b.parentElement, b); view = b.dataset.view; render(); }));
  render();
}

// 06: software revenue scenario (targets, not traction)
const calc = $("[data-calc]");
if (calc) {
  const input = $("[data-calc-stations]", calc);
  const money = (n) => (n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M` : `$${Math.round(n / 1e3)}K`);
  const update = () => {
    const stations = Number(input.value);
    $("[data-calc-stations-out]", calc).textContent = stations.toLocaleString("en-US");
    $("[data-calc-out]", calc).textContent = money(annualSoftwareRevenue({ stations }));
  };
  input.addEventListener("input", update);
  update();
}
