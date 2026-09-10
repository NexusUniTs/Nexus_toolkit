# Sondaggio su GitHub Pages + Google Sheets — istruzioni

## Struttura del sito
- `index.html` — pagina iniziale NEXUS con due bottoni
- `commenti.html` — form per lasciare un commento
- `voto.html` — bottoni per votare, letti da `opzioni-voto.js`
- `style.css` — stile condiviso da tutte le pagine
- `config.js` — flag apertura/chiusura + URL dello script Google
- `opzioni-voto.js` — lista delle opzioni votabili, modifica questa per aggiungerne/toglierne
- `apps-script.gs` — NON va su GitHub, va incollato nell'editor di Google Apps Script (vedi sotto)

## 1. Crea il Google Sheet e lo script
1. Vai su https://sheets.google.com e crea un nuovo foglio.
2. Menu **Estensioni → Apps Script**.
3. Cancella il codice di esempio e incolla tutto il contenuto di `apps-script.gs`.
4. Salva (Cmd+S).

## 2. Pubblica lo script come Web App
1. **Distribuisci → Nuova distribuzione** → icona ingranaggio → **App web**.
2. Esegui come: **Io**. Chi ha accesso: **Chiunque**.
3. **Distribuisci**, autorizza i permessi richiesti.
4. Copia l'URL che finisce con `/exec`.

Se in futuro modifichi `apps-script.gs`, ricordati che serve **una nuova
versione della distribuzione** (Distribuisci → Gestisci distribuzioni →
matita → Nuova versione → Distribuisci) — l'URL resta lo stesso, ma il
codice pubblicato non si aggiorna da solo.

## 3. Collega l'URL al sito
Apri `config.js`, sostituisci `INCOLLA_QUI_URL_APPS_SCRIPT` con l'URL copiato,
salva.

## 4. Modifica le opzioni di voto
Apri `opzioni-voto.js` e modifica la lista `OPZIONI_VOTO`: ogni opzione e'
un blocco `{ titolo: "...", progetto: "..." }` (il "progetto" e' il
sottotitolo mostrato sotto al titolo, es. l'esempio concreto di quella
proposta). L'ordine nel file non conta: la pagina mescola le opzioni ad
ogni visita e le persone le riordinano trascinandole dalla piu' gradita
alla meno gradita.

## 5. Pubblica su GitHub Pages
1. Crea un repository pubblico su GitHub (o usa quello che hai già).
2. Carica **tutti i file tranne `apps-script.gs`**: `index.html`,
   `commenti.html`, `voto.html`, `style.css`, `config.js`, `opzioni-voto.js`.
3. Settings → Pages → Source: branch `main`, cartella `/ (root)`.
4. Attendi un minuto, poi apri l'URL pubblico mostrato da GitHub.

## 6. Apri/chiudi la raccolta
Cambia `RACCOLTA_APERTA` in `config.js` tra `true` e `false` — vale sia per
i commenti che per il voto — salva, commit, push.

## 7. Guardare/scaricare i dati
Nel Google Sheet troverai due fogli separati: **Commenti** e **Voti**,
creati automaticamente al primo invio di ciascun tipo.
Per scaricare come Excel: **File → Scarica → Microsoft Excel (.xlsx)**.

## Nota sul limite di `no-cors`
Il sito manda i dati con `mode: "no-cors"`, quindi non può leggere la
risposta di Google — mostra "Grazie" appena l'invio parte, senza conferma
reale di arrivo. È comunque affidabile; se vuoi essere sicura, fai un invio
di prova prima dell'evento e controlla che compaia nel foglio giusto.
