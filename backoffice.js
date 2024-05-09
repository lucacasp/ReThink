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
      "Authorization": `Bearer ${TOKEN}`, // Includo il token di autorizzazione nell'header
    },
    body:JSON.stringify(newItem), // Converto l'oggetto in JSON
  })
  // Se la richiesta ha successo, ricarico la pagina
  if (response.ok) {
    alert("Caricato!");
  } else {
    // Se la richiesta fallisce, genero un errore con il messaggio di stato della risposta
    alert("C'è qualcosa che non va, prova di nuovo, errore " + response.status)
  }
}

// Aggiungo un event listener al pulsante di invio del form per chiamare la funzione createItem()
document.getElementById("submitBtn").addEventListener("click", createItem)












/* const addItem = async () => {
  // Aggiungo un prodotto
  let res = await fetch(URL, {
    method: "GET", // Utilizzo il metodo GET
    headers: {
      "Content-Type": "application/json", // Definisco il tipo di contenuto come JSON
      Authorization: `Bearer ${TOKEN}`, // Includo il token di autorizzazione nell'header
    }
  })

} */



















/* const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/"

let param = new URLSearchParams(window.location.search)
let id = param.get("id")
window.onload = async () => {
  if (id) {
    const res = await fetch(BASE_URL + id, {
      headers: {
        authorization:
          "Bearer ",
      },
    })
    const product = await res.json()
    document.querySelector("#name").value = product.name
    document.querySelector("#description").value = product.description
    document.querySelector("#imageUrl").value = product.imageUrl
    document.querySelector("#brand").value = product.brand
    document.querySelector("#price").value = product.price
    document.querySelector(".btn-success").remove()
  } else {
    document.querySelector(".btn-danger").remove()
    document.querySelector(".btn-secondary").remove()
  }
}

const createNew = async () => {
  const product = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  }
  let res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization:
        "Bearer ",
    },
    body: JSON.stringify(product),
  })
  if (res.ok) {
    alert("Product created")
  }
}

const editProduct = async () => {
  const product = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  }
  let res = await fetch(BASE_URL + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM3Zjc1YWM1Y2I2MjAwMTQzMDQ2MzgiLCJpYXQiOjE2ODEzODk0MDMsImV4cCI6MTY4MjU5OTAwM30.X8vcNHscCwbf38F9v8N9dADkt0E19x7HstOxfVfPIDg",
    },
    body: JSON.stringify(product),
  })
  if (res.ok) {
    alert("Product created")
  }
}

const deleteProduct = async () => {
  let res = await fetch(BASE_URL + id, {
    method: "DELETE",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM3Zjc1YWM1Y2I2MjAwMTQzMDQ2MzgiLCJpYXQiOjE2ODEzODk0MDMsImV4cCI6MTY4MjU5OTAwM30.X8vcNHscCwbf38F9v8N9dADkt0E19x7HstOxfVfPIDg",
    },
  })
  if (res.ok) {
    alert("Product deleted")
  }
}
 */