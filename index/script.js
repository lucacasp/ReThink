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
})

const cardContainer = document.getElementById("container-cards")

function aggiungiCardProdotto(prodotto) { // passo l'oggetto prodotto
    const card = document.createElement("div"); // Creo una nuova card
    card.className = "card"; // Aggiungo la classe CSS alla card
    // creo tag per il nome del prodotto, la marca, il prezzo e l'immagine
    const immagineProdotto = document.createElement("img");
    immagineProdotto.className = "card-img-top"; // Aggiungo la classe per lo stile Bootstrap
  // Imposto l'URL dell'immagine del prodotto come attributo src dell'elemento immagine
    immagineProdotto.src = prodotto.imageUrl; // Assicurati che l'URL sia corretto e contenga l'indirizzo completo dell'immagine
    const nomeProdotto = document.createElement("h3");
    const marcaProdotto = document.createElement("p");
    const descrizioneProdotto = document.createElement("p");
    const prezzoProdotto = document.createElement("p");
    
    // imposto i valori dei tag creati
    immagineProdotto.innerText = prodotto.imageUrl;
    nomeProdotto.innerText = prodotto.name;
    marcaProdotto.innerText = prodotto.brand;
    descrizioneProdotto.innerText = prodotto.description;
    prezzoProdotto.innerText = prodotto.price;  
  
  // aggiungo gli elementi alla scheda prodotto
  card.appendChild(immagineProdotto);
  card.appendChild(nomeProdotto);
  card.appendChild(marcaProdotto);
  card.appendChild(prezzoProdotto);
  card.appendChild(descrizioneProdotto);
  
    cardContainer.appendChild(card) ;
  }

