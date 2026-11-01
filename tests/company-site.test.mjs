import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { companyPages } from "../lib/company-content.mjs";
import { sceneRevisions } from "../public/site/company/scene-data.mjs";

const read=(path)=>readFile(new URL(`../${path}`,import.meta.url),"utf8");

test("company pages ship through both hosting routes with unique canonical metadata",async()=>{
  const titles=new Set();
  for(const page of companyPages){
    const html=await read(`.pages-dist${page.path}/index.html`);
    const source=await read(page.path==="/privacy"?"site/privacy.html":`site/company${page.path}.html`);
    assert.equal(html,source,`${page.path}: static and Worker content must match`);
    await access(new URL(`../app${page.path}/route.ts`,import.meta.url));
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    const title=html.match(/<title>([^<]+)<\/title>/)[1];
    assert.ok(!titles.has(title),`Duplicate title: ${title}`);titles.add(title);
    assert.ok(html.includes(`<link rel="canonical" href="https://lightcompany.ai${page.path}"`));
    const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.ok(schema["@graph"].some(item=>item.url===`https://lightcompany.ai${page.path}`));
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(ids.length,new Set(ids).size,`${page.path}: duplicate IDs`);
    for(const [,id]of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),`${page.path}: missing #${id}`);
  }
});

test("new pages have no broken internal destinations or referenced media",async()=>{
  for(const page of companyPages){
    const html=await read(`.pages-dist${page.path}/index.html`);
    for(const [,value]of html.matchAll(/(?:href|src|poster)="(\/[^"?#]*)/g)){
      const file=value.split('/').at(-1).includes('.')?`.pages-dist${value}`:`.pages-dist${value==='/'?'':value}/index.html`;
      await assert.doesNotReject(access(new URL(`../${file}`,import.meta.url)),`${page.path}: missing ${value}`);
    }
  }
});

test("sitemap includes canonical information pages and excludes illustrative product concepts",async()=>{
  const sitemap=await read("public/sitemap.xml");
  for(const page of companyPages){
    assert.equal(sitemap.includes(`<loc>https://lightcompany.ai${page.path}</loc>`),!page.concept,page.path);
    const html=await read(`.pages-dist${page.path}/index.html`);
    assert.equal(/name="robots" content="noindex/.test(html),!!page.concept,page.path);
  }
  assert.doesNotMatch(sitemap,/<loc>[^<]*(benchmarks|prism-vision|robotics-vision)/);
});

test("scene revisions isolate the intended change and preserve the reference condition",()=>{
  const {baseline,position,orientation,clutter,objects,lighting}=sceneRevisions;
  assert.equal(baseline.transform,clutter.transform);
  assert.equal(baseline.clutter,position.clutter);
  assert.equal(baseline.clutter,orientation.clutter);
  assert.notEqual(baseline.clutter,clutter.clutter);
  assert.equal(baseline.transform.match(/rotate\((.*?)\)/)[1],position.transform.match(/rotate\((.*?)\)/)[1]);
  assert.equal(baseline.transform.match(/translate\((.*?)\)/)[1],orientation.transform.match(/translate\((.*?)\)/)[1]);
  assert.notEqual(baseline.transform,position.transform);
  assert.notEqual(baseline.transform,orientation.transform);
  assert.equal(objects.transform,baseline.transform);
  assert.equal(lighting.transform,baseline.transform);
  assert.equal(objects.clutter,baseline.clutter);
  assert.equal(lighting.clutter,baseline.clutter);
  assert.equal(objects.object,"block");
  assert.equal(lighting.lighting,"dim");
});

test("the expanded navigation keeps investor and policy links beside the recovered lab hero",async()=>{
  const home=await read(".pages-dist/index.html");
  for(const path of ["/prism-robotics","/robotics/investors","/careers","/terms","/privacy","/resources"]){
    assert.ok(home.includes(`href="${path}"`),`Homepage must expose ${path}`);
  }
  assert.match(home,/robotics-hero-lab\.mp4/);
  assert.match(home,/footer-ascii/);
  assert.match(home,/data-benchmark-open/);
});
