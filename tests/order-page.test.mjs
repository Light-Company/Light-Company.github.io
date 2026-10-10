import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('order page and its dependencies survive the static deployment build', async () => {
  const root = new URL('../.pages-dist/', import.meta.url);
  const html = await readFile(new URL('order/index.html', root), 'utf8');
  const paths = [...html.matchAll(/(?:src|href)="(\/(?:site|media)\/[^"?#]+)/g)].map(match => match[1]);
  await Promise.all([...new Set(paths)].map(path => access(new URL(path.slice(1), root))));
  await access(new URL('site/order/checkout.mjs', root));
  await access(new URL('site/order/offer.json', root));
  assert.match(html, /href="mailto:hi@lightcompany\.ai\?subject=Order%20Prism"/);
  assert.match(html, /rel="canonical" href="https:\/\/lightcompany\.ai\/order"/);
  assert.doesNotMatch(html, /noindex|localhost|127\.0\.0\.1/);
  const home = await readFile(new URL('index.html', root), 'utf8');
  assert.match(home, /href="\/order"/);
});

test('all order-page anchors and cross-page destinations exist', async () => {
  const root = new URL('../.pages-dist/', import.meta.url);
  const html = await readFile(new URL('order/index.html', root), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'IDs must be unique');
  for (const [, path, anchor] of html.matchAll(/href="([^"?#]*)#([^"?#]+)"/g)) {
    const destination = path ? await readFile(new URL(`${path.slice(1)}/index.html`, root), 'utf8') : html;
    assert.ok(destination.includes(`id="${anchor}"`), `Missing ${path}#${anchor}`);
  }
});
