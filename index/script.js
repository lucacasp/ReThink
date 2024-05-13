// Definizione dell'URL dell'API e del token di autenticazione
const url = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMjYyMjBiM2IyNTAwMTUxYjU0M2EiLCJpYXQiOjE3MTUyNTIyMzQsImV4cCI6MTcxNjQ2MTgzNH0.h_2_BEPFJe2GpPTcm4J2ewe9wwjgLlUqzetC1PbQemU"

document.addEventListener("DOMContentLoaded", function(){
const ottieniProdotti = async () => {
    // Recupero i valori inseriti dall'utente nei campi del form
    // Effettuo una richiesta POST per creare un nuovo prodotto
    let response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${TOKEN}`, // Includo il token di autorizzazione nell'header
      } 
    })
      .then((response) => response.json()) // Converto la risposta del server in JSON
      .then((prodotti) => {
        // Itero attraverso la lista di prodotti restituiti e aggiunge una scheda per ciascuno
        prodotti.forEach((prodotto) => aggiungiCardProdotto(prodotto));
      })
      .catch((error) => console.error("Errore:", error));
  }
  // chiamo la funzione per ottenere i prodotti
  ottieniProdotti();

const cardContainer = document.getElementById("container-cards")

// Funzione per aggiungere una card al div product-card
// Mi copio lo stesso script del backoffice
function aggiungiCardProdotto(prodotto) {
  const card = document.createElement("div"); // Creo una nuova card
  card.className = "card mb-3"; // Aggiungo la classe CSS alla card
  // creo tag per il nome del prodotto, la marca, il prezzo e l'immagine
  const immagineProdotto = document.createElement("img");
  immagineProdotto.className = "card-img-top"; // Aggiungo la classe per lo stile Bootstrap
  // Imposto l'URL dell'immagine del prodotto come attributo src dell'elemento immagine
  immagineProdotto.src = prodotto.imageUrl; // Assicurati che l'URL sia corretto e contenga l'indirizzo completo dell'immagine
  immagineProdotto.alt = prodotto.name; // Imposta l'attributo alt con il nome del prodotto
  // creo un div card-body per contenere i tag creati in stile Bootstrap
  const nomeProdotto = document.createElement("h5");
  nomeProdotto.className = "card-title";
  nomeProdotto.textContent = prodotto.name;
  
  const marcaProdotto = document.createElement("p");
  marcaProdotto.className = "card-text";
  marcaProdotto.textContent = prodotto.brand;

  const descrizioneProdotto = document.createElement("p");
  descrizioneProdotto.className = "card-text";
  descrizioneProdotto.textContent = prodotto.description;

  const prezzoProdotto = document.createElement("p");
  prezzoProdotto.className = "card-text";
  prezzoProdotto.textContent = "€ " + prodotto.price;

// creo il button visualizza
  const buttonVisualizza = document.createElement("button");
  buttonVisualizza.className = "btn btn-dark";
  buttonVisualizza.textContent = "Visualizza";
  buttonVisualizza.addEventListener("click", function(){
    const productId = prodotto._id; // ottengo l'id del prodotto
    const productPageUrl = `/product/product.html?id=${productId}`; // imposto l'url della pagina del prodotto
    window.location.href = productPageUrl;
  })
  
  // aggiungo gli elementi alla scheda prodotto
  card.appendChild(immagineProdotto);
  card.appendChild(nomeProdotto);
  card.appendChild(marcaProdotto);
  card.appendChild(prezzoProdotto);
  card.appendChild(descrizioneProdotto);
  card.appendChild(buttonVisualizza);


  cardContainer.appendChild(card);

  cardContainer.addEventListener('click', function(event){
  if(event.target.classlist.contains('visualizza-btn')){
    const productId = event.target.dataset.id;
    window.location.href = `/product/product.html?id=${productId}`;
  }
})
}
 // fine funzione
})
