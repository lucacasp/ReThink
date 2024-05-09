// Definizione dell'URL dell'API e del token di autenticazione
const url = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMjYyMjBiM2IyNTAwMTUxYjU0M2EiLCJpYXQiOjE3MTUyNTIyMzQsImV4cCI6MTcxNjQ2MTgzNH0.h_2_BEPFJe2GpPTcm4J2ewe9wwjgLlUqzetC1PbQemU"

// Funzione per creare un nuovo oggetto prodotto
const createItem = async () => {
  // Recupero i valori inseriti dall'utente nei campi del form
  const newItem = {
    name: document.querySelector("#name-item").value,
    brand: document.querySelector("#brand-item").value,
    price: document.querySelector("#price-item").value,
    imageUrl: document.querySelector("#image-item").value,
    description: document.querySelector("#description-item").value,
  }
  // funzione per bloccare il flusso se il form è incompleto
  if(Object.values(newItem).some(value => value === "")){
    console.log("Errore, uno dei valori inseriti non è stato compilato correttamente");
    return; // Esco dalla funzione 
  }
  /* console.log(newItem) */
  // Effettuo una richiesta POST per creare un nuovo prodotto
  let response = await fetch(url, {
    method: "POST", // Utilizzo il metodo POST
    headers: {
      "Content-Type": "application/json", // Definisco il tipo di contenuto come JSON
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMjYyMjBiM2IyNTAwMTUxYjU0M2EiLCJpYXQiOjE3MTUyNTIyMzQsImV4cCI6MTcxNjQ2MTgzNH0.h_2_BEPFJe2GpPTcm4J2ewe9wwjgLlUqzetC1PbQemU", // Includo il token di autorizzazione nell'header
    },
    body:JSON.stringify(newItem), // Converto l'oggetto in JSON
  })
  // Se la richiesta ha successo, ricarico la pagina
  .then((response) => response.json())
  .then((nuovoProdotto)=>{
    
    aggiungiCardProdotto(nuovoProdotto);
    console.log("Prodotto aggiunto con successo! ")
    clearForm();
  })
  .catch((error) => {
    console.error("Errore durante l'aggiunta del prodotto: ", error);
  })
}
// funzione per aggiungere una card al div resultCard
function aggiungiCardProdotto(prodotto) { // passo l'oggetto prodotto
  const card = document.createElement("div"); // Creo una nuova card
  card.className = "product-card"; // Aggiungo la classe CSS

  // creo tag per il nome del prodotto, la marca, il prezzo e l'immagine
  const nomeProdotto = document.createElement("h3", prodotto.name);
  const marcaProdotto = document.createElement("p", prodotto.brand);
  const prezzoProdotto = document.createElement("p", prodotto.price);
  const immagineProdotto = document.createElement("img", prodotto.imageUrl);

// aggiungo gli elementi alla scheda prodotto
  card.appendChild(nomeProdotto);
  card.appendChild(marcaProdotto);
  card.appendChild(prezzoProdotto);
  card.appendChild(immagineProdotto);


}
// funzione per pulire i campi del form di inserimento
const clearForm = () => {
  document.querySelector("#name-item").value = "";
  document.querySelector("#brand-item").value = "";
  document.querySelector("#price-item").value = "";
  document.querySelector("#image-item").value = "";
  document.querySelector("#description-item").value = "";
}


// Aggiungo un event listener al pulsante di invio del form per chiamare la funzione createItem()

document.getElementById("submitBtn").addEventListener("click", createItem)
// funzione per ottenere i prodotti
const ottieniProdotti = async () => {
  // Recupero i valori inseriti dall'utente nei campi del form
  // Effettuo una richiesta POST per creare un nuovo prodotto
  let response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${TOKEN}`, // Includo il token di autorizzazione nell'header
    } 
  })
    .then((response) => response.json()) // Converto la risposta del server in JSON
    .then((prodotto) => {
      // Itero attraverso la lista di prodotti restituiti e aggiunge una scheda per ciascuno
      prodotto.forEach((prodotto) => aggiungiCardProdotto(prodotto));
    })
    .catch((error) => console.error("Errore:", error));
}
// chiamo la funzione per ottenere i prodotti
ottieniProdotti();