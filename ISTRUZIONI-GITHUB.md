# Come pubblicare NEXUS su GitHub Pages

Questi file sono pronti per essere caricati cosi' come sono. Segui questi passaggi.

## 1. Crea un nuovo repository su GitHub

1. Vai su [github.com/new](https://github.com/new).
2. Dai un nome al repository (es. `nexus-sondaggi`).
3. Lascialo **Public** (necessario per GitHub Pages gratuito, a meno che tu non abbia un piano a pagamento).
4. **Non** selezionare "Add a README file": questo zip ne contiene gia' uno.
5. Clicca **Create repository**.

## 2. Carica i file

**Opzione A — dal browser (piu' semplice):**
1. Nella pagina del repository appena creato, clicca su **"uploading an existing file"** (o **Add file > Upload files**).
2. Trascina dentro tutti i file contenuti in questo zip (mantenendoli nella cartella principale, non in una sottocartella).
3. Scrivi un messaggio di commit (es. "Primo caricamento") e clicca **Commit changes**.

**Opzione B — da terminale con Git:**
```bash
cd cartella-estratta-dello-zip
git init
git add .
git commit -m "Primo caricamento"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/nexus-sondaggi.git
git push -u origin main
```

## 3. Attiva GitHub Pages

1. Nel repository, vai su **Settings** (in alto a destra).
2. Nel menu a sinistra clicca su **Pages**.
3. Sotto "Build and deployment" > **Source**, seleziona **Deploy from a branch**.
4. In **Branch**, scegli `main` e cartella `/ (root)`, poi clicca **Save**.
5. Aspetta 1-2 minuti: GitHub ti mostrera' l'indirizzo pubblico, del tipo:
   `https://TUO-USERNAME.github.io/nexus-sondaggi/`

Quella e' la tua pagina live, con i tre bottoni: **Lascia un commento**, **Vota**, **Visualizza timeline**.

## 4. Nota sui commenti e sui voti (Google Sheets)

`commenti.html` e `voto.html` inviano i dati a un Google Apps Script (vedi `config.js` e `apps-script.gs`), quindi se vuoi che continuino a funzionare devi ricollegarli al tuo Google Sheet come avevi gia' fatto in precedenza (l'URL dello script va in `config.js`). La timeline invece e' completamente autonoma e non richiede nessuna configurazione esterna.

## 5. Nota sulla Timeline

`timeline.html` salva i dati (progetti e fasi) nel browser di chi la usa (localStorage): se apri la pagina da un altro dispositivo o browser, non vedrai gli stessi dati automaticamente. Per portare i dati da un dispositivo all'altro, usa i pulsanti **Esporta** / **Importa** in alto (creano/leggono un file `.json`), oppure il pulsante **FILE LOCALE**, che su Chrome/Edge collega un file `.json` sul tuo computer sempre aggiornato automaticamente.

Se in futuro vuoi che la timeline sia condivisa tra piu' persone/dispositivi (dati centralizzati, come per commenti e voti), serve collegarla a un backend esterno (es. lo stesso Google Sheets, oppure un piccolo database) — fammi sapere se vuoi che te lo prepari.
