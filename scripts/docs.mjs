// Turns Sirio's docs/ into Starlight pages. Pure functions only: sync-docs.mjs does the I/O.
//
// The source of truth stays in the Sirio repository, English under docs/ and Italian under
// docs/it/ with the traditional Italian filenames. Here every page gets one English slug in both
// locales (/docs/domains/, /it/docs/domains/), because Starlight pairs translations by path.

import GithubSlugger from 'github-slugger';

// The pages the site publishes, in sidebar order within each group. Anything else under docs/
// (releasing.md, CONTRIBUTING.md) is for maintainers and stays out: a public page linking to it
// fails the sync rather than producing a dead link.
export const PAGES = [
	{ slug: 'installation', en: 'installation.md', it: 'installazione.md' },
	{ slug: 'updates', en: 'updates.md', it: 'aggiornamenti.md' },
	{ slug: 'domains', en: 'domains.md', it: 'domini.md' },
	{ slug: 'pipeline', en: 'pipeline.md', it: 'pipeline.md' },
	{ slug: 'backups', en: 'backups.md', it: 'backup.md' },
	{ slug: 'sftp', en: 'sftp.md', it: 'sftp.md' },
	{ slug: 'image-updates', en: 'image-updates.md', it: 'aggiornamento-immagini.md' },
	{ slug: 'packages', en: 'packages.md', it: 'pacchetti.md' },
	{ slug: 'security', en: 'security.md', it: 'sicurezza.md' },
];

export const LOCALES = {
	en: { dir: 'docs', url: '/docs/' },
	it: { dir: 'docs/it', url: '/it/docs/' },
};

// Repository path ("docs/it/domini.md") → { locale, slug }.
export function sourceIndex(pages = PAGES) {
	const index = new Map();
	for (const page of pages) {
		for (const [locale, { dir }] of Object.entries(LOCALES)) {
			index.set(`${dir}/${page[locale]}`, { locale, slug: page.slug });
		}
	}
	return index;
}

// Calls fn(line, index, inFence) for every line, tracking ``` and ~~~ fences.
function eachLine(lines, fn) {
	let fence = null;
	lines.forEach((line, i) => {
		const m = line.match(/^\s*(`{3,}|~{3,})/);
		if (fence) {
			fn(line, i, true);
			if (m && m[1][0] === fence[0] && m[1].length >= fence.length) fence = null;
			return;
		}
		if (m) {
			fence = m[1];
			fn(line, i, true);
			return;
		}
		fn(line, i, false);
	});
}

// Heading text as rendered: inline code and emphasis markers dropped, links reduced to their text.
function plain(text) {
	return text
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/`([^`]*)`/g, '$1')
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.trim();
}

// The anchors a page's headings get, the way Astro assigns them (github-slugger, H2 and below,
// since the H1 becomes the page title).
export function anchors(markdown) {
	const slugger = new GithubSlugger();
	const ids = new Set();
	eachLine(markdown.split('\n'), (line, _i, inFence) => {
		if (inFence) return;
		const m = line.match(/^(#{2,6})\s+(.*?)\s*#*\s*$/);
		if (m) ids.add(slugger.slug(plain(m[2])));
	});
	return ids;
}

// Splits off the H1 and returns it with the first paragraph after it, as plain text.
export function titleAndDescription(markdown) {
	const lines = markdown.split('\n');
	const h1 = lines.findIndex((l) => /^#\s+/.test(l));
	if (h1 === -1) throw new Error('no level-1 heading to use as the title');
	const title = plain(lines[h1].replace(/^#\s+/, ''));
	const body = [...lines.slice(0, h1), ...lines.slice(h1 + 1)].join('\n').replace(/^\n+/, '');

	let description = '';
	const para = [];
	for (const line of lines.slice(h1 + 1)) {
		if (line.trim() === '') {
			if (para.length) break;
			continue;
		}
		if (!para.length && /^(#|```|~~~|\||>|[-*+]\s|\d+\.\s|<)/.test(line.trim())) break;
		para.push(line.trim());
	}
	if (para.length) description = summarize(plain(para.join(' ')).replace(/\*/g, ''));
	return { title, description, body };
}

// At most max characters, cut at the end of a sentence when one fits, else at a word.
function summarize(text, max = 160) {
	text = text.replace(/\s+/g, ' ');
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	const sentence = cut.lastIndexOf('. ');
	if (sentence > max / 2) return cut.slice(0, sentence + 1);
	return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}

function resolve(fromDir, target) {
	const parts = fromDir.split('/');
	for (const seg of target.split('/')) {
		if (seg === '..') parts.pop();
		else if (seg !== '.' && seg !== '') parts.push(seg);
	}
	return parts.join('/');
}

// Rewrites the relative links of one source file into site URLs, outside code. Each link must
// reach a published page and, when it names one, an anchor that page has; every miss is collected
// and reported together, so one run lists all of them.
//   file:     repository path of the page ("docs/it/domini.md")
//   index:    sourceIndex()
//   anchorsOf: repository path → Set of anchors
export function rewriteLinks(markdown, file, index, anchorsOf) {
	const dir = file.slice(0, file.lastIndexOf('/'));
	const errors = [];
	const lines = markdown.split('\n');
	eachLine(lines, (line, i, inFence) => {
		if (inFence) return;
		// Even segments are outside inline code spans.
		lines[i] = line
			.split(/(`+[^`]*`+)/)
			.map((seg, n) =>
				n % 2
					? seg
					: seg.replace(/(\]\()([^)\s]+)(\))/g, (all, open, target, close) => {
							if (/^[a-z][a-z0-9+.-]*:/i.test(target)) return all;
							const [path, anchor] = target.split('#');
							const source = path ? resolve(dir, path) : file;
							const page = index.get(source);
							const where = `${file}:${i + 1}`;
							if (!page) {
								errors.push(`${where}: links to ${target}, which the site doesn't publish`);
								return all;
							}
							if (anchor && !anchorsOf(source).has(anchor)) {
								errors.push(`${where}: links to ${target}, but ${source} has no heading with that anchor`);
								return all;
							}
							if (!path) return all;
							const url = LOCALES[page.locale].url + page.slug + '/' + (anchor ? '#' + anchor : '');
							return open + url + close;
						}),
			)
			.join('');
	});
	return { markdown: lines.join('\n'), errors };
}

// The Starlight page for one source file. banner, when given, is HTML shown above the page.
export function toPage(markdown, file, index, anchorsOf, ref, banner) {
	const { title, description, body } = titleAndDescription(markdown);
	const { markdown: content, errors } = rewriteLinks(body, file, index, anchorsOf);
	const front = ['---', `title: ${JSON.stringify(title)}`];
	if (description) front.push(`description: ${JSON.stringify(description)}`);
	if (banner) front.push('banner:', `  content: ${JSON.stringify(banner)}`);
	front.push('---', '', `<!-- Generated from ${file}${ref ? ` at ${ref}` : ''}: edit it there, not here. -->`, '');
	return { page: front.join('\n') + '\n' + content.replace(/\n*$/, '\n'), errors };
}
