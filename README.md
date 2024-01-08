# Progetto Esame Sviluppo Applicazioni Web - "Your Movie Lib"

*Your Movie Lib* è una web app a tema cinematografico che consente di cercare e visualizzare
informazioni su film, serie tv e persone del settore. L'app ha anche una funzione di blog, in
quanto disponendo di un account è possibile aggiungere un media ai preferiti e/o scrivere recensioni
per film, serie tv (nello specifico è possibile valutare non solo la serie nella sua interezza ma anche le
singole stagioni ed episodi che la compongono). Fra i media aggiunti ai preferiti è possibile specificare
la preferenza sulle notifiche, la quale indica la volontà dell'utente di ricevere notifiche quando una nuova recensione
su quel media è stata aggiunta oppure se una già esistente è stata aggiornata.

La web app è stata sviluppata in Vite.js + Vue.js utilizzando come linguaggi `HTML`, `CSS`, `Typescript` e `Javascript`.

Le librerie utilizzate sono `Tailwind CSS`, le librerie ufficiali di `Vue.js` (`Vue Router` e `Pinia` per lo store), e
`Vite PWA`.

Le **API** utilizzate sono quelle di [TMDB](https://developer.themoviedb.org/docs/getting-started) per la visualizzazione dei media
e quelle di `Firebase` per gestire l'autenticazione degli utenti, per memorizzare i lori dati tramite `Firestore` e per l'invio
delle notifiche tramite `Firebase Cloud Messaging`.

## PWA e Notifiche

L'app è installabile PWA ed funzionante offline, utilizzando le cache per memorizzare le risposte fornite da `TMDB` e da `Firebase`.
Le funzionalità non disponibili offline sono la ricerca di nuovi titoli/persone, la modifica del profilo, il recupero della password, la registrazione ed il login. In questo caso viene visualizzata una pagina di fallback.

Un utente loggato, quando è offline, può visualizzare i propri preferiti e il proprio diario (se le informazioni sono in cache), può
aggiungere/rimuovere un media ai preferiti e può modificare/aggiungere una recensione ad un media che si trova in cache.

Un utente non loggato, quando è offline, ha la possibilità di vedere i media nella *Home* e di visualizzare le recensioni (se presenti in cache) di questi media.

L'unica limitazione offline è che quando viene modificata/aggiunta una nuova recensione gli utenti sottoscritti a quel media
non saranno notificati.

## Link

https://yourmovielib.netlify.app

## Esecuzione dell'app in locale

```sh
npm install
```

```sh
npm run build
```

```sh
npm run preview
```