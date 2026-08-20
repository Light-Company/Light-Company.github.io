# Light Company website

The production marketing site for [lightcompany.ai](https://lightcompany.ai): projected intelligence for physical work, with dedicated robotics, gallery, and privacy pages.

## Working together

- `main` is the production branch.
- Create a branch for each change and open a pull request.
- Pull requests run the complete build and rendered-page tests.
- Merging to `main` publishes the site through GitHub Pages automatically.
- `@Jonnysol` and `@CoolGuy2982` are code owners for the site.

The deployment is intentionally static. The public pages, images, and videos are produced from the same source used by the local Vinext application.

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
