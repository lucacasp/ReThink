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
      "Authorization": `Bearer ${TOKEN}`, // Includo il token di autorizzazione nell'header
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
  immagineProdotto.className = "card-img-top"; // Aggiungo la classe per lo stile Bootstrap
  // Imposto l'URL dell'immagine del prodotto come attributo src dell'elemento immagine
  immagineProdotto.src = prodotto.imageUrl; // Assicurati che l'URL sia corretto e contenga l'indirizzo completo dell'immagine
  const nomeProdotto = document.createElement("h3");
  const marcaProdotto = document.createElement("p");
  const descrizioneProdotto = document.createElement("p");
  const prezzoProdotto = document.createElement("p");
  //voglio creare due button all'interno della card
  // bottone modifica
  const buttonModifica = document.createElement("div"); // creo elemento div -----TODO
  buttonModifica.classList.add("editButton"); // aggiungo classe css
  buttonModifica.textContent = "Modifica"; // imposto il testo nel btn 
/*   buttonModifica.onclick = () => editProduct(prodotto._id, card); // aggiungo l'event listener per modificare il prodotto
 */  //bottone elimina
  const buttonElimina = document.createElement("button"); //creo elemento div 
  buttonElimina.classList.add("delete"); // aggiungo la classe css
  buttonElimina.textContent = "Elimina"; // imposto il testo nel btn
  buttonElimina.onclick = () => deleteProduct(prodotto._id, card); // aggiungo l'event listener per eliminare il prodotto
  buttonModifica.onclick = () => openEditModal(prodotto); // aggiungo l'event listener per modificare il prodotto
  
  // imposto i valori dei tag creati
  immagineProdotto.innerText = prodotto.imageUrl;
  nomeProdotto.innerText = prodotto.name;
  marcaProdotto.innerText = prodotto.brand;
  descrizioneProdotto.innerText = prodotto.description;
  prezzoProdotto.innerText = prodotto.price;
  buttonModifica.innerHTML = "Modifica";
  buttonElimina.innerHTML = "Elimina";

// aggiungo gli elementi alla scheda prodotto
  card.appendChild(immagineProdotto);
  card.appendChild(nomeProdotto);
  card.appendChild(marcaProdotto);
  card.appendChild(prezzoProdotto);
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
// Funzione per eliminare un prodotto
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

// Funzione per modificare un prodotto
const editProduct = async (id, name, brand, price, imageUrl, description) => {
  const updatedItem = {
    name: name,
    brand: brand,
    price: price,
    imageUrl: imageUrl,
    description: description,
  };

  try {
    const response = await fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(updatedItem),
    });

    if (response.ok) {
      // Se la modifica va a buon fine, aggiorna la card del prodotto
      const updatedProduct = await response.json();
      updateProductCard(id, updatedProduct);
      alert('Prodotto modificato con successo!');
      location.reload();
    } else {
      console.error('Errore durante la modifica del prodotto:', response.statusText);
    }
  } catch (error) {
    console.error('Errore durante la modifica del prodotto:', error);
  }
};

// Funzione per aggiornare i dettagli di una card prodotto dopo la modifica
const updateProductCard = (id, updatedProduct) => {
  const card = document.querySelector(`#container-cards .card[data-id="${id}"]`);
  if (card) {
    card.querySelector('.card-img-top').src = updatedProduct.imageUrl;
    card.querySelector('h3').innerText = updatedProduct.name;
    card.querySelector('p:nth-of-type(1)').innerText = updatedProduct.brand;
    card.querySelector('p:nth-of-type(2)').innerText = updatedProduct.description;
    card.querySelector('p:nth-of-type(3)').innerText = updatedProduct.price;
  }
};

// Funzione per gestire l'apertura del modal di modifica
const openEditModal = (prodottoData) => {
  prodotto = prodottoData;
  document.getElementById("edit-name").value = prodotto.name;
  document.getElementById("edit-brand").value = prodotto.brand;
  document.getElementById("edit-price").value = prodotto.price;
  document.getElementById("edit-image").value = prodotto.imageUrl;
  document.getElementById("edit-description").value = prodotto.description;
  // Mostra il modal
  var myModal = new bootstrap.Modal(document.getElementById('editModal'), {
    keyboard: false
  });
  myModal.show();
}

// Aggiungi un event listener per il submit del form di modifica
document.getElementById("editForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita il comportamento di default del submit
  if(!prodotto){
    console.log("Variabile prodotto non definita");
    return;
  }
  const id = prodotto._id; // ID del prodotto da modificare
  const name = document.getElementById("edit-name").value;
  const brand = document.getElementById("edit-brand").value;
  const price = document.getElementById("edit-price").value;
  const imageUrl = document.getElementById("edit-image").value;
  const description = document.getElementById("edit-description").value;

  // Chiudi il modal
  var myModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
  myModal.hide();

  // Chiamata alla funzione editProduct per modificare il prodotto
  await editProduct(id, name, brand, price, imageUrl, description);
});




