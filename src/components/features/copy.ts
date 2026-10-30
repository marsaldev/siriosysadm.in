// Copy of the features page, both locales side by side so they stay in step. The page title and
// description live in the frontmatter of features.mdx. Category ids are the same in both locales,
// so an anchor like /features/#backups works in either.

type Item = { title: string; text: string; link?: string; anchor?: string; more?: string };
type Category = {
	id: string;
	title: string;
	summary: string;
	link?: string;
	anchor?: string;
	more?: string;
	items: Item[];
};

export const features: Record<
	'en' | 'it',
	{ lead: string; index: string; count: string; categories: Category[] }
> = {
	en: {
		lead: 'Everything Sirio does, in one place. Each section links to the documentation that explains it in depth.',
		index: 'Sections',
		count: 'features',
		categories: [
			{
				id: 'docker',
				title: 'Docker',
				summary: 'The containers on the host and everything around them, without opening a terminal.',
				link: 'image-updates',
				more: 'Image updates',
				items: [
					{
						title: 'The host at a glance',
						text: 'CPU, memory, disk and uptime of the machine, every container drawn as a star and linked to the others of its Compose project, and the latest deploys.',
					},
					{
						title: 'Containers',
						text: 'Filter by site, start, stop, restart, pause, resume and remove. Each one shows its image, state, health, addresses and published ports.',
					},
					{
						title: 'Create a container',
						text: 'From any image, with ports, environment and volumes. Ports are bound to localhost unless you say otherwise, with a warning when one goes public.',
					},
					{
						title: 'Live logs and stats',
						text: 'Logs stream as they’re written, CPU, memory, network and disk refresh live, and the full configuration and mounts are a tab away.',
					},
					{
						title: 'A terminal in the browser',
						text: 'A shell inside any running container, straight from the panel.',
					},
					{
						title: 'Environment and port overrides',
						text: 'Add or change environment variables and host ports on a container. They’re reapplied after every deploy, and on a Compose service removing one brings back the compose value.',
					},
					{
						title: 'Clear the logs',
						text: 'Empty a container’s log files: Sirio stops it, clears them and starts it again.',
					},
					{
						title: 'No silent losses',
						text: 'Before recreating a container, Sirio looks for files changed inside it and lists them, since recreating would throw them away.',
					},
					{
						title: 'Images, volumes and networks',
						text: 'Pull images with live progress, remove and prune them and see the space they take; create and remove volumes and networks, with the ones in use marked.',
					},
					{
						title: 'Image updates',
						text: 'Every six hours Sirio asks the registry whether a container’s tag now points to a newer image, and updates it on request, after a backup of its site if you like. Containers a pipeline deploys are left to that pipeline.',
					},
					{
						title: 'Docker installed for you',
						text: 'If Docker is missing, the first-run wizard installs it from Docker’s official repository, or from the distribution’s own package.',
					},
				],
			},
			{
				id: 'sites',
				title: 'Sites, domains and HTTPS',
				summary: 'A site groups domains, containers, pipelines, backups and SFTP. A managed Caddy proxy puts it online.',
				link: 'domains',
				more: 'Domains and sites',
				items: [
					{
						title: 'Sites',
						text: 'One place per project: its domains and routes, its containers, the pipelines that deploy it, its backup plans and its SFTP server.',
					},
					{
						title: 'Automatic HTTPS',
						text: 'Certificates are obtained and renewed on their own. A domain can also use an internal certificate, or plain HTTP.',
					},
					{
						title: 'Routes',
						text: 'Send a domain, or one of its paths, to a container or to any host and port. A domain can have many routes, a container many domains.',
					},
					{
						title: 'Checked before it goes live',
						text: 'Caddy validates every change before it’s applied, and a refused one is rolled back, so a bad domain never takes the other sites down. The proxy is reconciled after each deploy and every minute.',
					},
					{
						title: 'DNS check',
						text: 'See whether a domain already points to the server before waiting for its certificate.',
					},
					{
						title: 'The panel on its own domain',
						text: 'Serve Sirio itself through the proxy, with HTTPS on its own domain, on 443 or on another port.',
						link: 'domains',
						anchor: 'exposing-the-panel-itself',
						more: 'Exposing the panel',
					},
					{
						title: 'The generated config, in sight',
						text: 'The Caddyfile Sirio wrote is shown as it is, together with the last error when a change was refused.',
					},
					{
						title: 'Container ownership',
						text: 'A container belongs to one site or is shared between sites, which decides who may manage it and what each site backs up.',
					},
				],
			},
			{
				id: 'access',
				title: 'Password-protected routes',
				summary: 'HTTP authentication in front of any route, without touching the application behind it.',
				link: 'domains',
				anchor: 'password-protected-routes',
				more: 'Password-protected routes',
				items: [
					{
						title: 'Access lists',
						text: 'Lists of visitors per site, each with their own password, stored only as bcrypt hashes. One list can protect any number of routes.',
					},
					{
						title: 'Basic auth at the proxy',
						text: 'The browser asks for credentials before a request reaches the container, and the credentials are stripped before it does.',
					},
					{
						title: 'Fails closed',
						text: 'A list left empty or gone answers 403: a protected route never turns public by accident. A list in use can’t be deleted.',
					},
					{
						title: 'Import from .htpasswd',
						text: 'Paste or pick an Apache .htpasswd file to bring existing users over, or have Sirio generate a strong password.',
					},
				],
			},
			{
				id: 'pipelines',
				title: 'Repositories and pipelines',
				summary: 'From git push to running containers, every step logged.',
				link: 'pipeline',
				more: 'Pipelines',
				items: [
					{
						title: 'Repositories',
						text: 'Public, with an HTTPS token, or with an SSH deploy key. Tokens and keys are encrypted and never shown again.',
					},
					{
						title: 'Build and deploy steps',
						text: 'A build phase and a deploy phase made of shell commands, Docker builds, Compose commands, container restarts and backups.',
					},
					{
						title: 'Detected from Compose',
						text: 'Sirio finds the compose file in the repository and proposes the deploy step for you to review.',
					},
					{
						title: 'Webhooks',
						text: 'Deploy on a push to a branch or on a new tag, from GitHub, GitLab or Gitea. Each request is verified by its HMAC signature; the secret is shown once and can be rotated.',
					},
					{
						title: 'Manual runs and rollbacks',
						text: 'Start a pipeline by hand on any branch, tag or commit, interrupt a run, and run an older one again to roll back.',
					},
					{
						title: 'Live logs and history',
						text: 'Every run streams its output live and is kept with its commit, trigger and duration.',
					},
					{
						title: 'Safe with untrusted input',
						text: 'Branch, commit and author from a webhook reach the steps only as environment variables, never pasted into a command.',
					},
					{
						title: 'After the deploy',
						text: 'Overrides are reapplied, the proxy is updated, and the containers Compose started are assigned to the pipeline’s site.',
					},
					{
						title: 'Export and import',
						text: 'Move pipelines between servers as a JSON file, without IDs or secrets; the import matches repositories and sites for you.',
					},
					{
						title: 'One thing at a time',
						text: 'Runs are queued and executed one by one, and a deploy waits for a backup of the same site to finish, and the other way round.',
					},
				],
			},
			{
				id: 'backups',
				title: 'Backups',
				summary: 'Encrypted, scheduled restic backups of every site, and restores from the panel.',
				link: 'backups',
				more: 'Backups',
				items: [
					{
						title: 'Destinations',
						text: 'A local folder, SFTP (with the host key pinned once you confirm it), Amazon S3 and S3-compatible storage, Backblaze B2 and Google Cloud Storage.',
					},
					{
						title: 'Plans per site',
						text: 'A schedule, how many recent, daily, weekly and monthly snapshots to keep, and which volumes and folders to leave out.',
					},
					{
						title: 'Consistent databases',
						text: 'MySQL, MariaDB, Percona and PostgreSQL are recognised by their image and dumped with their own tools while they run.',
					},
					{
						title: 'A choice per container',
						text: 'Dump it, stop it while copying, copy it while it runs, or leave it out.',
					},
					{
						title: 'Coverage at a glance',
						text: 'Which sites have no backup, and which ones failed or are overdue.',
					},
					{
						title: 'Browse and download',
						text: 'Look inside any snapshot and download a file, or a folder as a .zip.',
					},
					{
						title: 'Restore',
						text: 'A volume over the original or into a new one, a folder in place, or a database dump straight into its container.',
					},
					{
						title: 'Recovery kit',
						text: 'The repository password, kept behind your own, so the data can be restored with plain restic from any machine.',
					},
					{
						title: 'Part of the workflow',
						text: 'Run a backup as a pipeline step, or before an image update: if the backup fails, nothing is touched.',
					},
					{
						title: 'Nothing skipped',
						text: 'A run missed while the server was off starts at the next boot; wrong credentials fail fast with restic’s own error.',
					},
				],
			},
			{
				id: 'sftp',
				title: 'SFTP',
				summary: 'Give the people of a site access to its files with any SFTP client.',
				link: 'sftp',
				more: 'SFTP',
				items: [
					{
						title: 'One server per site',
						text: 'In its own confined container: read-only filesystem, minimal privileges, its own network, port and host key.',
					},
					{
						title: 'Accounts',
						text: 'The site’s users, not Sirio’s, with a password, SSH keys or both, each enabled or disabled on its own.',
					},
					{
						title: 'Granted folder by folder',
						text: 'Each account sees only the volumes and folders it’s given, read-write or read-only.',
					},
					{
						title: 'The right owner',
						text: 'Uploaded files take the owner of the folder they land in, or one you choose, so the application can still read them.',
					},
					{
						title: 'Nothing it shouldn’t',
						text: 'System paths, the Docker socket, Sirio’s data, home directories, database files and data shared with other sites are never exposed.',
					},
				],
			},
			{
				id: 'host',
				title: 'The host',
				summary: 'Packages, ports and power for the machine under the containers.',
				link: 'packages',
				more: 'System packages',
				items: [
					{
						title: 'System packages',
						text: 'Pending updates from apt, dnf, yum or apk, security fixes highlighted. Upgrade everything or a few packages, remove unused ones and clear the cache, following the output live.',
					},
					{
						title: 'Restart required',
						text: 'A notice when an update is waiting for the server to restart.',
					},
					{
						title: 'Listening ports',
						text: 'Every port listening on the host and every port Docker publishes, with its owner and whether it’s reachable from outside.',
						link: 'security',
						anchor: 'listening-ports',
						more: 'Listening ports',
					},
					{
						title: 'Security findings',
						text: 'Warnings on SSH accepting root or passwords, databases and the Docker API on public addresses, unencrypted protocols, exposed file sharing, remote desktops and admin panels, and Docker ports that skip the firewall.',
					},
					{
						title: 'Restart and shut down',
						text: 'Reboot or power off the server from the panel. Sirio warns about deploys and backups in progress, and waits for the machine to come back.',
					},
				],
			},
			{
				id: 'fail2ban',
				title: 'fail2ban',
				summary: 'Brute-force protection for SSH, set up and run from the panel.',
				link: 'security',
				anchor: 'fail2ban',
				more: 'fail2ban',
				items: [
					{
						title: 'One-click setup',
						text: 'Sirio installs fail2ban, reads the ports SSH really listens on and turns the sshd jail on.',
					},
					{
						title: 'Jails and bans',
						text: 'Every jail with its failures and bans, each banned address with its expiry, and the address you’re connected from.',
					},
					{
						title: 'Ban and unban',
						text: 'By hand, on any jail. Sirio refuses to ban you, local addresses and the ones on the whitelist.',
					},
					{
						title: 'Limits and whitelist',
						text: 'Ban time, find time and retries, plus addresses never to ban, with one click to add your own. When jail.local overrides a value, the panel says so.',
					},
					{
						title: 'Repeat offenders',
						text: 'Turn on recidive to ban for longer whoever keeps getting banned.',
					},
					{
						title: 'History',
						text: 'Every past ban, read from fail2ban’s own database.',
					},
				],
			},
			{
				id: 'people',
				title: 'Users and permissions',
				summary: 'Several people on one panel, each with exactly the access they need.',
				link: 'security',
				anchor: 'authorization',
				more: 'Authorization',
				items: [
					{
						title: 'Accounts',
						text: 'Administrators and users, signing in by email. Administrators add, edit and remove accounts and reset their passwords.',
					},
					{
						title: 'Permissions per section',
						text: 'Grant Sites, Proxy, Packages, Docker, Backups or Settings: one section of the panel each.',
					},
					{
						title: 'Per site, per action',
						text: 'Give access to single sites, then take away individual actions: run a pipeline but not edit it, restore a backup, never delete a container.',
					},
					{
						title: 'Activity log',
						text: 'Who did what, when, on which resource and from where.',
					},
					{
						title: 'Sessions',
						text: 'httpOnly session cookies, CSRF protection and a limit on login attempts.',
					},
					{
						title: 'Locked out',
						text: 'Reset any password, or start over with a new administrator, from the command line on the server.',
						link: 'installation',
						anchor: 'i-lost-the-password',
						more: 'I lost the password',
					},
					{
						title: 'Your language, your theme',
						text: 'English or Italian for each user, light or dark.',
					},
				],
			},
			{
				id: 'sirio',
				title: 'Install and updates',
				summary: 'One binary, no agent, and it keeps itself up to date.',
				link: 'installation',
				more: 'Installation',
				items: [
					{
						title: 'One binary',
						text: 'Panel, API and SQLite database in a single Go binary running as a systemd service. Nothing to deploy alongside, no external database.',
					},
					{
						title: 'Installer and wizard',
						text: 'One script installs the service; a wizard creates the first administrator and installs Docker if needed.',
					},
					{
						title: 'HTTPS for the panel',
						text: 'Behind your own Caddy or nginx, behind Sirio’s managed proxy, or with direct TLS.',
					},
					{
						title: 'Self-update',
						text: 'A check every six hours; install by hand, or automatically up to patch, minor or major releases.',
						link: 'updates',
						more: 'Updates',
					},
					{
						title: 'Signed releases',
						text: 'Every release is signed, verified before it’s installed and again by the running version, and rolled back on its own if the new version doesn’t stay up.',
					},
					{
						title: 'Unprivileged by design',
						text: 'Sirio runs without root on a system it can’t write to; every privileged action is a request that a root helper checks against its own closed list.',
						link: 'security',
						more: 'The security model',
					},
					{
						title: 'Encrypted secrets',
						text: 'Git tokens, deploy keys, webhook secrets and backup credentials are encrypted with AES-256-GCM and never sent back to the browser.',
					},
					{
						title: 'amd64 and arm64',
						text: 'Any Linux with systemd, on either architecture.',
					},
				],
			},
		],
	},
	it: {
		lead: 'Tutto quello che fa Sirio, in un solo posto. Ogni sezione rimanda alla documentazione che la spiega a fondo.',
		index: 'Sezioni',
		count: 'funzionalità',
		categories: [
			{
				id: 'docker',
				title: 'Docker',
				summary: 'I container dell’host e tutto quello che gli sta intorno, senza aprire un terminale.',
				link: 'image-updates',
				more: 'Aggiornamento delle immagini',
				items: [
					{
						title: 'L’host a colpo d’occhio',
						text: 'CPU, memoria, disco e uptime della macchina, ogni container disegnato come una stella e collegato agli altri del suo progetto Compose, e gli ultimi deploy.',
					},
					{
						title: 'Container',
						text: 'Filtra per sito, avvia, ferma, riavvia, metti in pausa, riprendi ed elimina. Per ognuno immagine, stato, salute, indirizzi e porte pubblicate.',
					},
					{
						title: 'Crea un container',
						text: 'Da qualunque immagine, con porte, variabili d’ambiente e volumi. Le porte restano su localhost se non chiedi altro, con un avviso quando una diventa pubblica.',
					},
					{
						title: 'Log e statistiche dal vivo',
						text: 'I log arrivano mentre vengono scritti, CPU, memoria, rete e disco si aggiornano dal vivo, e la configurazione completa con i mount è a una scheda di distanza.',
					},
					{
						title: 'Un terminale nel browser',
						text: 'Una shell dentro qualunque container in esecuzione, direttamente dal pannello.',
					},
					{
						title: 'Variabili e porte sovrascritte',
						text: 'Aggiungi o cambia variabili d’ambiente e porte dell’host di un container. Vengono riapplicate dopo ogni deploy, e su un servizio Compose toglierne una riporta il valore del compose.',
					},
					{
						title: 'Svuota i log',
						text: 'Svuota i file di log di un container: Sirio lo ferma, li cancella e lo riavvia.',
					},
					{
						title: 'Niente perdite silenziose',
						text: 'Prima di ricreare un container, Sirio cerca i file modificati al suo interno e te li elenca, perché ricrearlo li butterebbe via.',
					},
					{
						title: 'Immagini, volumi e reti',
						text: 'Scarica immagini seguendo l’avanzamento, eliminale e fai pulizia vedendo lo spazio che occupano; crea ed elimina volumi e reti, con quelli in uso segnalati.',
					},
					{
						title: 'Aggiornamento delle immagini',
						text: 'Ogni sei ore Sirio chiede al registry se il tag di un container punta a un’immagine più recente, e lo aggiorna quando vuoi, se credi dopo un backup del suo sito. I container che pubblica una pipeline restano a quella pipeline.',
					},
					{
						title: 'Docker te lo installa lui',
						text: 'Se Docker manca, il wizard del primo avvio lo installa dal repository ufficiale di Docker, o dal pacchetto della distribuzione.',
					},
				],
			},
			{
				id: 'sites',
				title: 'Siti, domini e HTTPS',
				summary: 'Un sito raggruppa domini, container, pipeline, backup e SFTP. Un proxy Caddy gestito lo mette online.',
				link: 'domains',
				more: 'Domini e siti',
				items: [
					{
						title: 'Siti',
						text: 'Un posto per ogni progetto: i suoi domini e le sue route, i suoi container, le pipeline che lo pubblicano, i piani di backup e il server SFTP.',
					},
					{
						title: 'HTTPS automatico',
						text: 'I certificati vengono ottenuti e rinnovati da soli. Un dominio può anche usare un certificato interno, o HTTP semplice.',
					},
					{
						title: 'Route',
						text: 'Manda un dominio, o un suo percorso, a un container o a qualunque host e porta. Un dominio può avere molte route, un container molti domini.',
					},
					{
						title: 'Controllato prima di andare online',
						text: 'Caddy convalida ogni modifica prima che venga applicata, e una rifiutata viene annullata, così un dominio sbagliato non butta giù gli altri siti. Il proxy viene riallineato dopo ogni deploy e ogni minuto.',
					},
					{
						title: 'Controllo DNS',
						text: 'Verifica se un dominio punta già al server prima di aspettarne il certificato.',
					},
					{
						title: 'Il pannello su un suo dominio',
						text: 'Servi Sirio stesso attraverso il proxy, in HTTPS su un suo dominio, sulla 443 o su un’altra porta.',
						link: 'domains',
						anchor: 'esporre-il-pannello-stesso',
						more: 'Esporre il pannello',
					},
					{
						title: 'La configurazione generata, in vista',
						text: 'Il Caddyfile scritto da Sirio è mostrato così com’è, insieme all’ultimo errore quando una modifica è stata rifiutata.',
					},
					{
						title: 'Proprietà dei container',
						text: 'Un container appartiene a un sito o è condiviso tra più siti, e questo decide chi può gestirlo e cosa salva il backup di ogni sito.',
					},
				],
			},
			{
				id: 'access',
				title: 'Route protette da password',
				summary: 'Autenticazione HTTP davanti a qualunque route, senza toccare l’applicazione che c’è dietro.',
				link: 'domains',
				anchor: 'rotte-protette-da-password',
				more: 'Rotte protette da password',
				items: [
					{
						title: 'Liste di accesso',
						text: 'Elenchi di visitatori per sito, ognuno con la sua password, salvata solo come hash bcrypt. Una lista può proteggere quante route vuoi.',
					},
					{
						title: 'Basic auth sul proxy',
						text: 'Il browser chiede le credenziali prima che la richiesta arrivi al container, e le credenziali vengono tolte prima che ci arrivi.',
					},
					{
						title: 'Nel dubbio, chiuso',
						text: 'Una lista rimasta vuota o sparita risponde 403: una route protetta non diventa mai pubblica per sbaglio. Una lista in uso non si può eliminare.',
					},
					{
						title: 'Importa da .htpasswd',
						text: 'Incolla o scegli un file .htpasswd di Apache per portare gli utenti che hai già, o fatti generare da Sirio una password robusta.',
					},
				],
			},
			{
				id: 'pipelines',
				title: 'Repository e pipeline',
				summary: 'Dal git push ai container in esecuzione, con ogni passo registrato.',
				link: 'pipeline',
				more: 'Pipeline',
				items: [
					{
						title: 'Repository',
						text: 'Pubblici, con un token HTTPS o con una deploy key SSH. Token e chiavi vengono cifrati e non vengono più mostrati.',
					},
					{
						title: 'Passi di build e deploy',
						text: 'Una fase di build e una di deploy fatte di comandi shell, build Docker, comandi Compose, riavvii di container e backup.',
					},
					{
						title: 'Rilevati dal Compose',
						text: 'Sirio trova il file compose nel repository e ti propone il passo di deploy, da rivedere prima di salvare.',
					},
					{
						title: 'Webhook',
						text: 'Pubblica a ogni push su un branch o a ogni nuovo tag, da GitHub, GitLab o Gitea. Ogni richiesta è verificata dalla sua firma HMAC; il segreto si vede una volta sola e si può rigenerare.',
					},
					{
						title: 'Avvii a mano e rollback',
						text: 'Lancia una pipeline a mano su qualunque branch, tag o commit, interrompi un’esecuzione, e rilanciane una vecchia per tornare indietro.',
					},
					{
						title: 'Log dal vivo e storico',
						text: 'Ogni esecuzione mostra il suo output dal vivo e resta salvata con commit, origine e durata.',
					},
					{
						title: 'Al sicuro dall’input non fidato',
						text: 'Branch, commit e autore che arrivano da un webhook raggiungono i passi solo come variabili d’ambiente, mai incollati in un comando.',
					},
					{
						title: 'Dopo il deploy',
						text: 'Le sovrascritture vengono riapplicate, il proxy aggiornato, e i container avviati da Compose assegnati al sito della pipeline.',
					},
					{
						title: 'Esporta e importa',
						text: 'Sposta le pipeline tra server come file JSON, senza ID né segreti; l’import abbina da solo repository e siti.',
					},
					{
						title: 'Una cosa alla volta',
						text: 'Le esecuzioni vanno in coda e partono una dopo l’altra, e un deploy aspetta che finisca il backup dello stesso sito, e viceversa.',
					},
				],
			},
			{
				id: 'backups',
				title: 'Backup',
				summary: 'Backup restic cifrati e pianificati di ogni sito, e ripristini dal pannello.',
				link: 'backups',
				more: 'Backup',
				items: [
					{
						title: 'Destinazioni',
						text: 'Una cartella locale, SFTP (con la chiave dell’host fissata dopo che l’hai confermata), Amazon S3 e storage compatibili S3, Backblaze B2 e Google Cloud Storage.',
					},
					{
						title: 'Piani per sito',
						text: 'Una pianificazione, quanti snapshot recenti, giornalieri, settimanali e mensili tenere, e quali volumi e cartelle lasciare fuori.',
					},
					{
						title: 'Database coerenti',
						text: 'MySQL, MariaDB, Percona e PostgreSQL vengono riconosciuti dall’immagine ed esportati con i loro strumenti mentre girano.',
					},
					{
						title: 'Una scelta per container',
						text: 'Esportalo con un dump, fermalo durante la copia, copialo mentre gira, o lascialo fuori.',
					},
					{
						title: 'Copertura a colpo d’occhio',
						text: 'Quali siti non hanno un backup, e quali sono falliti o in ritardo.',
					},
					{
						title: 'Sfoglia e scarica',
						text: 'Guarda dentro qualunque snapshot e scarica un file, o una cartella come .zip.',
					},
					{
						title: 'Ripristino',
						text: 'Un volume sopra l’originale o in uno nuovo, una cartella al suo posto, o un dump di database direttamente nel suo container.',
					},
					{
						title: 'Kit di recupero',
						text: 'La password del repository, protetta dalla tua, così i dati si possono ripristinare con restic da qualunque macchina.',
					},
					{
						title: 'Parte del flusso di lavoro',
						text: 'Lancia un backup come passo di una pipeline, o prima di aggiornare un’immagine: se il backup fallisce, non si tocca niente.',
					},
					{
						title: 'Niente salti',
						text: 'Un backup saltato mentre il server era spento parte all’avvio successivo; credenziali sbagliate falliscono subito con l’errore di restic.',
					},
				],
			},
			{
				id: 'sftp',
				title: 'SFTP',
				summary: 'Dai alle persone di un sito accesso ai suoi file con qualunque client SFTP.',
				link: 'sftp',
				more: 'SFTP',
				items: [
					{
						title: 'Un server per sito',
						text: 'In un suo container confinato: filesystem in sola lettura, privilegi minimi, una sua rete, una sua porta e una sua chiave host.',
					},
					{
						title: 'Account',
						text: 'Gli utenti del sito, non quelli di Sirio, con una password, chiavi SSH o entrambe, ognuno attivabile e disattivabile da solo.',
					},
					{
						title: 'Cartella per cartella',
						text: 'Ogni account vede solo i volumi e le cartelle che gli assegni, in lettura e scrittura o in sola lettura.',
					},
					{
						title: 'Il proprietario giusto',
						text: 'I file caricati prendono il proprietario della cartella in cui finiscono, o quello che scegli tu, così l’applicazione riesce ancora a leggerli.',
					},
					{
						title: 'Niente di quello che non deve',
						text: 'Percorsi di sistema, il socket di Docker, i dati di Sirio, le home, i file dei database e i dati condivisi con altri siti non vengono mai esposti.',
					},
				],
			},
			{
				id: 'host',
				title: 'L’host',
				summary: 'Pacchetti, porte e alimentazione della macchina sotto i container.',
				link: 'packages',
				more: 'Pacchetti di sistema',
				items: [
					{
						title: 'Pacchetti di sistema',
						text: 'Aggiornamenti disponibili da apt, dnf, yum o apk, con quelli di sicurezza in evidenza. Aggiorna tutto o solo alcuni pacchetti, rimuovi quelli inutilizzati e svuota la cache, seguendo l’output dal vivo.',
					},
					{
						title: 'Riavvio richiesto',
						text: 'Un avviso quando un aggiornamento aspetta che il server venga riavviato.',
					},
					{
						title: 'Porte in ascolto',
						text: 'Ogni porta in ascolto sull’host e ogni porta pubblicata da Docker, con chi la usa e se è raggiungibile dall’esterno.',
						link: 'security',
						anchor: 'porte-in-ascolto',
						more: 'Porte in ascolto',
					},
					{
						title: 'Avvisi di sicurezza',
						text: 'SSH che accetta root o password, database e API di Docker su indirizzi pubblici, protocolli non cifrati, condivisione file, desktop remoti e pannelli di amministrazione esposti, e porte di Docker che scavalcano il firewall.',
					},
					{
						title: 'Riavvia e spegni',
						text: 'Riavvia o spegni il server dal pannello. Sirio avvisa se ci sono deploy o backup in corso, e aspetta che la macchina torni su.',
					},
				],
			},
			{
				id: 'fail2ban',
				title: 'fail2ban',
				summary: 'Protezione dai tentativi di accesso a forza bruta su SSH, configurata e gestita dal pannello.',
				link: 'security',
				anchor: 'fail2ban',
				more: 'fail2ban',
				items: [
					{
						title: 'Installazione con un clic',
						text: 'Sirio installa fail2ban, legge le porte su cui SSH ascolta davvero e attiva la jail sshd.',
					},
					{
						title: 'Jail e ban',
						text: 'Ogni jail con i suoi tentativi falliti e i suoi ban, ogni indirizzo bannato con la sua scadenza, e l’indirizzo da cui sei collegato.',
					},
					{
						title: 'Banna e sbanna',
						text: 'A mano, su qualunque jail. Sirio si rifiuta di bannare te, gli indirizzi locali e quelli in whitelist.',
					},
					{
						title: 'Limiti e whitelist',
						text: 'Durata del ban, finestra di osservazione e tentativi, più gli indirizzi da non bannare mai, con un clic per aggiungere il tuo. Se jail.local sovrascrive un valore, il pannello te lo dice.',
					},
					{
						title: 'Recidivi',
						text: 'Attiva recidive per bannare più a lungo chi continua a farsi bannare.',
					},
					{
						title: 'Storico',
						text: 'Tutti i ban passati, letti dal database di fail2ban.',
					},
				],
			},
			{
				id: 'people',
				title: 'Utenti e permessi',
				summary: 'Più persone sullo stesso pannello, ognuna con l’accesso che le serve, né più né meno.',
				link: 'security',
				anchor: 'autorizzazione',
				more: 'Autorizzazione',
				items: [
					{
						title: 'Account',
						text: 'Amministratori e utenti, che accedono con l’email. Gli amministratori aggiungono, modificano ed eliminano account e ne reimpostano la password.',
					},
					{
						title: 'Permessi per sezione',
						text: 'Concedi Siti, Proxy, Pacchetti, Docker, Backup o Impostazioni: ognuno una sezione del pannello.',
					},
					{
						title: 'Per sito, per azione',
						text: 'Dai accesso a singoli siti, poi togli le singole azioni: lanciare una pipeline ma non modificarla, ripristinare un backup, non eliminare mai un container.',
					},
					{
						title: 'Registro delle attività',
						text: 'Chi ha fatto cosa, quando, su quale risorsa e da dove.',
					},
					{
						title: 'Sessioni',
						text: 'Cookie di sessione httpOnly, protezione CSRF e un limite ai tentativi di accesso.',
					},
					{
						title: 'Rimasto fuori',
						text: 'Reimposta qualunque password, o riparti con un nuovo amministratore, dalla riga di comando sul server.',
						link: 'installation',
						anchor: 'ho-perso-la-password',
						more: 'Ho perso la password',
					},
					{
						title: 'La tua lingua, il tuo tema',
						text: 'Italiano o inglese per ogni utente, chiaro o scuro.',
					},
				],
			},
			{
				id: 'sirio',
				title: 'Installazione e aggiornamenti',
				summary: 'Un solo binario, nessun agente, e si tiene aggiornato da solo.',
				link: 'installation',
				more: 'Installazione',
				items: [
					{
						title: 'Un solo binario',
						text: 'Pannello, API e database SQLite in un singolo binario Go che gira come servizio systemd. Niente da installare accanto, nessun database esterno.',
					},
					{
						title: 'Installer e wizard',
						text: 'Uno script installa il servizio; un wizard crea il primo amministratore e, se serve, installa Docker.',
					},
					{
						title: 'HTTPS per il pannello',
						text: 'Dietro il tuo Caddy o nginx, dietro il proxy gestito da Sirio, o con TLS diretto.',
					},
					{
						title: 'Si aggiorna da solo',
						text: 'Un controllo ogni sei ore; installa a mano, o in automatico fino a release patch, minor o major.',
						link: 'updates',
						more: 'Aggiornamenti',
					},
					{
						title: 'Release firmate',
						text: 'Ogni release è firmata, verificata prima dell’installazione e di nuovo dalla versione in esecuzione, e ripristinata da sola se la nuova versione non resta su.',
					},
					{
						title: 'Senza privilegi per scelta',
						text: 'Sirio gira senza root su un sistema in cui non può scrivere; ogni azione privilegiata è una richiesta che un helper root ricontrolla contro il proprio elenco chiuso.',
						link: 'security',
						more: 'Il modello di sicurezza',
					},
					{
						title: 'Segreti cifrati',
						text: 'Token Git, deploy key, segreti dei webhook e credenziali dei backup sono cifrati con AES-256-GCM e non tornano mai al browser.',
					},
					{
						title: 'amd64 e arm64',
						text: 'Qualunque Linux con systemd, su entrambe le architetture.',
					},
				],
			},
		],
	},
};

export function featuresUrl(locale: 'en' | 'it', id?: string) {
	return `${locale === 'it' ? '/it' : ''}/features/${id ? `#${id}` : ''}`;
}
