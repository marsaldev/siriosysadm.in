// The changelog: every Sirio release, newest first, written for the people who run it rather than
// copied from the commits. Both locales sit side by side in each entry so they stay in step. Add
// the new release at the top whenever Sirio publishes one. Links point to the docs by slug, with
// the anchor in each locale (headings are translated, so anchors are too).

type Locale = 'en' | 'it';
type Text = Record<Locale, string>;

export type Kind = 'new' | 'improved' | 'fixed' | 'maintenance';

export type Change = {
	kind: Kind;
	text: Text;
	link?: string;
	anchor?: Text;
	more?: Text;
};

export type Release = {
	version: string;
	/** Release day, YYYY-MM-DD. */
	date: string;
	/** What the release is about, for the ones that have a headline. */
	title?: Text;
	changes: Change[];
};

export const changelog: Record<
	Locale,
	{
		lead: string;
		latest: string;
		kinds: Record<Kind, string>;
		months: string;
		releases: string;
		docs: string;
	}
> = {
	en: {
		lead: 'Every Sirio release, newest first: what’s new, what got better and what was fixed. The site always documents the latest one.',
		latest: 'Latest',
		kinds: { new: 'New', improved: 'Improved', fixed: 'Fixed', maintenance: 'Maintenance' },
		months: 'Months',
		releases: 'releases',
		docs: 'Read the docs',
	},
	it: {
		lead: 'Ogni release di Sirio, dalla più recente: cosa c’è di nuovo, cosa è migliorato e cosa è stato corretto. Il sito documenta sempre l’ultima.',
		latest: 'Ultima',
		kinds: { new: 'Novità', improved: 'Migliorato', fixed: 'Corretto', maintenance: 'Manutenzione' },
		months: 'Mesi',
		releases: 'release',
		docs: 'Leggi la documentazione',
	},
};

const maintainerOnly: Change = {
	kind: 'maintenance',
	text: {
		en: 'Changes to how releases are built and published. Nothing changes in the panel.',
		it: 'Modifiche al modo in cui le release vengono compilate e pubblicate. Nel pannello non cambia nulla.',
	},
};

export const releases: Release[] = [
	{
		version: '0.20.1',
		date: '2026-11-05',
		changes: [
			{
				kind: 'fixed',
				text: {
					en: 'On a phone, the top bar no longer pushes the page sideways: the page title shortens, and the Docker badge keeps only its dot.',
					it: 'Sul telefono la barra in alto non fa più scorrere la pagina di lato: il titolo si accorcia e il badge di Docker tiene solo il pallino.',
				},
			},
		],
	},
	{
		version: '0.20.0',
		date: '2026-11-05',
		title: {
			en: 'Settings in tabs, the activity log on its own page',
			it: 'Impostazioni a schede, il registro delle attività in una pagina sua',
		},
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'Settings is split into tabs, System, Updates and Notifications, each shown only to who may see it.',
					it: 'Le impostazioni sono divise in schede, Sistema, Aggiornamenti e Notifiche, ognuna mostrata solo a chi può vederla.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'The activity log has its own page, filtered by text, user, action and date range, with the filters kept in the address and older entries loaded on request.',
					it: 'Il registro delle attività ha una pagina tutta sua, filtrabile per testo, utente, azione e intervallo di date, con i filtri conservati nell’indirizzo e le voci più vecchie caricate a richiesta.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'The notification settings are split into Email, Other channels, Options and Deliveries, and each section saves only its own fields.',
					it: 'Le impostazioni delle notifiche sono divise in Email, Altri canali, Opzioni e Consegne, e ogni sezione salva solo i propri campi.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'The test email can go to any mailbox, not only your own.',
					it: 'L’email di prova può andare a qualunque casella, non solo alla tua.',
				},
				link: 'notifications',
				anchor: { en: 'testing', it: 'prova' },
				more: { en: 'Testing', it: 'Prova' },
			},
		],
	},
	{
		version: '0.19.0',
		date: '2026-11-05',
		title: { en: 'Notifications', it: 'Notifiche' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Email notifications about failed backups, full disks and Sirio updates, through an SMTP relay or delivered directly and signed with DKIM, with a diagnosis of port 25, reverse DNS, SPF, DKIM and DMARC.',
					it: 'Notifiche email su backup falliti, dischi pieni e aggiornamenti di Sirio, tramite un relay SMTP o con consegna diretta firmata DKIM, con una diagnosi di porta 25, DNS inverso, SPF, DKIM e DMARC.',
				},
				link: 'notifications',
				more: { en: 'Notifications', it: 'Notifiche' },
			},
			{
				kind: 'new',
				text: {
					en: 'Notifications for failed deploys, backups that stop running and containers that crash, run out of memory or turn unhealthy, and again when each recovers. One per change, never one per check.',
					it: 'Notifiche per deploy falliti, backup che smettono di partire e container che vanno in crash, finiscono la memoria o risultano unhealthy, e di nuovo quando tornano a posto. Una per cambiamento, mai una per controllo.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'A daily summary of package updates, containers with a newer image and new Sirio releases, sent only when something in it is new.',
					it: 'Un riepilogo giornaliero di aggiornamenti dei pacchetti, container con un’immagine più recente e nuove release di Sirio, inviato solo quando contiene qualcosa di nuovo.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'Notifications follow the panel’s permissions. Each user picks in Account which categories reach them by email, and a bell in the top bar lists the latest.',
					it: 'Le notifiche seguono i permessi del pannello. Ogni utente sceglie in Account quali categorie ricevere via email, e una campanella nella barra in alto elenca le ultime.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'Webhook (Slack, Discord, Mattermost, Google Chat) and ntfy channels, per category, working with email on or off.',
					it: 'Canali webhook (Slack, Discord, Mattermost, Google Chat) e ntfy, per categoria, che funzionano con le email attive o no.',
				},
			},
		],
	},
	{
		version: '0.18.2',
		date: '2026-11-05',
		changes: [
			{
				kind: 'fixed',
				text: {
					en: 'The panel follows a Sirio update through the restart, without a 502 error or an empty log, and shows the whole log again on the new version.',
					it: 'Il pannello segue un aggiornamento di Sirio attraverso il riavvio, senza errori 502 né log vuoti, e mostra di nuovo il log completo sulla nuova versione.',
				},
				link: 'updates',
				more: { en: 'Updates', it: 'Aggiornamenti' },
			},
		],
	},
	{
		version: '0.18.1',
		date: '2026-11-05',
		changes: [
			{
				kind: 'fixed',
				text: {
					en: 'Updating the image of the proxy the panel is reached through no longer ends in “network error”: the panel waits to answer again and shows how the update really ended.',
					it: 'Aggiornare l’immagine del proxy da cui passa il pannello non finisce più con “errore di rete”: il pannello aspetta di rispondere di nuovo e mostra com’è andato davvero l’aggiornamento.',
				},
				link: 'image-updates',
				more: { en: 'Image updates', it: 'Aggiornamento delle immagini' },
			},
			{
				kind: 'fixed',
				text: {
					en: 'A container up for about a minute shows one minute of uptime instead of “1 a”.',
					it: 'Un container acceso da circa un minuto mostra un minuto di attività invece di “1 a”.',
				},
			},
		],
	},
	{
		version: '0.18.0',
		date: '2026-10-30',
		title: { en: 'SFTP for each site', it: 'SFTP per ogni sito' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'An optional SFTP server per site, in its own confined container, with accounts limited to that site’s volumes and folders, managed from the site’s page.',
					it: 'Un server SFTP facoltativo per sito, in un suo container confinato, con account limitati ai volumi e alle cartelle di quel sito, gestito dalla pagina del sito.',
				},
				link: 'sftp',
				more: { en: 'SFTP', it: 'SFTP' },
			},
			{
				kind: 'improved',
				text: {
					en: 'Sirio asks before recreating a container would lose files changed inside it.',
					it: 'Sirio chiede conferma prima che ricreare un container faccia perdere i file modificati al suo interno.',
				},
			},
		],
	},
	{
		version: '0.17.0',
		date: '2026-10-22',
		title: { en: 'Image updates', it: 'Aggiornamento delle immagini' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Sirio checks containers for newer images and updates them from the panel, after a backup if you like.',
					it: 'Sirio controlla se i container hanno un’immagine più recente e li aggiorna dal pannello, se vuoi dopo un backup.',
				},
				link: 'image-updates',
				more: { en: 'Image updates', it: 'Aggiornamento delle immagini' },
			},
		],
	},
	{
		version: '0.16.2',
		date: '2026-10-22',
		changes: [
			{
				kind: 'fixed',
				text: {
					en: 'The backup plan editor no longer crashes on a custom schedule.',
					it: 'L’editor dei piani di backup non va più in crash con una pianificazione personalizzata.',
				},
			},
		],
	},
	{
		version: '0.16.1',
		date: '2026-10-22',
		changes: [
			{
				kind: 'new',
				text: { en: 'Backup plans can run every hour.', it: 'I piani di backup possono girare ogni ora.' },
				link: 'backups',
				more: { en: 'Backups', it: 'Backup' },
			},
		],
	},
	{
		version: '0.16.0',
		date: '2026-10-21',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Administrators can restart or shut down the server from the user menu. Sirio warns about deploys and backups in progress and waits for the machine to come back.',
					it: 'Gli amministratori possono riavviare o spegnere il server dal menu utente. Sirio avvisa dei deploy e dei backup in corso e aspetta che la macchina torni su.',
				},
			},
		],
	},
	{ version: '0.15.2', date: '2026-10-21', changes: [maintainerOnly] },
	{ version: '0.15.1', date: '2026-10-21', changes: [maintainerOnly] },
	{
		version: '0.15.0',
		date: '2026-10-20',
		title: { en: 'Updates from a private update server', it: 'Aggiornamenti da un server privato' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Sirio updates itself from a private update server, with one revocable key per installation. A release is trusted for its signature, not for the server it came from.',
					it: 'Sirio si aggiorna da un server di aggiornamento privato, con una chiave revocabile per ogni installazione. Una release è affidabile per la sua firma, non per il server da cui arriva.',
				},
				link: 'updates',
				more: { en: 'Updates', it: 'Aggiornamenti' },
			},
			{
				kind: 'fixed',
				text: {
					en: 'The root helpers read and write their requests, logs and results as Sirio’s unprivileged user, so a link planted in their folders can’t send them elsewhere.',
					it: 'Gli helper root leggono e scrivono richieste, log e risultati come l’utente senza privilegi di Sirio, così un link piazzato nelle loro cartelle non può dirottarli altrove.',
				},
			},
		],
	},
	{
		version: '0.14.0',
		date: '2026-10-19',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Routes can ask for a username and password, from access lists shared across routes.',
					it: 'Le rotte possono chiedere nome utente e password, da access list condivise tra le rotte.',
				},
				link: 'domains',
				anchor: { en: 'password-protected-routes', it: 'rotte-protette-da-password' },
				more: { en: 'Password-protected routes', it: 'Rotte protette da password' },
			},
		],
	},
	{
		version: '0.13.2',
		date: '2026-10-19',
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'A spinner while the panel is still loading.',
					it: 'Un indicatore di caricamento mentre il pannello si apre.',
				},
			},
		],
	},
	{
		version: '0.13.1',
		date: '2026-10-19',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'The plans table shows each backup plan’s size.',
					it: 'La tabella dei piani mostra la dimensione di ogni piano di backup.',
				},
			},
		],
	},
	{
		version: '0.13.0',
		date: '2026-10-15',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'A backup plan can leave out single volumes and host directories.',
					it: 'Un piano di backup può escludere singoli volumi e cartelle dell’host.',
				},
				link: 'backups',
				more: { en: 'Backups', it: 'Backup' },
			},
		],
	},
	{
		version: '0.12.0',
		date: '2026-10-15',
		title: { en: 'Backups', it: 'Backup' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Scheduled restic backups of each site, run as a container: volumes, folders and database dumps, encrypted, to a local folder, SFTP, S3, B2 or Google Cloud Storage.',
					it: 'Backup restic pianificati di ogni sito, eseguiti in un container: volumi, cartelle e dump dei database, cifrati, verso una cartella locale, SFTP, S3, B2 o Google Cloud Storage.',
				},
				link: 'backups',
				more: { en: 'Backups', it: 'Backup' },
			},
			{
				kind: 'new',
				text: {
					en: 'Browse, download and restore backups from the panel, and back up from a pipeline step.',
					it: 'Sfoglia, scarica e ripristina i backup dal pannello, e fai un backup da un passo di una pipeline.',
				},
			},
			{
				kind: 'new',
				text: { en: 'Export and import pipelines as JSON.', it: 'Esporta e importa le pipeline in JSON.' },
				link: 'pipeline',
				more: { en: 'Pipelines', it: 'Pipeline' },
			},
		],
	},
	{
		version: '0.11.2',
		date: '2026-10-14',
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'The Proxy page names the containers holding the proxy’s ports, and warns when the proxy is missing.',
					it: 'La pagina Proxy indica i container che occupano le porte del proxy, e avvisa quando il proxy manca.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'When recreating a container fails, Sirio says which file Compose couldn’t read.',
					it: 'Quando la ricreazione di un container fallisce, Sirio dice quale file Compose non è riuscito a leggere.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'The installer asks for the public IP when it only finds a private one.',
					it: 'L’installer chiede l’IP pubblico quando trova solo un indirizzo privato.',
				},
			},
		],
	},
	{ version: '0.11.1', date: '2026-10-12', changes: [maintainerOnly] },
	{
		version: '0.11.0',
		date: '2026-10-12',
		title: { en: 'The fail2ban page', it: 'La pagina di fail2ban' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'See fail2ban’s running jails and bans, ban and unban addresses, set the sshd limits and a whitelist, turn on recidive and read the history of bans.',
					it: 'Guarda le jail attive e i ban di fail2ban, banna e sbanna indirizzi, imposta i limiti di sshd e una whitelist, attiva recidive e consulta lo storico dei ban.',
				},
				link: 'security',
				anchor: { en: 'fail2ban', it: 'fail2ban' },
				more: { en: 'fail2ban', it: 'fail2ban' },
			},
		],
	},
	{
		version: '0.10.0',
		date: '2026-10-11',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'The Compose containers a pipeline starts are assigned to its site.',
					it: 'I container Compose avviati da una pipeline vengono assegnati al suo sito.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'Compose steps preview the full command and accept extra arguments.',
					it: 'I passi Compose mostrano in anteprima il comando completo e accettano argomenti aggiuntivi.',
				},
				link: 'pipeline',
				more: { en: 'Pipelines', it: 'Pipeline' },
			},
		],
	},
	{
		version: '0.9.0',
		date: '2026-10-08',
		title: { en: 'Safer ports', it: 'Porte più sicure' },
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'New containers publish their ports on 127.0.0.1 by default, and the form warns when a port would end up public, past the firewall.',
					it: 'I nuovi container pubblicano le porte su 127.0.0.1 di default, e il modulo avvisa quando una porta finirebbe pubblica, scavalcando il firewall.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'More SSH checks: empty passwords accepted, and passwords still asked through PAM after turning PasswordAuthentication off.',
					it: 'Più controlli su SSH: password vuote accettate, e password ancora chieste tramite PAM dopo aver disattivato PasswordAuthentication.',
				},
				link: 'security',
				anchor: { en: 'listening-ports', it: 'porte-in-ascolto' },
				more: { en: 'Listening ports', it: 'Porte in ascolto' },
			},
			{
				kind: 'new',
				text: {
					en: 'Set fail2ban up for SSH from the Ports page.',
					it: 'Configura fail2ban per SSH dalla pagina Porte.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'Logs open at the end, and Clear really deletes a container’s logs.',
					it: 'I log si aprono dalla fine, e Pulisci elimina davvero i log di un container.',
				},
			},
		],
	},
	{
		version: '0.8.0',
		date: '2026-10-03',
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'The log view stays responsive on long streams.',
					it: 'La vista dei log resta reattiva anche con flussi lunghi.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'Progress while creating a container.',
					it: 'L’avanzamento mentre si crea un container.',
				},
			},
		],
	},
	{
		version: '0.7.0',
		date: '2026-10-01',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Port binding overrides for containers, which survive deploys.',
					it: 'Porte sovrascritte per i container, che sopravvivono ai deploy.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'Repository checkouts are named after the repository instead of its ID.',
					it: 'Le copie dei repository prendono il nome del repository invece del suo ID.',
				},
			},
		],
	},
	{
		version: '0.6.0',
		date: '2026-10-01',
		title: { en: 'The Ports page', it: 'La pagina Porte' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'A Ports page that lists every listening port and flags the risky ones.',
					it: 'Una pagina Porte che elenca ogni porta in ascolto e segnala quelle a rischio.',
				},
				link: 'security',
				anchor: { en: 'listening-ports', it: 'porte-in-ascolto' },
				more: { en: 'Listening ports', it: 'Porte in ascolto' },
			},
			{
				kind: 'new',
				text: {
					en: 'The panel can be served over HTTPS on its own port, through the managed proxy.',
					it: 'Il pannello può essere servito in HTTPS su una porta sua, tramite il proxy gestito.',
				},
				link: 'installation',
				anchor: { en: 'sirio-managed-proxy', it: 'proxy-gestito-da-sirio' },
				more: { en: 'Sirio-managed proxy', it: 'Proxy gestito da Sirio' },
			},
		],
	},
	{
		version: '0.5.1',
		date: '2026-10-01',
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'The release’s install.sh can install a local binary, offline.',
					it: 'L’install.sh della release può installare un binario locale, senza rete.',
				},
			},
		],
	},
	{
		version: '0.5.0',
		date: '2026-10-01',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'install.sh is published with every release, for a one-command install.',
					it: 'install.sh viene pubblicato con ogni release, per installare con un solo comando.',
				},
				link: 'installation',
				more: { en: 'Installation', it: 'Installazione' },
			},
			{
				kind: 'new',
				text: {
					en: '-reset-password sets any account’s password from the command line.',
					it: '-reset-password imposta la password di qualunque account dalla riga di comando.',
				},
				link: 'installation',
				anchor: { en: 'i-lost-the-password', it: 'ho-perso-la-password' },
				more: { en: 'I lost the password', it: 'Ho perso la password' },
			},
		],
	},
	{
		version: '0.4.0',
		date: '2026-09-23',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Environment overrides for containers, which survive deploys.',
					it: 'Variabili d’ambiente sovrascritte per i container, che sopravvivono ai deploy.',
				},
			},
		],
	},
	{
		version: '0.3.4',
		date: '2026-09-23',
		changes: [
			{
				kind: 'fixed',
				text: {
					en: 'Pipelines check out the commit a branch or tag resolves to, instead of the bare name.',
					it: 'Le pipeline fanno il checkout del commit a cui punta un branch o un tag, invece del solo nome.',
				},
			},
		],
	},
	{
		version: '0.3.3',
		date: '2026-09-18',
		changes: [
			{
				kind: 'fixed',
				text: { en: 'The Proxy page no longer shows up blank.', it: 'La pagina Proxy non appare più vuota.' },
			},
		],
	},
	{
		version: '0.3.2',
		date: '2026-09-18',
		changes: [
			{
				kind: 'fixed',
				text: {
					en: 'Sirio reads the results of helpers installed by earlier versions.',
					it: 'Sirio legge i risultati degli helper installati dalle versioni precedenti.',
				},
			},
		],
	},
	{
		version: '0.3.1',
		date: '2026-09-18',
		changes: [
			{
				kind: 'fixed',
				text: {
					en: 'The Packages page no longer goes blank on Upgrade all.',
					it: 'La pagina Pacchetti non diventa più vuota con Aggiorna tutti.',
				},
			},
		],
	},
	{
		version: '0.3.0',
		date: '2026-09-17',
		title: { en: 'Granular permissions', it: 'Permessi granulari' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Permissions per site, down to a single action: run a pipeline but not edit it, restore a backup, never delete a container.',
					it: 'Permessi per sito, fino alla singola azione: lanciare una pipeline ma non modificarla, ripristinare un backup, non eliminare mai un container.',
				},
				link: 'security',
				anchor: { en: 'authorization', it: 'autorizzazione' },
				more: { en: 'Authorization', it: 'Autorizzazione' },
			},
		],
	},
	{
		version: '0.2.2',
		date: '2026-09-17',
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'Language and password move to an Account page of their own, apart from Settings.',
					it: 'Lingua e password passano a una pagina Account tutta loro, separata dalle impostazioni.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'Settings shows the release running.',
					it: 'Le impostazioni mostrano la release in esecuzione.',
				},
			},
		],
	},
	{
		version: '0.1.0',
		date: '2026-09-16',
		title: { en: 'The first release', it: 'La prima release' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Docker containers, images, volumes and networks, with live logs, stats and a terminal; sites with domains and automatic HTTPS through a managed reverse proxy; deploys from Git with webhooks; system packages with apt, dnf, yum or apk; users and permissions; a first-run wizard that installs Docker; the panel in English and Italian.',
					it: 'Container, immagini, volumi e reti Docker, con log e statistiche dal vivo e un terminale; siti con domini e HTTPS automatico tramite un reverse proxy gestito; deploy da Git con webhook; pacchetti di sistema con apt, dnf, yum o apk; utenti e permessi; un wizard del primo avvio che installa Docker; il pannello in italiano e inglese.',
				},
				link: 'installation',
				more: { en: 'Installation', it: 'Installazione' },
			},
		],
	},
];

export function changelogUrl(locale: Locale) {
	return `${locale === 'it' ? '/it' : ''}/changelog/`;
}
