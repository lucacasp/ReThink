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
  // Se la richiesta ha successo, ricarico la pagina
  if (response.ok) {
    alert("Caricato!");
    clearForm();
    /* window.location.reload(); */
  } else {
    /* console.log(response) */
    // Se la richiesta fallisce, genero un errore con il messaggio di stato della risposta
    alert("C'è qualcosa che non va, prova di nuovo, errore " + response.status)
  }
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

const getProducts = async () => {
  // Recupero i valori inseriti dall'utente nei campi del form
  // Effettuo una richiesta POST per creare un nuovo prodotto
  let response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${TOKEN}`, // Includo il token di autorizzazione nell'header
    } 
  });
  const items = await response.json();

  console.log(items);

}
getProducts();
