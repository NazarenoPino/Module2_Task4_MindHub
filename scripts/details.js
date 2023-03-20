let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
let arrayDetails = [];
async function getAPI() {
    try {
        let respuesta = await fetch(urlAPI);
        let dataAPI = await respuesta.json();
        arrayDetails = dataAPI.events;
        /* for (const event of dataAPI.events) {
            data.push(event)
        } */
        pintarTarjetasDetails(arrayDetails)
    } catch (e) {
        console.log(e.message);
    }
}
getAPI();

function pintarTarjetasDetails(arrayDatos) {
let query = location.search;
let params = new URLSearchParams(query);
console.log(params);

let idParams = params.get("id");
console.log(idParams);

let profile = arrayDetails.find(x => x._id == idParams);
console.log(profile);

const contenedor = document.getElementById("contenedor-Card-Details");
let insertarCard = ``;

insertarCard += `
<div class="col-3">
    <div class="card" style="width: 18rem;">
        <img src="${profile.image}" class="card-img-top" alt="${profile.category}">
    </div> 
    <div class="card-body">
        <h5 class="card-title">${profile.name}</h5>
        <p class="card-text">Place: ${profile.place}</p>
    </div>
    <div class="card-footer border-0">
        <div class="d-flex justify-content-between">
            <p>Capacity: ${profile.capacity}</p>
        </div>
    </div>
</div>
`
contenedor.innerHTML = insertarCard;
}
