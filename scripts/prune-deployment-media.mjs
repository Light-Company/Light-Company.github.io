import { readdir, readFile, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  }))).flat();
}

// Keep original source media and the Pages export. Only trim the Worker build.
// The rendered export is authoritative; legacy HTML used only for metadata is not.
const htmlFiles = (await files('.pages-dist')).filter((file) => file.endsWith('.html'));
if (!htmlFiles.length) throw new Error('Build the current Pages export before pruning media.');
const runtimeFiles = (await files('public')).filter((file) => /\.(?:js|mjs|css|json)$/.test(file));
const references = (await Promise.all([...htmlFiles, ...runtimeFiles].map((file) => readFile(file, 'utf8')))).join('\n');
// Gallery hover URLs are assembled from playlist slugs at runtime.
const galleryScript = await readFile('public/site/gallery/gallery.js', 'utf8');
const galleryPreviews = new Set([...galleryScript.matchAll(/slug: "([a-z0-9-]+)"/g)].map((match) => `media/prism/${match[1]}.gif`));
let removedBytes = 0;
const removed = [];
for (const source of await files('public/media')) {
  if (!/\.(?:mp4|gif|jpg|jpeg|png|webp)$/.test(source)) continue;
  if (references.includes(path.basename(source)) || galleryPreviews.has(path.relative('public', source))) continue;
  const target = path.join('dist/client', path.relative('public', source));
  let info;
  try { info = await stat(target); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  await unlink(target);
  removedBytes += info.size;
  removed.push(path.relative('public', source));
}
// Assert that every directly referenced media URL still exists in the bundle.
for (const match of references.matchAll(/(?:["'(])\/(media\/[^"'()?#\s]+)\b/g)) {
  if (/\.(?:mp4|gif|jpg|jpeg|png|webp)$/.test(match[1])) await stat(path.join('dist/client', match[1]));
}
for (const preview of galleryPreviews) await stat(path.join('dist/client', preview));
const totalBytes = (await Promise.all((await files('dist')).map(async (file) => (await stat(file)).size))).reduce((a, b) => a + b, 0);
if (totalBytes > 250 * 1024 * 1024) throw new Error('Worker build still exceeds the deployment safety margin.');
console.log(JSON.stringify({ removedFiles: removed.length, removedMiB: +(removedBytes / 1048576).toFixed(2), artifactMiB: +(totalBytes / 1048576).toFixed(2), originalMediaPreserved: true }));
