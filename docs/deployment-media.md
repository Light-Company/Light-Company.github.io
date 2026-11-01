# Hosting artifact size

The full media directory exceeds the hosting service's 256 MiB input archive limit. Preserve original media in the source repository and in GitHub Pages. Before packaging a Worker deployment, run the current build, then:

    node scripts/build-pages.mjs
    node scripts/prune-deployment-media.mjs

The second command removes only generated `dist/client/media` files whose names do not occur in rendered public HTML or public runtime JavaScript, CSS, or JSON. It retains PDFs, provider logos, fonts, gallery collections, and every referenced media URL. It verifies media references after pruning and fails if the remaining build exceeds 250 MiB.

This trims obsolete clips and animated images out of the deployment archive without deleting their source originals or changing the site's visible content. Do not deploy a source-only version of the full repository: that input archive exceeds the service limit before it can build.
