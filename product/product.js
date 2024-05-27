const url = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMjYyMjBiM2IyNTAwMTUxYjU0M2EiLCJpYXQiOjE3MTY4MjA5NTQsImV4cCI6MTcxODAzMDU1NH0.QkB9Ts69bSSgRMqmJOvb7SXtRPuNeLF_ssS5wVV6cwo"

//Funzione che viene eseguita quando la finestra è completamente caricata
window.onload = async () => {
    // estrai l'id dal permalink
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    // Definizione della costante url che contiene l'endpoint dell'API per i prodotti
    const url = 'https://striveschool-api.herokuapp.com/api/product/' +id;

    // Definizione della costante token contenente la chiave di autorizzazione per l'API
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMjYyMjBiM2IyNTAwMTUxYjU0M2EiLCJpYXQiOjE3MTY4MjA5NTQsImV4cCI6MTcxODAzMDU1NH0.QkB9Ts69bSSgRMqmJOvb7SXtRPuNeLF_ssS5wVV6cwo";

    const ottieniProdotti = async () => {
        // Chiamata all'API per ottenere i prodotti
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        // Converte la risposta in formato JSON
        const products = await res.json();

        // Selezione del contenitore dei prodotti
        const productsContainer = document.getElementById("product-details");

            // Popola il contenitore con le card dei prodotti
            productsContainer.innerHTML = `
                <div class="card-header">
                    <img class="img-detail" src="${products.imageUrl}" >
                </div>
                    <div class="card-body text-center mt-5">
                        <h1>${products.brand}</h1>
                        <h2>${products.name}</h2> 
                        <h6>${products.description}</h6>
                        <small>€ ${products.price}</small>
                    </div>
                </div>
                  `
    };

    ottieniProdotti();
}
