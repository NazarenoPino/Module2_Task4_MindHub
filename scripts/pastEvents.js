let data = [];
let fecha;
let arrayPastEvents = [];
let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
async function getAPI() {
    try {
        let respuesta = await fetch(urlAPI);
        let dataAPI = await respuesta.json();
        fecha = dataAPI.currentDate;
        /* for (const event of dataAPI.events) {
            data.push(event)
        } */
        arrayPastEvents = dataAPI.events.filter(event => event.date < fecha)

        pintarTarjetas(arrayPastEvents)
        crearCheckboxes(arrayPastEvents);
        superFiltro();
    } catch (e) {
        console.log(e.message);
    }
}
getAPI();

/* for (let i = 0; i < data.length; i++) {
    if (currentDate > data[i].date) {
        arrayPastEvents.push(data[i]);
    }
} */

console.log(arrayPastEvents);

let divCardsPastEvents = ``;

let tagToUpdate = document.getElementById("divCardsPastEvents");

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
pintarTarjetas(arrayPastEvents);

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
    let arrayFiltrado = filtrarPorTexto(arrayPastEvents, inputBuscar.value);
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
crearCheckboxes(arrayPastEvents);
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

/* for (let i = 0; i < arrayPastEvents.length; i++) {
    divCardsPastEvents += `
    <div class="col-3">
        <div class="card" style="width: 18rem;">
            <img src="${arrayPastEvents[i].image}" class="card-img-top" alt="${arrayPastEvents[i].category}">
        </div> 
        <div class="card-body">
            <h5 class="card-title">${arrayPastEvents[i].name}</h5>
            <p class="card-text">${arrayPastEvents[i].description}</p>
        </div>
        <div class="card-footer border-0">
            <div class="d-flex justify-content-between">
                <p>Price: $${arrayPastEvents[i].price}</p>
                <a class="btn btn-info" href="./details.html">More Info</a>
            </div>
        </div>
    </div>
    `
}

tagToUpdate.innerHTML = divCardsPastEvents; */