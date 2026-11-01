# Light Company website

The production marketing site for [lightcompany.ai](https://lightcompany.ai): projected intelligence for physical work, with dedicated robotics, gallery, and privacy pages.

## Working together

- `main` is the production branch.
- Create a branch for each change and open a pull request.
- Pull requests run the complete build and rendered-page tests.
- Merging to `main` publishes the site through GitHub Pages automatically.
- `@Jonnysol` and `@CoolGuy2982` are code owners for the site.

The public pages, images, and videos have a static export. The current live Sites deployment also runs a Worker and D1 database for form submissions. The Prism preorder form requires that server; a static export alone cannot collect leads.

## Local development

```bash
npm ci
npm run dev
```

The development server prints its local URL when ready.

## Validation

```bash
npm test
```

This builds the Vinext application, creates the GitHub Pages artifact in `.pages-dist`, and runs the rendered-page and static-output tests.

## Production

The workflow in `.github/workflows/deploy-production.yml` publishes only from `main`. GitHub Pages is the intended production host after the `lightcompany.ai` DNS records are cut over. Until then, the current OpenAI Sites deployment remains live so there is no interruption.

Do not move the preorder page to a static-only host without preserving a functioning `/api/preorder` endpoint. See `docs/preorder-leads.md` for storage, migration, and verification details.
