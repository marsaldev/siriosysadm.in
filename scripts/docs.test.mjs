import { test } from 'node:test';
import assert from 'node:assert/strict';
import { anchors, rewriteLinks, sourceIndex, titleAndDescription, toPage } from './docs.mjs';

const pages = [
	{ slug: 'domains', en: 'domains.md', it: 'domini.md' },
	{ slug: 'security', en: 'security.md', it: 'sicurezza.md' },
];
const index = sourceIndex(pages);
const heads = {
	'docs/domains.md': new Set(['exposing-the-panel-itself']),
	'docs/security.md': new Set(['listening-ports']),
	'docs/it/domini.md': new Set(['esporre-il-pannello-stesso']),
	'docs/it/sicurezza.md': new Set(['porte-in-ascolto']),
};
const anchorsOf = (f) => heads[f] ?? new Set();

test('links to published pages become site URLs, per locale', () => {
	const en = rewriteLinks('See [ports](security.md#listening-ports).', 'docs/domains.md', index, anchorsOf);
	assert.deepEqual(en.errors, []);
	assert.equal(en.markdown, 'See [ports](/docs/security/#listening-ports).');

	const it = rewriteLinks('Vedi [porte](sicurezza.md#porte-in-ascolto) e [domini](domini.md).', 'docs/it/sicurezza.md', index, anchorsOf);
	assert.deepEqual(it.errors, []);
	assert.equal(it.markdown, 'Vedi [porte](/it/docs/security/#porte-in-ascolto) e [domini](/it/docs/domains/).');
});

test('an Italian page may link to the English original', () => {
	const r = rewriteLinks('[inglese](../security.md)', 'docs/it/sicurezza.md', index, anchorsOf);
	assert.deepEqual(r.errors, []);
	assert.equal(r.markdown, '[inglese](/docs/security/)');
});

test('a link to an unpublished file is refused', () => {
	const r = rewriteLinks('Line one\n[releasing](releasing.md)', 'docs/domains.md', index, anchorsOf);
	assert.equal(r.errors.length, 1);
	assert.match(r.errors[0], /^docs\/domains\.md:2: links to releasing\.md, which the site doesn't publish/);
	const out = rewriteLinks('[x](../deploy/Caddyfile.esempio)', 'docs/domains.md', index, anchorsOf);
	assert.equal(out.errors.length, 1);
});

test('a broken anchor is refused, on other pages and on the same one', () => {
	assert.equal(rewriteLinks('[x](security.md#nope)', 'docs/domains.md', index, anchorsOf).errors.length, 1);
	assert.equal(rewriteLinks('[x](#nope)', 'docs/domains.md', index, anchorsOf).errors.length, 1);
	const ok = rewriteLinks('[x](#exposing-the-panel-itself)', 'docs/domains.md', index, anchorsOf);
	assert.deepEqual(ok.errors, []);
	assert.equal(ok.markdown, '[x](#exposing-the-panel-itself)');
});

test('external links and code are left alone', () => {
	const md = [
		'[restic](https://restic.net) and `[a](releasing.md)`',
		'```',
		'[b](releasing.md)',
		'```',
	].join('\n');
	const r = rewriteLinks(md, 'docs/domains.md', index, anchorsOf);
	assert.deepEqual(r.errors, []);
	assert.equal(r.markdown, md);
});

test('anchors follow the rendered headings', () => {
	const md = [
		'# Title',
		'## With `make publish`',
		'## Collegare un\'installazione',
		'```bash',
		'## not a heading',
		'```',
		'## Twice',
		'## Twice',
		'### Exposing [the panel](x.md) **itself**',
	].join('\n');
	assert.deepEqual(
		[...anchors(md)],
		['with-make-publish', 'collegare-uninstallazione', 'twice', 'twice-1', 'exposing-the-panel-itself'],
	);
});

test('the H1 becomes the title and the first paragraph the description', () => {
	const md = '# Domains and sites\n\nGroup **domains** with [routes](x.md) and `containers`.\nSecond line.\n\n## Next\n';
	const { title, description, body } = titleAndDescription(md);
	assert.equal(title, 'Domains and sites');
	assert.equal(description, 'Group domains with routes and containers. Second line.');
	assert.equal(body, 'Group **domains** with [routes](x.md) and `containers`.\nSecond line.\n\n## Next\n');
});

test('a long description is cut at a sentence', () => {
	const long = 'A'.repeat(100) + '. ' + 'B'.repeat(100) + '.';
	assert.equal(titleAndDescription(`# T\n\n${long}\n`).description, 'A'.repeat(100) + '.');
});

test('a banner goes into the frontmatter', () => {
	const { page } = toPage('# Domains\n\nText.\n', 'docs/domains.md', index, anchorsOf, '', 'In <a href="x">beta</a>.');
	assert.match(page, /^---\ntitle: "Domains"\ndescription: "Text\."\nbanner:\n  content: "In <a href=\\"x\\">beta<\/a>\."\n---\n/);
});

test('the page carries frontmatter and where it came from', () => {
	const { page, errors } = toPage('# Domains\n\nText "quoted".\n', 'docs/domains.md', index, anchorsOf, 'v1.2.3');
	assert.deepEqual(errors, []);
	assert.equal(
		page,
		'---\ntitle: "Domains"\ndescription: "Text \\"quoted\\"."\n---\n\n' +
			'<!-- Generated from docs/domains.md at v1.2.3: edit it there, not here. -->\n\nText "quoted".\n',
	);
});
