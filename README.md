# Cabinet Avocat Andreea-Lavinia Mesaroș-Tomoiagă

Site de prezentare de tip one-page, construit în HTML, CSS și JavaScript simplu, fără dependențe și fără pas de build.

## Structură

```
index.html                          Pagina principală (Hero, Încredere, Despre, Expertiză, FAQ, Contact)
politica-de-confidentialitate.html  GDPR
termeni-si-conditii.html
politica-cookies.html
assets/css/style.css                Stiluri (paleta Charcoal / Alb perlat / Burgundy)
assets/js/main.js                   Meniu, FAQ, formular, hartă, ani de experiență
assets/vcard/…vcf                   V-Card descărcabil
```

## Rulare locală

Deschideți `index.html` în browser sau porniți un server static:

```
python3 -m http.server 8000
```

## De completat înainte de publicare

- **Adresa de e-mail**: completați `CONFIG.email` din `assets/js/main.js`. Adresa apare automat în secțiunea Contact și în footer, iar formularul va trimite mesajele pe e-mail. Adăugați-o și în V-Card (`EMAIL;TYPE=WORK:…`). Fără e-mail, formularul deschide aplicația de SMS pe telefon sau îndeamnă vizitatorul să sune.
- **Numărul străzii**: site-ul folosește *Str. Corneliu Coposu nr. 2* (conform Baroului), iar Google Maps afișează *nr. 4*. Verificați și unificați.
- **Domenii de practică**: asistența la Poliție, Parchet și Judecătorie e confirmată din sursele publice. *Drept civil*, *Dreptul familiei* și *Consultanță* trebuie confirmate de avocat.
- **Link Baroul Maramureș**: momentan trimite la `unbr.ro`. Înlocuiți-l cu site-ul oficial al Baroului, dacă există.
- **Fotografie profesională** (opțional): poate înlocui monograma „MT” din secțiunea Despre Mine.

Anii de experiență și anul din copyright se actualizează automat.
