import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('order page and its dependencies survive the static deployment build', async () => {
  const root = new URL('../.pages-dist/', import.meta.url);
  const html = await readFile(new URL('order/index.html', root), 'utf8');
  const paths = [...html.matchAll(/(?:src|poster|href)="(\/(?:site|media|products)\/[^"?#]+)/g)].map(match => match[1]);
  await Promise.all([...new Set(paths)].map(path => access(new URL(path.slice(1), root))));
  assert.match(html, /action="\/api\/preorder" method="post"/);
  for (const name of ['fullName', 'email', 'company']) {
    assert.match(html, new RegExp(`name="${name}"[^>]*required`));
  }
  assert.match(html, /No payment required to join/);
  assert.match(html, /href="mailto:jon@lightcompany\.ai\?subject=Prism%20preorder"/);
  assert.match(html, /rel="canonical" href="https:\/\/lightcompany\.ai\/order"/);
  assert.doesNotMatch(html, /noindex|localhost|127\.0\.0\.1/);
  // the landing page is left exactly as approved; the order page is reached from the investor and Prism pages
  const investors = await readFile(new URL('robotics/investors/index.html', root), 'utf8');
  assert.match(investors, /href="\/order"/);
});

test('all order-page anchors and cross-page destinations exist', async () => {
  const root = new URL('../.pages-dist/', import.meta.url);
  const html = await readFile(new URL('order/index.html', root), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'IDs must be unique');
  for (const [, path, anchor] of html.matchAll(/href="([^"?#]*)#([^"?#]+)"/g)) {
    const destinationPath = path === '/' ? 'index.html' : `${path.slice(1)}/index.html`;
    const destination = path ? await readFile(new URL(destinationPath, root), 'utf8') : html;
    assert.ok(destination.includes(`id="${anchor}"`), `Missing ${path}#${anchor}`);
  }
});
