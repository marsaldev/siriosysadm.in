// Copy of the home page, both locales side by side so they stay in step. The hero's headline,
// tagline and buttons live in the frontmatter of index.mdx, where Starlight expects them.

export type Copy = (typeof copy)['en'];

export const copy = {
	en: {
		hero: {
			beta: 'Ask to join the beta',
			docs: 'Read the docs',
			note: 'Private beta: sources and installer are sent to testers by email.',
		},
		chart: {
			server: 'your server',
			backup: 'backup to S3',
			legend: 'Named after Sirius, the brightest star in the night sky.',
			label:
				'Diagram: your server at the centre, linked to the sites it hosts (blog, shop, api), a Postgres database, a nightly backup to S3 and a git push that deploys the blog.',
		},
		lead:
			'Sirio is a single Go binary that runs as a systemd service on the machine it administers, and manages it through the Docker socket. The panel, the API and the database are all inside it: nothing to deploy alongside, no agent, no cluster. It’s made for the server that hosts a handful of sites and applications, the one you’d otherwise look after over SSH.',
		does: 'What it does',
		glance: {
			title: 'Everything, at a glance',
			intro: 'Every section of the panel and what’s in it. Each one opens the features page, where every entry is explained.',
			section: 'Section',
			features: 'What’s included',
			count: 'Features',
			all: 'Every feature, in detail',
		},
		groups: [
			{
				title: 'Sites and deploys',
				items: [
					{
						title: 'Domains with automatic HTTPS',
						text: 'Group domains, containers and pipelines into sites and route a domain and path to a container. Certificates arrive on their own, and every change is validated before it’s applied, so a bad domain never takes live sites down. Any route can ask for a password.',
						link: 'domains',
						more: 'Domains and sites',
					},
					{
						title: 'Deploys from Git',
						text: 'Connect a repository, define the steps (shell, Docker build, Compose, restarts, backups) and run them by hand or from a GitHub, GitLab or Gitea webhook verified by its signature. Running an old deploy again is a rollback.',
						link: 'pipeline',
						more: 'Pipelines',
					},
					{
						title: 'Backups you can restore',
						text: 'Scheduled restic backups of each site: volumes, folders and MySQL, MariaDB or PostgreSQL dumps, encrypted, to a local folder, SFTP, S3, B2 or Google Cloud Storage. Restore from the panel, or with plain restic from any machine.',
						link: 'backups',
						more: 'Backups',
					},
					{
						title: 'SFTP for each site',
						text: 'An optional SFTP server per site, in its own confined container, with accounts limited to that site’s volumes and folders. System paths and other sites’ data are never exposed.',
						link: 'sftp',
						more: 'SFTP',
					},
				],
			},
			{
				title: 'Containers and the host',
				items: [
					{
						title: 'Docker',
						text: 'Live logs and stats, a terminal, start, stop and recreate; images, volumes and networks. Environment and port overrides survive deploys, and Sirio tells you when a newer image is out and updates the container, after a backup if you like.',
						link: 'image-updates',
						more: 'Image updates',
					},
					{
						title: 'System packages',
						text: 'Pending updates with security fixes highlighted. Upgrade everything or a few packages and clean up, with apt, dnf, yum or apk, watching the package manager’s output live.',
						link: 'packages',
						more: 'System packages',
					},
					{
						title: 'Ports and fail2ban',
						text: 'Every listening port, with a warning on the risky ones: SSH accepting passwords, a database on a public address, ports Docker opens past the firewall. Sirio installs fail2ban for SSH and shows who it banned.',
						link: 'security',
						anchor: 'listening-ports',
						more: 'Listening ports',
					},
				],
			},
			{
				title: 'People and upkeep',
				items: [
					{
						title: 'Users and permissions',
						text: 'Permissions per section and per site, down to a single action: run a pipeline but not edit it, restore a backup, never delete a container. An activity log records who did what.',
					},
					{
						title: 'Updates itself',
						text: 'By hand or automatically, up to patch, minor or major releases. Every release is signed, verified twice, and rolled back on its own if the new version doesn’t stay up.',
						link: 'updates',
						more: 'Updates',
					},
				],
			},
		],
		root: {
			title: 'Docker access is root access',
			text: 'Whoever controls the Docker socket controls the host, so whoever gets into Sirio does too. That’s why Sirio itself runs unprivileged, on a system it can’t write to, and every action that needs root takes the same narrow path.',
			more: 'The security model',
			steps: [
				'You press Upgrade all, Restart server or Install fail2ban in the panel.',
				'Sirio writes a request naming only the action and its arguments. It can’t do more: /usr is read-only and sudo is blocked.',
				'A systemd unit picks the request up and starts a helper as root.',
				'The helper checks the request again against its own closed list, runs it, and writes back the result, which the panel streams to you.',
			],
		},
		isnt: {
			title: 'What it isn’t',
			items: [
				['Multi-server.', 'Sirio administers the machine it runs on. For more servers, install one on each.'],
				['Multi-tenant.', 'Sites group domains, containers and pipelines, and permissions can stop at a site, but they share one host.'],
				['For Windows.', 'Linux only, on amd64 or arm64. No plugin marketplace either.'],
			],
		},
		needs: {
			title: 'What it needs',
			items: [
				'A Linux machine with systemd, amd64 or arm64.',
				'Docker Engine. If it’s missing, the first-run wizard installs it.',
				'A domain, when you want HTTPS in front of the panel.',
			],
		},
		end: {
			title: 'Sirio is in private beta.',
			text: 'Testers get the sources and the installer by email, and a direct line for feedback. Say what you’d run it on and you’ll hear back.',
			beta: 'Ask to join the beta',
			docs: 'Read the docs',
		},
	},
	it: {
		hero: {
			beta: 'Chiedi di partecipare alla beta',
			docs: 'Leggi la documentazione',
			note: 'Beta privata: sorgenti e installer vengono inviati via email a chi la prova.',
		},
		chart: {
			server: 'il tuo server',
			backup: 'backup su S3',
			legend: 'Prende il nome da Sirio, la stella più luminosa del cielo notturno.',
			label:
				'Schema: il tuo server al centro, collegato ai siti che ospita (blog, shop, api), a un database Postgres, a un backup notturno su S3 e a un git push che pubblica il blog.',
		},
		lead:
			'Sirio è un singolo binario Go che gira come servizio systemd sulla macchina che amministra, e la gestisce attraverso il socket di Docker. Pannello, API e database stanno tutti lì dentro: niente da installare accanto, nessun agente, nessun cluster. È pensato per il server che ospita una manciata di siti e applicazioni, quello che altrimenti curi via SSH.',
		does: 'Cosa fa',
		glance: {
			title: 'Tutto, a colpo d’occhio',
			intro: 'Ogni sezione del pannello e cosa contiene. Ognuna apre la pagina delle funzionalità, dove ogni voce è spiegata.',
			section: 'Sezione',
			features: 'Cosa comprende',
			count: 'Funzionalità',
			all: 'Tutte le funzionalità, nel dettaglio',
		},
		groups: [
			{
				title: 'Siti e deploy',
				items: [
					{
						title: 'Domini con HTTPS automatico',
						text: 'Raggruppa domini, container e pipeline in siti e instrada un dominio e un percorso verso un container. I certificati arrivano da soli, e ogni modifica viene convalidata prima di essere applicata, così un dominio sbagliato non butta giù i siti attivi. Qualunque route può chiedere una password.',
						link: 'domains',
						more: 'Domini e siti',
					},
					{
						title: 'Deploy da Git',
						text: 'Collega un repository, definisci i passi (shell, build Docker, Compose, riavvii, backup) e lanciali a mano o da un webhook di GitHub, GitLab o Gitea verificato dalla sua firma. Rilanciare un vecchio deploy è un rollback.',
						link: 'pipeline',
						more: 'Pipeline',
					},
					{
						title: 'Backup che si ripristinano',
						text: 'Backup restic pianificati di ogni sito: volumi, cartelle e dump di MySQL, MariaDB o PostgreSQL, cifrati, verso una cartella locale, SFTP, S3, B2 o Google Cloud Storage. Ripristina dal pannello, o con restic da qualunque macchina.',
						link: 'backups',
						more: 'Backup',
					},
					{
						title: 'SFTP per ogni sito',
						text: 'Un server SFTP facoltativo per sito, in un suo container confinato, con account limitati ai volumi e alle cartelle di quel sito. Percorsi di sistema e dati di altri siti non vengono mai esposti.',
						link: 'sftp',
						more: 'SFTP',
					},
				],
			},
			{
				title: 'Container e host',
				items: [
					{
						title: 'Docker',
						text: 'Log e statistiche dal vivo, un terminale, avvio, arresto e ricreazione; immagini, volumi e reti. Variabili e porte sovrascritte sopravvivono ai deploy, e Sirio ti avvisa quando esce un’immagine più recente e aggiorna il container, se vuoi dopo un backup.',
						link: 'image-updates',
						more: 'Aggiornamento delle immagini',
					},
					{
						title: 'Pacchetti di sistema',
						text: 'Aggiornamenti disponibili con quelli di sicurezza in evidenza. Aggiorna tutto o solo alcuni pacchetti e fai pulizia, con apt, dnf, yum o apk, seguendo dal vivo l’output del gestore di pacchetti.',
						link: 'packages',
						more: 'Pacchetti di sistema',
					},
					{
						title: 'Porte e fail2ban',
						text: 'Ogni porta in ascolto, con un avviso su quelle a rischio: SSH che accetta password, un database su un indirizzo pubblico, porte che Docker apre scavalcando il firewall. Sirio installa fail2ban per SSH e mostra chi ha bannato.',
						link: 'security',
						anchor: 'porte-in-ascolto',
						more: 'Porte in ascolto',
					},
				],
			},
			{
				title: 'Persone e manutenzione',
				items: [
					{
						title: 'Utenti e permessi',
						text: 'Permessi per sezione e per sito, fino alla singola azione: lanciare una pipeline ma non modificarla, ripristinare un backup, non eliminare mai un container. Un registro delle attività tiene traccia di chi ha fatto cosa.',
					},
					{
						title: 'Si aggiorna da solo',
						text: 'A mano o in automatico, fino a release patch, minor o major. Ogni release è firmata, verificata due volte, e ripristinata da sola se la nuova versione non resta su.',
						link: 'updates',
						more: 'Aggiornamenti',
					},
				],
			},
		],
		root: {
			title: 'L’accesso a Docker è accesso root',
			text: 'Chi controlla il socket di Docker controlla l’host, quindi lo controlla anche chi entra in Sirio. Per questo Sirio gira senza privilegi, su un sistema in cui non può scrivere, e ogni azione che richiede root passa sempre per la stessa strada stretta.',
			more: 'Il modello di sicurezza',
			steps: [
				'Premi Aggiorna tutti, Riavvia server o Installa fail2ban nel pannello.',
				'Sirio scrive una richiesta con solo l’azione e i suoi argomenti. Di più non può: /usr è in sola lettura e sudo è bloccato.',
				'Una unit systemd raccoglie la richiesta e avvia un helper come root.',
				'L’helper ricontrolla la richiesta contro il proprio elenco chiuso, la esegue e scrive il risultato, che il pannello ti mostra dal vivo.',
			],
		},
		isnt: {
			title: 'Cosa non è',
			items: [
				['Multi-server.', 'Sirio amministra la macchina su cui gira. Per più server, se ne installa uno su ciascuno.'],
				['Multi-tenant.', 'I siti raggruppano domini, container e pipeline, e i permessi possono fermarsi a un sito, ma condividono lo stesso host.'],
				['Per Windows.', 'Solo Linux, su amd64 o arm64. E niente marketplace di plugin.'],
			],
		},
		needs: {
			title: 'Cosa serve',
			items: [
				'Una macchina Linux con systemd, amd64 o arm64.',
				'Docker Engine. Se manca, lo installa il wizard del primo avvio.',
				'Un dominio, quando vuoi HTTPS davanti al pannello.',
			],
		},
		end: {
			title: 'Sirio è in beta privata.',
			text: 'Chi la prova riceve via email sorgenti e installer, e un canale diretto per i feedback. Racconta su cosa lo useresti e ti rispondo.',
			beta: 'Chiedi di partecipare alla beta',
			docs: 'Leggi la documentazione',
		},
	},
};

export function localeOf(lang: string | undefined): keyof typeof copy {
	return lang?.startsWith('it') ? 'it' : 'en';
}

export function docsUrl(locale: keyof typeof copy, slug: string, anchor?: string) {
	return `${locale === 'it' ? '/it' : ''}/docs/${slug}/${anchor ? `#${anchor}` : ''}`;
}
