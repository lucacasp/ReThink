// Definizione dell'URL dell'API e del token di autenticazione
const url = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMjYyMjBiM2IyNTAwMTUxYjU0M2EiLCJpYXQiOjE3MTUyNTIyMzQsImV4cCI6MTcxNjQ2MTgzNH0.h_2_BEPFJe2GpPTcm4J2ewe9wwjgLlUqzetC1PbQemU"

document.addEventListener("DOMContentLoaded", function(){
/* ----------------------------------------------------------------------------- GET */

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

/* ----------------------------------------------------------------------------- POST */
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
  if(Object.values(newItem).some(value => value === "")){ // se uno dei valori è vuoto
    console.log("Errore, uno dei valori inseriti non è stato compilato correttamente");
    return; // Esco dalla funzione 
  }
  console.log(newItem)
  // Effettuo una richiesta POST per creare un nuovo prodotto
  let response = await fetch(url, {
    method: "POST", // Utilizzo il metodo POST
    headers: {
      "Content-Type": "application/json", // Definisco il tipo di contenuto come JSON
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMjYyMjBiM2IyNTAwMTUxYjU0M2EiLCJpYXQiOjE3MTUyNTIyMzQsImV4cCI6MTcxNjQ2MTgzNH0.h_2_BEPFJe2GpPTcm4J2ewe9wwjgLlUqzetC1PbQemU", // Includo il token di autorizzazione nell'header
    },
    body:JSON.stringify(newItem), // Converto l'oggetto in JSON
  })
  .then((response) => response.json())
  .then((nuovoProdotto)=>{
    aggiungiCardProdotto(nuovoProdotto);
    console.log("Prodotto aggiunto con successo! ")
    alert("Prodotto aggiunto con successo! "); // messaggio di conferma
    clearForm(); // pulisco il form di inserimento
  })
  .catch((error) => {
    console.error("Errore durante l'aggiunta del prodotto: ", error);
  })
}
const cardContainer = document.getElementById("container-cards")
// funzione per aggiungere una card al div product-card
function aggiungiCardProdotto(prodotto) { // passo l'oggetto prodotto
  const card = document.createElement("div"); // Creo una nuova card
  card.className = "card"; // Aggiungo la classe CSS alla card
  // creo tag per il nome del prodotto, la marca, il prezzo e l'immagine
  const immagineProdotto = document.createElement("img");
  const nomeProdotto = document.createElement("h3");
  const marcaProdotto = document.createElement("p");
  const descrizioneProdotto = document.createElement("p");
  const prezzoProdotto = document.createElement("p");
  //voglio creare due button all'interno della card
  // bottone modifica
  const buttonModifica = document.createElement("div"); // creo elemento div -----TODO
  buttonModifica.classList.add("edit"); // aggiungo classe css
  buttonModifica.textContent = "Modifica"; // imposto il testo nel btn 
/*   buttonModifica.onclick = () => editProduct(prodotto._id, card); // aggiungo l'event listener per modificare il prodotto
 */  //bottone elimina
  const buttonElimina = document.createElement("button"); //creo elemento div 
  buttonElimina.classList.add("delete"); // aggiungo la classe css
  buttonElimina.textContent = "Elimina"; // imposto il testo nel btn
  buttonElimina.onclick = () => deleteProduct(prodotto._id, card); // aggiungo l'event listener per eliminare il prodotto
  
  // imposto i valori dei tag creati
  immagineProdotto.innerText = prodotto.imageUrl;
  nomeProdotto.innerText = prodotto.name;
  marcaProdotto.innerText = prodotto.brand;
  descrizioneProdotto.innerText = prodotto.description;
  prezzoProdotto.innerText = prodotto.price;
  buttonModifica.innerHTML = "Modifica";
  buttonElimina.innerHTML = "Elimina";


// aggiungo gli elementi alla scheda prodotto
  card.appendChild(nomeProdotto);
  card.appendChild(marcaProdotto);
  card.appendChild(prezzoProdotto);
  card.appendChild(immagineProdotto);
  card.appendChild(descrizioneProdotto);
  card.appendChild(buttonModifica);
  card.appendChild(buttonElimina);

  cardContainer.appendChild(card) ;
}
// funzione per pulire i campi del form di inserimento
const clearForm = () => {
  document.querySelector("#name-item").value = "";
  document.querySelector("#brand-item").value = "";
  document.querySelector("#price-item").value = "";
  document.querySelector("#image-item").value = "";
  document.querySelector("#description-item").value = "";
}

//Aggiungo un event listener al pulsante di invio del form per chiamare la funzione createItem()
document.getElementById("submitBtn").addEventListener("click", createItem)
// funzione per eliminare prodotto da backoffice
/* function cancellaProdotto (prodottoId, card) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/"${prodottoId}`,{
    method: "DELETE", // metodo HTTP DELETE per eliminare risorse
    headers: {
      Authorization: `Bearer ${TOKEN}`, // Includo il token di autorizzazione nell'header
    } 
})
  .then(()=> {
    console.log("Utente eliminato");
    card.remove();
  })
  .catch((error)=>{
    console.log("Errore durante l'eliminazione del prodotto: ", error);
    // gestione dell'errore, errore in console
  })
  ottieniProdotti();
}  */

/// Funzione per eliminare un prodotto
const deleteProduct = async (id, card) => {
  // Effettuo la chimata HTTP passando anche come parametro l'ID
  const res = await fetch(url + id, {
    method: "DELETE", // Utilizzo il metodo DELETE per rimuovere l'elemento 
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  });
  // Se la risposta va a buon fine esegue queste operazioni
  if (res.ok) {
    // Mostra un messaggio di conferma
    alert('Prodotto eliminato con successo!');
    card.remove();
  } else {
    console.error("Errore nell'eliminazione del prodotto");
  }
}
})
/* 
// Funzione modifica prodotto 
const getProductForm = async (idInInput) => {
  const id = idInInput || paramId;
  if(id){
    const response = await fetch (url + id);
    const prodotto = await response.json();
    // aggiorno i valori inseriti nel form con i dati dell'utente
    document.getElementById("name-item").value = prodotto.name;
    document.getElementById("brand-item").value = prodotto.brand;
    document.getElementById("price-item").value = prodotto.price;
    document.getElementById("image-item").value = prodotto.imageUrl;
    document.getElementById("description-item").value = prodotto.description;
  }
}

const editProduct = async () => {
  const id = document.querySelector("#id-item").value;
  const name = document.querySelector("#name-item").value;
  const brand = document.querySelector("#brand-item").value;
  const price = document.querySelector("#price-item").value;
  const imageUrl = document.querySelector("#image-item").value;
  const description = document.querySelector("#description-item").value;
  const updatedProduct = {
    name,
    brand,
    price,
    imageUrl,
    description
  };
  const response = await fetch(url + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`
    },
    body: JSON.stringify(updatedProduct)
  });
  if (response.ok){
    alert("Prodotto aggiornato con successo!");
    //chiamo la funzione ottieniProdotti() per mostrare la lista aggiornata dei prodotti
    await ottieniProdotti();
  }
} */
// Funzione per aggiornare un prodotto


/* 
const editProduct = async (id) => {
  if (id) {
      const response = await fetch(url + id, {
          headers: {
              "Authorization": `Bearer ${TOKEN}`
            }
      });
      const item = await response.json();

    // Assegna i valori dell'item agli input
    document.getElementById("name-item").value = prodotto.name;
    document.getElementById("brand-item").value = prodotto.brand;
    document.getElementById("price-item").value = prodotto.price;
    document.getElementById("image-item").value = prodotto.imageUrl;
    document.getElementById("description-item").value = prodotto.description;
  }
};


const updateProduct = async (id) => {
  const name = document.querySelector('.name-item').value;
  const brand = document.querySelector('.brand-item').value;
  const price = document.querySelector('.price-item').value;
  const imageUrl = document.querySelector('.img-item').value;
  const description = document.querySelector('.description-item').value;

  const updatedItem = { name, brand, price, imageUrl, description };

  const response = await fetch(url + id, {
      method: "PUT",
      headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedItem)
  });

  if (response.ok) {
      alert('Elemento aggiornato con successo');
      // Ricarica la pagina per visualizzare gli aggiornamenti
      window.location.reload();
  } else {
      throw new Error('Error: ' + errore);
  }
}; */