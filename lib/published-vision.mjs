/** Publish the approved layout while retaining the established search/share metadata. */
export function publishedVisionHtml(sample, previous, { canonicalUrl } = {}) {
  const previousHead = previous.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  if (!previousHead) throw new Error("Missing production metadata source");
  const title = previousHead.match(/<title>[\s\S]*?<\/title>/)?.[0];
  const description = previousHead.match(/<meta\s+name="description"[\s\S]*?\/>/)?.[0];
  const retained = previousHead.match(/<link rel="canonical"[^>]*>|<meta (?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g);
  if (!title || !description || !retained?.length) throw new Error("Incomplete production metadata");
  const published = sample
    .replace(/\s*<meta name="robots" content="noindex, nofollow" \/>/, "")
    .replace(/<title>[\s\S]*?<\/title>/, `${title}\n    ${retained.join("\n    ")}`)
    .replace(/<meta name="description"[^>]*>/, description)
    .replaceAll('content="https://lightcompany.ai/og.png"', 'content="https://lightcompany.ai/og-blue.png"')
    .replaceAll('href="/robotics-vision"', 'href="/robotics"');
  if (!canonicalUrl) return published;
  return published
    .replace(/(<link rel="canonical" href=")[^"]+"/, `$1${canonicalUrl}"`)
    .replace(/(<meta property="og:url" content=")[^"]+"/, `$1${canonicalUrl}"`);
}
