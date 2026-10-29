// Copies the public pages of Sirio's docs/ into src/content/docs, both locales.
//
//   SIRIO_SRC  checkout of the Sirio repository (default ../siriosysadmin)
//   SIRIO_REF  release the docs come from, recorded in each page (default: git describe of SIRIO_SRC)
//
// Fails, writing nothing, on a missing page, a link to an unpublished file or a broken anchor.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { betaBanner } from '../src/beta.mjs';
import { LOCALES, PAGES, anchors, sourceIndex, toPage } from './docs.mjs';

const root = resolve(import.meta.dirname, '..');
const src = resolve(root, process.env.SIRIO_SRC ?? '../siriosysadmin');
const out = { en: join(root, 'src/content/docs/docs'), it: join(root, 'src/content/docs/it/docs') };

if (!existsSync(join(src, 'docs'))) {
	console.error(`sync-docs: no docs/ in ${src}. Set SIRIO_SRC to a checkout of the Sirio repository.`);
	process.exit(1);
}

let ref = process.env.SIRIO_REF ?? '';
if (!ref) {
	try {
		ref = execFileSync('git', ['-C', src, 'describe', '--tags', '--always', '--dirty'], { encoding: 'utf8' }).trim();
	} catch {
		// Not a git checkout: the pages just won't say which release they come from.
	}
}

const index = sourceIndex();
const sources = new Map();
const missing = [];
for (const file of index.keys()) {
	const path = join(src, file);
	if (existsSync(path)) sources.set(file, readFileSync(path, 'utf8'));
	else missing.push(file);
}
if (missing.length) {
	console.error(`sync-docs: missing in ${src}:\n  ${missing.join('\n  ')}`);
	process.exit(1);
}

const anchorCache = new Map();
const anchorsOf = (file) => {
	if (!anchorCache.has(file)) {
		// Anchors come from the body without its H1, like the rendered page.
		anchorCache.set(file, anchors(sources.get(file)));
	}
	return anchorCache.get(file);
};

const pages = [];
const errors = [];
for (const [file, { locale, slug }] of index) {
	// The install instructions download from a private repository: say how to get access.
	const result = toPage(sources.get(file), file, index, anchorsOf, ref, betaBanner(locale));
	errors.push(...result.errors);
	pages.push({ path: join(out[locale], `${slug}.md`), page: result.page });
}
if (errors.length) {
	console.error(`sync-docs: ${errors.length} link(s) the site can't follow:\n  ${errors.join('\n  ')}`);
	process.exit(1);
}

for (const dir of Object.values(out)) {
	rmSync(dir, { recursive: true, force: true });
	mkdirSync(dir, { recursive: true });
}
for (const { path, page } of pages) writeFileSync(path, page);

console.log(
	`sync-docs: ${PAGES.length} pages × ${Object.keys(LOCALES).length} locales from ${src}${ref ? ` (${ref})` : ''}`,
);
