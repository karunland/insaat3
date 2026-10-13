## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project conventions

See README.md (Turkish) for full structure. Key points:

- Page bodies live in `src/views/*.astro` and take a `lang` prop; `src/pages/` files are thin wrappers (one per language). Localized paths are in `src/i18n/routes.ts`.
- All UI copy is in `src/i18n/ui.ts`; the EN dictionary is typed against TR, so missing keys fail `astro check`.
- Projects: `src/content/projects/<slug>/{tr,en}.md` + shared `images/`. Access them through `src/lib/projects.ts`, never `getCollection` directly (it parses ids and checks TR/EN consistency).
- `contractValue` and `discountRate` must never be rendered.
- No UI framework: client behaviour is vanilla TS in `src/scripts/` or component `<script>` tags, and must respect `prefers-reduced-motion`.
- Run `npm run build` (includes `astro check`) before finishing a change.
