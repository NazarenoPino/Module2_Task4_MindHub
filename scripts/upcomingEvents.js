let arrayUpcomingEvents = [];
let fecha;
let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
async function getAPI() {
    try {
        let respuesta = await fetch(urlAPI);
        let dataAPI = await respuesta.json();
        fecha = dataAPI.currentDate;
        /* for (const event of dataAPI.events) {
            data.push(event)
        } */
        arrayUpcomingEvents = dataAPI.events.filter(event => event.date > fecha)

        pintarTarjetas(arrayUpcomingEvents)
        crearCheckboxes(arrayUpcomingEvents);
        superFiltro();
    } catch (e) {
        console.log(e.message);
    }
}
getAPI();


// arrayUpcomingEvents = data.filter(event => event.date > fecha)

/* let sectionCardsUpcomingEvents = ``; */

let tagToUpdate = document.getElementById("sectionCardsUpcomingEvents");

/* for (let i = 0; i < arrayUpcomingEvents.length; i++) {
    sectionCardsUpcomingEvents += `
    <div class="col-3">
        <div class="card" style="width: 18rem;">
            <img src="${arrayUpcomingEvents[i].image}" class="card-img-top" alt="${arrayUpcomingEvents[i].category}">
        </div> 
        <div class="card-body">
            <h5 class="card-title">${arrayUpcomingEvents[i].name}</h5>
            <p class="card-text">${arrayUpcomingEvents[i].description}</p>
        </div>
        <div class="card-footer border-0">
            <div class="d-flex justify-content-between">
                <p>Price: $${arrayUpcomingEvents[i].price}</p>
                <a class="btn btn-info" href="./details.html">More Info</a>
            </div>
        </div>
    </div>
    `
} */
function pintarTarjetas(arrayDatos) {
    if (arrayDatos == 0) {
        tagToUpdate.innerHTML = `<h2 class= "display-1 fw-bolder">No se ha encontrado ningun elemento!</h2>`
        return
    }
    let tarjetas = "";
    arrayDatos.forEach((element) => {
        /* tarjetas += `
        <div class="col-3">
            <div class="card" style="width: 18rem;">
                <img src="${element.image}" class="card-img-top" alt="${element.category}">
            </div> 
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
            </div>
            <div class="card-footer border-0">
                <div class="d-flex justify-content-between">
                    <p>Price: $${element.price}</p>
                    <a class="btn btn-info" href="./details.html?id=${element._id}">More Info</a>
                </div>
            </div>
        </div>
        `; */
        tarjetas += `
        <div class="col-3" style="">
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top h-50" alt="">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                </div>
                <div class="card-footer">
                    <div class="container text-center">
                        <div class="row">   
                            <div class="col">
                                <p class="text-bg-info fs-5 text-center">Price: $${element.price}</p>
                            </div>
                            <div class="col">
                            </div>
                            <div class="col">
                                <a class="btn btn-info" href="./details.html?id=${element._id}">More Info</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    tagToUpdate.innerHTML = tarjetas;
}
pintarTarjetas(arrayUpcomingEvents);

const inputBuscar = document.getElementById("buscador");
/* inputBuscar.addEventListener("input", () => {
    let arrayFiltrado = filtrarPorTexto(arrayIndex, inputBuscar.value);
    let arrayFiltrado2 = filtrarPorCheckbox(arrayFiltrado);
    pintarTarjetas(arrayFiltrado2);
}) */
inputBuscar.addEventListener("input", filtroCruzado);
function filtrarPorTexto(arrayDatos, texto){
    let arrayFiltrado = arrayDatos.filter(element => element.name.toLowerCase().includes(texto.toLowerCase()));

    return arrayFiltrado;
}

function filtroCruzado(){
    let arrayFiltrado = filtrarPorTexto(arrayUpcomingEvents, inputBuscar.value);
    let arrayFiltrado2 = filtrarPorCheckbox(arrayFiltrado);
    pintarTarjetas(arrayFiltrado2);
}

const divCheckboxes = document.getElementById("div-Checkboxes")
function crearCheckboxes(arrayDatos){
    let checkbox = ``;
    let arrayMapeado = arrayDatos.map(element => element.category);
    let arraySeteado = new Set(arrayMapeado.sort((a,b) =>{
        if (a>b) {
            return 1
        }
        if (a<b) {
            return -1
        }
        return 0
    }))
    arraySeteado.forEach(element => {
        checkbox += `
        <div">
            <input type="checkbox" value="${element}" id="${element}">
            <label for="${element}">${element}</label>
        </div>
        `
    })
    
    divCheckboxes.innerHTML = checkbox;
};
crearCheckboxes(arrayUpcomingEvents);
function filtrarPorCheckbox(arrayDatos) {
    let nodeListCheckboxes = document.querySelectorAll("input[type='checkbox']");
    console.log(nodeListCheckboxes);
    let arrayCheckboxes = Array.from(nodeListCheckboxes);
    console.log(arrayCheckboxes);
    let arrayCheckboxesChequeados = arrayCheckboxes.filter(element => element.checked);
    console.log(arrayCheckboxesChequeados);
    if (arrayCheckboxesChequeados.length == 0) {
        return arrayDatos
    }
    let arrayCheckboxesValues = arrayCheckboxesChequeados.map(element => element.value);
    console.log(arrayCheckboxesValues);
    let arrayFiltrado = arrayDatos.filter(element => arrayCheckboxesValues.includes(element.category));
    console.log(arrayFiltrado);
    return arrayFiltrado
}
/* divCheckboxes.addEventListener("change", ()=>{
    let arrayFiltrado = filtrarPorTexto(arrayIndex, inputBuscar.value);
    let arrayFiltrado2 = filtrarPorCheckbox(arrayFiltrado);
    pintarTarjetas(arrayFiltrado2);
}) */
divCheckboxes.addEventListener("change", filtroCruzado);