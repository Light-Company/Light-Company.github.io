# Physical AI Index (/benchmarks)

Prism Benchmarks by The Light Company: "The most accurate benchmark for physical AI." This replaced the earlier arena workspace on 2026-11-03.

## Routes

| URL | Shell | Page |
|---|---|---|
| `/benchmarks/` | `site/benchmarks.html` | Index: hero with the top five, the index chart, our why, news, compare by topic, changelog, test platforms, and the "Stay up to date" outro |
| `/benchmarks/all/` | `site/benchmarks-all.html` | Standings table (every model × every domain), then each domain's question with one card per benchmark |
| `/benchmarks/<id>/` | `site/benchmark.html` | One benchmark: its question above the finding headline, four key numbers, the tasks, results chart, why it matters, two attempts side by side, every score, a sidebar with leaders and how it's run |

`scripts/build-pages.mjs` writes one `/benchmarks/<id>/index.html` per id in `data/routes.json`, all from the same shell, and gives every page the one site footer (`withSiteChrome`). The app reads the id from the path. The Vinext dev routes are `app/benchmarks/route.ts`, `app/benchmarks/all/route.ts` and `app/benchmarks/[id]/route.ts`.

## Files

- `public/site/benchmarks/assets/app.js`: the app. It renders every page from the data, and contains the charts, pinning, standings, the rail and the outro.
- `public/site/benchmarks/assets/styles.css`: the newspaper-scale layout. Light paper is the default; there's a dark toggle that is remembered under `pai-theme`. Spacing comes from the `--s1`…`--s9` scale.
- `public/site/benchmarks/assets/logos.js` and `assets/logos/`: lab marks.
- `public/site/benchmarks/data/index.enc.json`: all content (models, scores, benchmarks, domains, news, changelog, copy), sealed: gzip, then AES-GCM with a PBKDF2-SHA256 key from the password. The plaintext never enters this public repository.
- `public/site/benchmarks/data/routes.json`: the list of benchmark ids, so the export can build one page per benchmark without the plaintext.
- `public/site/benchmarks/assets/vault.mjs`: seal and open the envelope, in the browser and in Node. The page asks for the password once; the derived key is kept under `pai-key` in local storage, so every other benchmark page opens directly. A new seal (new salt) asks again.
- The footer is the site footer from `lib/company-site.mjs` (`companyFooter`), styled by `public/site/lc/footer.css` and animated by `/site/lc/lc.js`. The app renders no footer of its own.
- Desktop (761px and wider) renders at `zoom: .75`; the footer is counter-zoomed so it matches every other page. `geometry()` divides the zoom out of `--vw`.
- Each shell sets `window.PAI` (route builders and the asset base). Without it, the app uses relative files. This is how the standalone preview in `~/src/lc-physical-ai-index` runs.

## Updating the data

The data is generated in the standalone project:

1. In `~/src/lc-physical-ai-index`, run `python3 tools/build_data.py`. It validates the copy and score rules.
2. Seal it into this repo: `PAI_PASSWORD=<password> node scripts/encrypt-benchmarks.mjs ~/src/lc-physical-ai-index/data/index.json`. This writes `index.enc.json` and `routes.json` and checks the round trip. Never commit `index.json` here.
3. If you changed the app, copy `assets/app.js`, `assets/styles.css` and `assets/logos.js` too, and bump the `?v=` in the three shells.
4. Run `npm test`. `tests/benchmarks.test.mjs` checks that the vault opens only with the right password, that no plaintext scores ship, that every page reads the vault and loads existing assets, the 75% desktop rule, and that the home pages reach the index through the nav link. `tests/site-consistency.test.mjs` checks one nav and one footer on every page.

## Charts on a benchmark page

- **Landscape** (`#landscape`): a 3D surface of every model tested on all of the domain's benchmarks.
  - Models run left to right, grouped by lab or by type.
  - Rows run from the domain mean at the back to this benchmark at the front.
  - Height and colour are the score. The axis and colour key run from the lowest to the highest score on the map, and both are labelled.
  - It is pure SVG with no library, adapted from the teardown in `~/src/lc-physical-ai-index/_reference/prosaic/TEARDOWN.md`.
  - Dots are drawn back to front so hills hide them. The hover targets sit in one layer above the surface, so every point can be reached.
- **Gap** (`#gap`): each model's score here against its mean on the domain's other benchmarks, sorted by the gap.
- **Full completions** (`#completions`): finished attempts out of all attempts. It appears where the data has the counts.
- Selecting a model on any chart pins it on every chart.

## Interactions

- Click any bar, leaderboard row or standings row to pin that model on every chart. Esc unpins it.
- The index chart toggles between success and failure rates. It also has share, CSV download and a lab filter.
- The outro: "Stay up to date" is drawn in characters. As you scroll, it scrambles into the Light Company logo, and scrolling back reverses it. The pointer then colours and flickers the letters, the same treatment as the ASCII footer. Reduced motion shows the logo statically.
