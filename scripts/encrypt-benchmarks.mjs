// Seal the Physical AI Index for publishing. The plaintext never enters this repository.
//   PAI_PASSWORD=... node scripts/encrypt-benchmarks.mjs ~/src/lc-physical-ai-index/data/index.json
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { openVault, sealVault } from "../public/site/benchmarks/assets/vault.mjs";

const [source] = process.argv.slice(2);
const password = process.env.PAI_PASSWORD;
if (!source || !password) {
  console.error("usage: PAI_PASSWORD=... node scripts/encrypt-benchmarks.mjs <path to index.json>");
  process.exit(1);
}

const data = JSON.parse(await readFile(resolve(source), "utf8"));
const ids = data.benchmarks.map((b) => b.id);
if (ids.includes("all")) throw new Error("'all' is reserved for /benchmarks/all/");

const envelope = await sealVault(data, password);
if (JSON.stringify(await openVault(envelope, password)) !== JSON.stringify(data)) throw new Error("Round trip failed");

const out = join(dirname(fileURLToPath(import.meta.url)), "../public/site/benchmarks/data");
await writeFile(join(out, "index.enc.json"), `${JSON.stringify(envelope)}\n`);
await writeFile(join(out, "routes.json"), `${JSON.stringify({ benchmarks: ids }, null, 2)}\n`);
console.log(`Sealed ${ids.length} benchmarks (${data.models.length} models) into public/site/benchmarks/data/index.enc.json`);
