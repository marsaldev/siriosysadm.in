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
		version: '0.27.0',
		date: '2026-11-20',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'A transfer can load a database into a new one: when you choose where a database goes, the menu also offers a new database in each receiving container of the same engine, created when it’s loaded. Before, only databases the receiving side already had were offered.',
					it: 'Un trasferimento può caricare un database in uno nuovo: scegliendo dove va un database, il menu propone anche un nuovo database in ogni container che riceve dello stesso motore, creato al caricamento. Prima venivano proposti solo i database che chi riceve aveva già.',
				},
				link: 'transfers',
				anchor: { en: 'what-a-transfer-copies', it: 'cosa-copia-un-trasferimento' },
				more: { en: 'What a transfer copies', it: 'Cosa copia un trasferimento' },
			},
			{
				kind: 'fixed',
				text: {
					en: 'A disk filling up sends one notification, not four: Sirio’s own sandboxing shows the root disk again at /tmp, /var/tmp and its data directory, and each one counted as a separate disk.',
					it: 'Un disco che si riempie manda una notifica, non quattro: l’isolamento di Sirio stesso mostra il disco principale anche in /tmp, /var/tmp e nella sua cartella dati, e ognuno contava come un disco a parte.',
				},
			},
			{
				kind: 'fixed',
				text: {
					en: 'The Ports page no longer warns that the panel is reachable over plain HTTP when it serves HTTPS with the self-signed certificate, as a default install does.',
					it: 'La pagina Porte non avvisa più che il pannello è raggiungibile in HTTP in chiaro quando serve HTTPS con il certificato autofirmato, come fa un’installazione predefinita.',
				},
				link: 'security',
				anchor: { en: 'listening-ports', it: 'porte-in-ascolto' },
				more: { en: 'Listening ports', it: 'Porte in ascolto' },
			},
		],
	},
	{
		version: '0.26.0',
		date: '2026-11-19',
		title: { en: 'Transfers between panels', it: 'Trasferimenti tra pannelli' },
		changes: [
			{
				kind: 'new',
				text: {
					en: 'A site’s volumes, databases and folders can be copied onto a linked site of another Sirio panel, to move a site to a new server or refresh a staging copy. The receiving panel creates the link and hands out an invite. Before anything moves, you see what each item would copy and what it pairs with on the other side.',
					it: 'I volumi, i database e le cartelle di un sito si possono copiare su un sito collegato di un altro pannello Sirio, per spostare un sito su un nuovo server o aggiornare una copia di staging. Il pannello che riceve crea il collegamento e consegna un invito. Prima che qualcosa si muova vedi cosa copierebbe ogni elemento e a cosa corrisponde dall’altra parte.',
				},
				link: 'transfers',
				more: { en: 'Transfers between panels', it: 'Trasferimenti tra pannelli' },
			},
			{
				kind: 'new',
				text: {
					en: 'The receiving panel decides what is protected: its protected files, the files a repository tracks, device files and links leading outside a copied item are never written. Nothing is applied until every file and dump has arrived intact. The containers using a target are stopped while the copy is applied and started again afterwards.',
					it: 'È il pannello che riceve a decidere cosa è protetto: i suoi file protetti, i file tracciati da un repository, i file di dispositivo e i link che portano fuori da un elemento copiato non vengono mai scritti. Non si applica nulla finché ogni file e ogni dump non è arrivato integro. I container che usano una destinazione vengono fermati mentre la copia viene applicata e riavviati dopo.',
				},
				link: 'transfers',
				anchor: { en: 'protected-files', it: 'file-protetti' },
				more: { en: 'Protected files', it: 'File protetti' },
			},
			{
				kind: 'new',
				text: {
					en: 'Transfers are off until an administrator turns them on in Settings. Linking sites takes the new Transfers permission, and a site’s Transfers area decides who sees and sends its transfers.',
					it: 'I trasferimenti sono spenti finché un amministratore non li attiva nelle Impostazioni. Collegare i siti richiede il nuovo permesso Trasferimenti, e l’area Trasferimenti di un sito decide chi vede e invia i suoi trasferimenti.',
				},
				link: 'transfers',
				anchor: { en: 'permissions', it: 'permessi' },
				more: { en: 'Permissions', it: 'Permessi' },
			},
			{
				kind: 'improved',
				text: {
					en: 'A transfer sends a notification when a site has been received and when it fails on either side. Self-updates, restarts and shutdowns wait for a transfer in progress.',
					it: 'Un trasferimento invia una notifica quando un sito è stato ricevuto e quando fallisce da una delle due parti. Aggiornamenti, riavvii e spegnimenti aspettano che un trasferimento in corso finisca.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'The pipeline docs now explain where an application’s data should live. Every deploy ends with git clean -fd, so a folder bound from the repository with ./ is emptied unless .gitignore lists it: keep uploads in a named volume.',
					it: 'La documentazione delle pipeline ora spiega dove tenere i dati di un’applicazione. Ogni deploy finisce con git clean -fd, quindi una cartella del repository montata con ./ viene svuotata a meno che .gitignore la elenchi: tieni i file caricati in un volume nominato.',
				},
				link: 'pipeline',
				anchor: { en: 'data-the-application-writes', it: 'i-dati-che-lapplicazione-scrive' },
				more: { en: 'Data the application writes', it: 'I dati che l’applicazione scrive' },
			},
		],
	},
	{
		version: '0.25.2',
		date: '2026-11-18',
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'After you move a container to another site, the notice that lets you undo it shows a bar with the time left. It pauses while your mouse is over the notice or one of its buttons has keyboard focus.',
					it: 'Dopo aver spostato un container in un altro sito, l’avviso che permette di annullare mostra una barra con il tempo rimasto. Si ferma mentre il mouse è sopra l’avviso o uno dei suoi pulsanti ha il focus da tastiera.',
				},
			},
		],
	},
	{
		version: '0.25.1',
		date: '2026-11-17',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'The Containers page shows one table per site, plus one for the shared containers that belong to no site. Sites without containers stay listed but collapsed, and the browser remembers which groups you collapsed.',
					it: 'La pagina Container mostra una tabella per sito, più una per i container condivisi che non appartengono a nessun sito. I siti senza container restano in elenco ma chiusi, e il browser ricorda quali gruppi hai chiuso.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'Moving a container to another site is immediate: the row moves to that site’s table and is highlighted, with a notice to jump to it or undo.',
					it: 'Spostare un container in un altro sito è immediato: la riga passa nella tabella di quel sito e viene evidenziata, con un avviso per raggiungerla o annullare.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'A Preferences card in Account lets each user choose whether shared containers come before or after the sites.',
					it: 'Una card Preferenze in Account permette a ogni utente di scegliere se i container condivisi vengono prima o dopo i siti.',
				},
			},
			{
				kind: 'maintenance',
				text: {
					en: 'The release audit fails on high-severity advisories only in code that ships with Sirio, and on critical ones only for build tools. 0.25.0 was never published because of this check: 0.25.1 includes all of its changes.',
					it: 'Il controllo delle release fallisce per le vulnerabilità gravi solo nel codice che fa parte di Sirio, e per gli strumenti di build solo per quelle critiche. La 0.25.0 non è mai stata pubblicata per questo controllo: la 0.25.1 ne include tutte le modifiche.',
				},
			},
		],
	},
	{
		version: '0.24.0',
		date: '2026-11-17',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'Starting a pipeline by hand now offers the repository’s branches, read from the Git remote, with the pipeline’s default branch already selected. Another branch, a tag or a commit can still be typed in.',
					it: 'Avviando una pipeline a mano ora vengono proposti i branch del repository, letti dal remote Git, con il branch predefinito della pipeline già selezionato. Un altro branch, un tag o un commit si possono sempre scrivere a mano.',
				},
				link: 'pipeline',
				anchor: { en: 'manual-start', it: 'avvio-manuale' },
				more: { en: 'Manual start', it: 'Avvio manuale' },
			},
			{
				kind: 'improved',
				text: {
					en: 'A manual pipeline can have a default branch, set in its editor: it’s the one the Run dialog proposes.',
					it: 'Una pipeline manuale può avere un branch predefinito, impostato nel suo editor: è quello che propone la finestra di avvio.',
				},
			},
			{
				kind: 'fixed',
				text: {
					en: 'The Run dialog no longer proposes a trigger pattern such as release/* or v*, which a run can’t check out.',
					it: 'La finestra di avvio non propone più un pattern del trigger come release/* o v*, che un’esecuzione non può scaricare.',
				},
			},
		],
	},
	{
		version: '0.23.0',
		date: '2026-11-17',
		changes: [
			{
				kind: 'new',
				text: {
					en: 'A pipeline can be cloned from the Pipelines page: the copy icon on a row opens the editor filled in with its repository, site, trigger and steps, with a free name proposed. Saving is an ordinary creation, so a new webhook secret is issued and the usual permission checks apply.',
					it: 'Una pipeline si può clonare dalla pagina Pipeline: l’icona di copia su una riga apre l’editor già compilato con repository, sito, trigger e step, con un nome libero già proposto. Il salvataggio è una creazione normale, quindi viene emesso un nuovo segreto del webhook e valgono i soliti controlli sui permessi.',
				},
				link: 'pipeline',
				anchor: { en: 'cloning', it: 'clonazione' },
				more: { en: 'Cloning', it: 'Clonazione' },
			},
		],
	},
	{
		version: '0.22.0',
		date: '2026-11-11',
		title: { en: 'Security audit follow-up', it: 'Seguito dell’audit di sicurezza' },
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'Behind a reverse proxy Sirio doesn’t manage, the client’s own address is now read from X-Forwarded-For when the proxy is named in SIRIO_TRUSTED_PROXIES, so one failed-login streak no longer locks out everyone and the activity log keeps the real addresses. From anyone else the header is ignored.',
					it: 'Dietro un reverse proxy che Sirio non gestisce, l’indirizzo del client viene letto da X-Forwarded-For quando il proxy è indicato in SIRIO_TRUSTED_PROXIES: una serie di login falliti non blocca più tutti e il registro delle attività conserva gli indirizzi reali. Da chiunque altro l’intestazione viene ignorata.',
				},
				link: 'installation',
				anchor: { en: '4-first-login', it: '4-primo-accesso' },
				more: { en: 'First login', it: 'Primo accesso' },
			},
			{
				kind: 'improved',
				text: {
					en: 'Site users can publish containers only on the host ports the administrator opens to them with SIRIO_SITE_PORTS (none by default), so a container can no longer take the panel’s port, or 80 and 443, at boot.',
					it: 'Gli utenti di un sito possono pubblicare container solo sulle porte dell’host che l’amministratore apre loro con SIRIO_SITE_PORTS (nessuna di default), così un container non può più prendersi la porta del pannello, né la 80 e la 443, all’avvio.',
				},
				link: 'security',
				anchor: { en: 'what-a-site-permission-cant-do', it: 'cosa-un-permesso-su-un-sito-non-consente' },
				more: { en: 'What a site permission can’t do', it: 'Cosa non può fare il permesso su un sito' },
			},
			{
				kind: 'improved',
				text: {
					en: 'Starting, stopping, restarting, pausing and killing a container is now its own permission, containers.control, which can be denied apart from viewing logs and state.',
					it: 'Avviare, fermare, riavviare, mettere in pausa e terminare un container è ora un permesso a sé, containers.control, che si può negare separatamente dalla vista di log e stato.',
				},
			},
			{
				kind: 'fixed',
				text: {
					en: 'Bind mounts can no longer lead out of the site through a symbolic link: contained pipelines check out without links, backups and restores check each bind, and restoring over a volume that another site’s container uses is refused.',
					it: 'I bind mount non possono più uscire dal sito tramite un link simbolico: le pipeline contenute fanno il checkout senza link, backup e ripristini controllano ogni bind e il ripristino su un volume usato dal container di un altro sito viene rifiutato.',
				},
				link: 'security',
				anchor: { en: 'compose-files-and-host-access', it: 'file-compose-e-accesso-allhost' },
				more: { en: 'Compose files and host access', it: 'File Compose e accesso all’host' },
			},
			{
				kind: 'improved',
				text: {
					en: 'Each account takes at most 20 failed logins in 15 minutes, in the panel and over SFTP: past that, addresses it has never logged in from are refused, so locking an account on purpose doesn’t lock its owner out. SFTP also refuses special files left in a mount.',
					it: 'Ogni account accetta al massimo 20 login falliti in 15 minuti, nel pannello e via SFTP: oltre, gli indirizzi da cui non ha mai fatto accesso vengono rifiutati, così bloccare un account di proposito non esclude il suo proprietario. L’SFTP rifiuta inoltre i file speciali lasciati in un mount.',
				},
				link: 'sftp',
			},
			{
				kind: 'improved',
				text: {
					en: 'Webhooks answer every failure with the same 401 and refuse a delivery they already ran, so a captured request can’t redeploy an old commit. SHA-1 signatures are refused unless SIRIO_WEBHOOK_ALLOW_SHA1 is set.',
					it: 'I webhook rispondono a ogni errore con lo stesso 401 e rifiutano una consegna già eseguita, così una richiesta catturata non può rilanciare un vecchio commit. Le firme SHA-1 sono rifiutate salvo SIRIO_WEBHOOK_ALLOW_SHA1.',
				},
				link: 'security',
				anchor: { en: 'webhooks', it: 'webhook' },
				more: { en: 'Webhooks', it: 'Webhook' },
			},
			{
				kind: 'improved',
				text: {
					en: 'Git URLs that could be read as options, or that use plain http://, are refused for new repositories. A local backup destination in a folder the rule now refuses is moved to /srv/sirio-backups, and the administrators are notified.',
					it: 'Gli URL Git che potrebbero essere letti come opzioni, o che usano http:// in chiaro, sono rifiutati per i nuovi repository. Una destinazione di backup locale in una cartella che la regola ora rifiuta viene spostata in /srv/sirio-backups e gli amministratori ricevono una notifica.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'Internal error messages, with paths and the words of SQLite or Docker, are shown only to administrators and users with the Docker permission; everyone else gets an error code and a reference to find it in the log.',
					it: 'I messaggi degli errori interni, con percorsi e parole di SQLite o Docker, li vedono solo gli amministratori e chi ha il permesso Docker; tutti gli altri ricevono un codice d’errore e un riferimento per ritrovarlo nel log.',
				},
			},
			{
				kind: 'fixed',
				text: {
					en: 'The installer of a release no longer uses files found next to it, which let a local user who could write in that folder run code as root during the install.',
					it: 'L’installer di una release non usa più i file trovati accanto a sé, che permettevano a un utente locale con accesso in scrittura in quella cartella di eseguire codice come root durante l’installazione.',
				},
			},
			{
				kind: 'fixed',
				text: {
					en: 'A failed run now logs why it failed, and the disk check skips read-only images, which raised a “disk full” notification on every machine with a cloud-init config drive. The network list now counts its containers.',
					it: 'Una run fallita ora scrive nel log il motivo, e il controllo del disco salta le immagini di sola lettura, che generavano una notifica «disco pieno» su ogni macchina con un config drive cloud-init. L’elenco delle reti ora conta i suoi container.',
				},
			},
		],
	},
	{
		version: '0.21.1',
		date: '2026-11-11',
		changes: [
			{
				kind: 'fixed',
				text: {
					en: 'Updating to 0.21.0 no longer ends in a rollback: the installer failed when a file it reads, like the setup code that is gone once an administrator exists, was missing. A fresh install without a self-signed certificate hit the same error.',
					it: 'L’aggiornamento alla 0.21.0 non finisce più con un rollback: l’installer si fermava quando mancava un file che legge, come il codice di setup che sparisce una volta creato un amministratore. Anche una nuova installazione senza certificato autofirmato incontrava lo stesso errore.',
				},
			},
			{
				kind: 'fixed',
				text: {
					en: 'The job that upgrades all packages is now named “upgrade of all packages” instead of “complete”, which read as finished while it was still running.',
					it: 'Il job che aggiorna tutti i pacchetti ora si chiama «aggiornamento di tutti i pacchetti» invece di «completo», che sembrava concluso mentre era ancora in corso.',
				},
			},
		],
	},
	{
		version: '0.21.0',
		date: '2026-11-11',
		title: { en: 'Security hardening', it: 'Rafforzamento della sicurezza' },
		changes: [
			{
				kind: 'improved',
				text: {
					en: 'A permission on a site is no longer access to the server: shell steps, host folders mounted into containers and other sites’ volumes or networks need an administrator or the Docker permission.',
					it: 'Il permesso su un sito non è più accesso al server: step shell, cartelle dell’host montate nei container e volumi o reti di altri siti richiedono un amministratore o il permesso Docker.',
				},
				link: 'security',
				anchor: { en: 'what-a-site-permission-cant-do', it: 'cosa-un-permesso-su-un-sito-non-consente' },
				more: { en: 'What a site permission can’t do', it: 'Cosa non può fare il permesso su un sito' },
			},
			{
				kind: 'improved',
				text: {
					en: 'The Compose files of pipelines are checked before they run: only known keys, paths inside the checkout, resources of the pipeline’s own site, no include or extends. An administrator can trust a pipeline with the host to skip the check.',
					it: 'I file Compose delle pipeline vengono controllati prima di partire: solo chiavi note, percorsi dentro il checkout, risorse del sito della pipeline, niente include né extends. Un amministratore può dare a una pipeline l’accesso all’host per saltare il controllo.',
				},
				link: 'security',
				anchor: { en: 'compose-files-and-host-access', it: 'file-compose-e-accesso-allhost' },
				more: { en: 'Compose files and host access', it: 'File Compose e accesso all’host' },
			},
			{
				kind: 'improved',
				text: {
					en: 'Proxy routes can only point to the site’s own containers, or ones the user may act on; a host:port destination needs the Proxy permission. A pipeline needs access to its repository.',
					it: 'Le rotte del proxy possono puntare solo ai container del sito, o a quelli su cui l’utente può agire; una destinazione host:porta richiede il permesso Proxy. Una pipeline richiede l’accesso al suo repository.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'Git over SSH trusts only the host key you confirm when saving the repository; existing repositories pin it on their first run.',
					it: 'Git via SSH si fida solo della chiave dell’host che confermi salvando il repository; quelli esistenti la fissano alla prima esecuzione.',
				},
			},
			{
				kind: 'improved',
				text: {
					en: 'The terminal in a container is a permission of its own, separate from viewing logs and state.',
					it: 'Il terminale in un container è un permesso a sé, separato dalla vista di log e stato.',
				},
			},
			{
				kind: 'new',
				text: {
					en: 'The first-run wizard asks for a single-use setup code, printed by the installer and written to the log, so whoever reaches the port first can’t create the administrator.',
					it: 'Il wizard del primo avvio chiede un codice di setup monouso, stampato dall’installer e scritto nel log, così chi raggiunge per primo la porta non può creare l’amministratore.',
				},
				link: 'installation',
				anchor: { en: '4-first-login', it: '4-primo-accesso' },
				more: { en: 'First login', it: 'Primo accesso' },
			},
			{
				kind: 'new',
				text: {
					en: 'Listening beyond localhost without a certificate, the panel serves HTTPS with a self-signed certificate whose fingerprint the installer prints, and redirects plain HTTP to it. Installations on 0.0.0.0 switch to https:// on this update.',
					it: 'In ascolto oltre localhost senza certificato, il pannello serve HTTPS con un certificato autofirmato di cui l’installer stampa l’impronta, e reindirizza l’HTTP semplice. Le installazioni su 0.0.0.0 passano a https:// con questo aggiornamento.',
				},
				link: 'installation',
				anchor: { en: '3-a-real-certificate', it: '3-un-certificato-vero' },
				more: { en: 'A real certificate', it: 'Un certificato vero' },
			},
			{
				kind: 'improved',
				text: {
					en: 'The installer always shows the address it detected and asks you to confirm it or type the right one, so the printed URL is correct behind a floating IP, a load balancer or a NAT.',
					it: 'L’installer mostra sempre l’indirizzo rilevato e chiede di confermarlo o di scrivere quello giusto, così l’URL stampato è corretto dietro un IP flottante, un load balancer o un NAT.',
				},
			},
			{
				kind: 'maintenance',
				text: {
					en: 'Updated dependencies, and a vulnerability audit run before every release.',
					it: 'Dipendenze aggiornate e un controllo delle vulnerabilità prima di ogni release.',
				},
			},
		],
	},
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
