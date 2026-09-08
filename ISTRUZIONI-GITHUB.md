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

## 4. Collega commenti, voti E la timeline allo stesso Google Sheet

Adesso `commenti.html`, `voto.html` **e** `timeline.html` usano tutti lo stesso backend (un unico Google Apps Script + lo stesso Google Sheet), quindi la configurazione e' unica per tutti e tre:

1. Se non l'hai gia' fatto, crea un Google Sheet e vai su **Estensioni > Apps Script**.
2. Incolla il contenuto di `apps-script.gs` (sostituisce quello vecchio se ne avevi gia' uno).
3. Clicca **Distribuisci > Nuova distribuzione** (o, se avevi gia' un URL da mantenere, **Gestisci distribuzioni > icona matita > Versione: Nuova > Distribuisci**), tipo "App web", accesso "Chiunque".
4. Copia l'URL del Web App e incollalo in `config.js` come `SCRIPT_URL` (se lo avevi gia' configurato per commenti/voti, e' lo stesso URL: basta aver ripubblicato con il codice aggiornato).
5. Fai commit + push di `config.js` e `apps-script.gs`.

Cosi' facendo la timeline creera' automaticamente un terzo foglio chiamato **"TimelineData"** dentro il tuo Google Sheet (oltre a "Commenti" e "Voti" gia' esistenti), dove tiene i dati di progetti e fasi in formato JSON.

## 5. Come funziona la sincronizzazione della Timeline

- **Chiunque visiti il sito puo' modificare la timeline** (creare/spostare/eliminare fasi e progetti): non c'e' una password, come richiesto.
- Ogni modifica viene inviata subito al Google Sheet condiviso, e ogni ~12 secondi la pagina ricontrolla se ci sono aggiornamenti fatti da altri, cosi' tutti vedono (quasi) la stessa cosa in tempo reale.
- L'indicatore in alto a destra (pallino + orario) mostra lo stato: **ciano** = sincronizzato, **viola lampeggiante** = sincronizzazione in corso, **rosso** = problema di connessione. Cliccandolo forzi un aggiornamento immediato.
- Dato che non c'e' protezione, se due persone modificano la stessa cosa nello stesso istante vince l'ultima modifica salvata (non c'e' un merge intelligente). Per un piccolo team studentesco di solito non e' un problema, ma tienilo a mente.
- Se il backend non e' raggiungibile (es. sei offline), la pagina mostra l'ultima copia salvata nel browser e riprova automaticamente; i pulsanti **Esporta / Importa JSON** e **FILE LOCALE** restano comunque disponibili come backup manuale.
- Se `config.js` non ha un `SCRIPT_URL` valido, la timeline funziona comunque ma resta locale al singolo browser (nessuna condivisione), e te lo segnala nell'indicatore in alto ("backend non configurato").
