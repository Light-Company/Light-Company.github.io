# Hosting artifact size

The full media directory exceeds the hosting service's 256 MiB input archive limit. Preserve original media in the source repository and in GitHub Pages. Before packaging a Worker deployment, run the current build, then:

    node scripts/build-pages.mjs
    node scripts/prune-deployment-media.mjs

The second command removes only generated image/video files under `dist/client` whose names do not occur in rendered public HTML or public runtime JavaScript, CSS, or JSON. Media `sources.json` provenance records are excluded because they also document retired source clips. It explicitly resolves the gallery playlist’s dynamic GIF URLs and retains PDFs, provider logos, fonts, and every referenced media URL. It verifies media references after pruning and fails if the remaining build exceeds 250 MiB.

This trims obsolete clips and animated images out of the deployment archive without deleting their source originals or changing the site's visible content. The full source repository also exceeds the input limit. If artifact upload fails and a remote build is required, prepare a separate hosting checkout omitting only the same unreferenced media. Preserve every gallery GIF identified by its playlist slug, run the full test suite, and keep the complete original media in the GitHub repository. Record omissions in the hosting checkout’s docs/hosted-source-media.md.
