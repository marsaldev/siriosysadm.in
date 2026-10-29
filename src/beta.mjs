// Sirio is distributed privately for now: sources and installer go to beta testers by email.
// Everything that invites people to ask for them (home page, banner on the docs) builds its link
// from here.

export const BETA_EMAIL = 'hi@marcosalvatore.dev';

const messages = {
	en: {
		subject: 'Sirio SysAdmin beta',
		body: "Hi,\n\nI'd like to join the Sirio SysAdmin beta.\n\nThe server I'd run it on (distribution, amd64 or arm64):\nWhat I'd use it for:\n",
		banner: 'Sirio is in private beta: sources and installer are sent to testers by email.',
		ask: 'Ask to join',
	},
	it: {
		subject: 'Beta di Sirio SysAdmin',
		body: 'Ciao,\n\nvorrei partecipare alla beta di Sirio SysAdmin.\n\nIl server su cui lo userei (distribuzione, amd64 o arm64):\nPer cosa lo userei:\n',
		banner: 'Sirio è in beta privata: sorgenti e installer vengono inviati via email a chi la prova.',
		ask: 'Chiedi di partecipare',
	},
};

export function betaMailto(locale) {
	const m = messages[locale] ?? messages.en;
	return `mailto:${BETA_EMAIL}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`;
}

// The banner Starlight shows above every documentation page, as HTML.
export function betaBanner(locale) {
	const m = messages[locale] ?? messages.en;
	return `${m.banner} <a href="${betaMailto(locale).replaceAll('&', '&amp;')}">${m.ask}</a>.`;
}
