// fetch() è un metodo standard nelle ultime revisioni di JS che vi permette
// di effettuare una operazione di HTTP REQUEST (ovvero per contattare un server)

// il metodo fetch torna una Promise!

// come funziona?
// fetch accetta fino a DUE parametri (il primo è obbligatorio, il secondo è opzionale)
// 1) URL da contattare (stringa)
// 2) un oggetto di configurazione opzionale, che può contenere ad es. il metodo
// crud da utilizzare, eventuali headers per un'autenticazione, un eventuale body etc.

// RECAP DEI METODI HTTP:
// GET -> recupera dati (il metodo di default)
// POST -> crea una nuova risorsa
// PUT -> modifica una risorsa esistente
// DELETE -> elimina una risorsa esistente

const getRemoteUsers = function () {
  // dentro questa function instaureremo una REQUEST verso un server!
  // il metodo fetch() ritorna (se tutto va bene) la RESPONSE da parte del server
  // "circondata" da una Promise, ovvero un wrapper per un'operazione asincrona
  // che può essere attesa nei suoi due finali (resolved/rejected) tramite
  // i metodi .then() e .catch()
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      // scrivo qui il codice per quando la Promise finisce bene
      console.log('response', response)
      // per come è organizzata il metodo fetch, a seguito di un'operazione
      // fallita NON SEMPRE finirete nel catch! Il catch principalmente
      // è un calderone in cui finirete se NON RIUSCIRETE a contattare il server
      // (avete avuto dei problemi di rete)
      // ma se invece il server riuscite a contattarlo ma ottenete un errore
      // di tipo 400, 500 etc., NON finirete nel catch.
      // come fare quindi a capire se la response che avete ottenuto contiene
      // i dati che cercavate? tramite la proprietà "ok" della response stessa.
      if (response.ok) {
        // se finisco qui dentro vuol dire che NON solo ho ottenuto una response,
        // ma che quella response contiene quello che desideravo!
        console.log('FINIAMO QUI SE VA TUTTO BENE')
        // purtroppo nella response NON abbiamo accesso diretto al cosiddetto
        // "body", ovvero al JSON degli utenti!
        // come lo estraiamo dalla response?
        // tramite il metodo .json() invocabile sulla response
        return response.json() // per aspettare QUESTA Promise, metto un altro .then()
        // dopo!
      } else {
        // se finisco qui vuol dire che il server è stato raggiunto, ma che potrebbe
        // essere successa una di queste cose:
        // - 404 risorsa non trovata
        // - 401 non sei autorizzato a fare questa cosa
        // - 500 il server ha riscontrato un errore
        throw new Error('La risposta del server non era corretta')
      }
    })
    .then((usersList) => {
      console.log('FINITO! ECCO I DATI', usersList)
      // adesso con usersList manipoleremo il DOM
      // perchè QUI l'operazione è terminata!
      generateList(usersList)
    })
    .catch((error) => {
      // scrivo qui il codice per quando la Promise finisce male
      console.log('errore', error)
      // in particolare, nel catch finirete quasi esclusivamente per problemi di rete
    })
}

const generateList = function (arrayOfUsers) {
  console.log('ORA MANIPOLIAMO IL DOM')
  const listInThePage = document.getElementById('users-list')
  arrayOfUsers.forEach((user) => {
    const newLi = document.createElement('li') // <li></li>
    newLi.classList.add('list-group-item') // <li class="list-group-item"></li>
    newLi.innerText = user.name + ' ' + user.email + ' ' + user.phone
    listInThePage.appendChild(newLi)
  })
}

getRemoteUsers()
