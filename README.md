# siriosysadm.in

The public site of Sirio SysAdmin: a home page that says what it is and does, and the user
documentation, in English and Italian. Built with [Astro Starlight](https://starlight.astro.build).

## Where the content comes from

| Path | What | Edited |
|---|---|---|
| `src/content/docs/index.mdx`, `src/content/docs/it/index.mdx` | home page | here |
| `src/components/home/` | the home page's copy (`copy.ts`, both locales) and sections | here |
| `src/beta.mjs` | the private-beta contact: the email behind every "Ask to join" link, and the banner on the docs | here |
| `src/content/docs/docs/`, `src/content/docs/it/docs/` | the documentation | **in the Sirio repository**, `docs/` and `docs/it/` |

The documentation lives next to the code it describes, in the (private) Sirio repository.
`scripts/sync-docs.mjs` copies the published pages from a checkout of it before every build: it
takes the H1 as the page title and the first paragraph as its description, gives both locales the
English slug (`docs/it/domini.md` → `/it/docs/domains/`, since Starlight pairs translations by
path) and rewrites links between pages into site URLs. The generated pages are gitignored.

Which pages are published is the `PAGES` list in `scripts/docs.mjs`; adding a doc to Sirio means
adding it there and to the sidebar in `astro.config.mjs`. Everything else under `docs/` (the
release procedure, `CONTRIBUTING.md`) stays private. The sync **fails** rather than publish a
link to a page the site doesn't have, or to an anchor that page doesn't have.

## Working on it

Node ≥ 22.23.4 (see `.nvmrc`), with the Sirio repository checked out next to this one
(`../siriosysadmin`) or pointed to by `SIRIO_SRC`.

```bash
npm install
npm run dev        # sync + dev server on :4321
npm run build      # sync + static build into dist/
npm test           # tests of the sync (node --test)
```

`npm run sync` alone regenerates the pages. They record where they came from
(`git describe` of the Sirio checkout, or `SIRIO_REF`).

## Publishing

`.github/workflows/deploy.yml` builds and publishes on GitHub Pages:

- on every Sirio release: Sirio's release workflow sends a `sirio-release` dispatch with the tag,
  so the site always documents the version people install;
- on a push to `main` here, with the latest release's docs;
- by hand (*Run workflow*), optionally from a given Sirio tag or branch.

One-time setup:

1. **Read access to Sirio.** A fine-grained token with *Contents: read-only* on
   `marsaldev/siriosysadmin`, saved here as the secret `SIRIO_DOCS_TOKEN`.
2. **The dispatch from Sirio.** A fine-grained token with *Contents: read and write* on this
   repository (what `repository_dispatch` needs), saved in the Sirio repository as
   `SITE_DISPATCH_TOKEN`. Without it Sirio's release workflow skips the step.
3. **Pages.** Settings → Pages → Source: *GitHub Actions*; custom domain `siriosysadm.in`, with
   *Enforce HTTPS*.
4. **DNS** for `siriosysadm.in`: `A` records to `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153` (and `AAAA` to `2606:50c0:8000::153` … `8003::153`), plus
   `www` as a `CNAME` to `marsaldev.github.io`.
