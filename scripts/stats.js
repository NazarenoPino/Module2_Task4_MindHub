let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

async function getAPI() {
    try {
        let respuesta = await fetch(urlAPI);
        let dataAPI = await respuesta.json();
        arrayStats = dataAPI.events;
        fecha = dataAPI.currentDate;
        /* for (const event of dataAPI.events) {
            data.push(event)
        } */
        let arrayPastEvents = dataAPI.events.filter(event => event.date < fecha)
        let arrayUpcomingEvents = dataAPI.events.filter(event => event.date > fecha)

        pastEventsStatistics(arrayPastEvents)
        upcomingEventsStatistics(arrayUpcomingEvents)
        obtenerEventoConMayorYMenorAsistencia(arrayPastEvents)
    } catch (e) {
        console.log(e.message);
    }
}
getAPI();

/* Hay que recorrer los arrays past y upcoming. Luego crear arrays de cada categoria y recorrerlos con for of para sacar el porcentaje de 
asistencia ((asistencia * 100) / capacidad) y la suma de las ventas de entradas (precio * asistencia) luego dentro del for of crear
la tabla de manera dinamica con esos datos. El porcentaje de mayor asistencia debe ser guardado en una variable y ser retornada, lo mismo
con el de menor asistencia asi como tambien el evento de mayor capacidad para luego crear la tabla dinamicamente */


function pastEventsStatistics(arrayPastEvents) {
    const idContenedorPastEvents = document.getElementById("tbody-pastEvents")
    let arrayBooks  = filtarArrayPorCategoria(arrayPastEvents, "books")

    console.log("past events");
    
    let arrayCinema  = filtarArrayPorCategoria(arrayPastEvents, "cinema");
    let arrayConcert  = filtarArrayPorCategoria(arrayPastEvents, "concert")
    let arrayFood  = filtarArrayPorCategoria(arrayPastEvents, "food")
    let arrayMuseum  = filtarArrayPorCategoria(arrayPastEvents, "museum")
    let arrayParty  = filtarArrayPorCategoria(arrayPastEvents, "party")
    let arrayRace  = filtarArrayPorCategoria(arrayPastEvents, "race")

    let objetoBooks = obtenerIngresosYPorcentajeDeAsistencia(arrayBooks)
    let objetoCinema = obtenerIngresosYPorcentajeDeAsistencia(arrayCinema)
    let objetoConcert = obtenerIngresosYPorcentajeDeAsistencia(arrayConcert)
    let objetoFood = obtenerIngresosYPorcentajeDeAsistencia(arrayFood)
    let objetoMuseum = obtenerIngresosYPorcentajeDeAsistencia(arrayMuseum)
    let objetoParty = obtenerIngresosYPorcentajeDeAsistencia(arrayParty)
    let objetoRace = obtenerIngresosYPorcentajeDeAsistencia(arrayRace)

    let arrayIngresosYPorcentajes = [objetoBooks, objetoCinema, objetoConcert, objetoFood, objetoMuseum, objetoParty, objetoRace]

    pintarTabla(arrayIngresosYPorcentajes, idContenedorPastEvents)

    
}

function upcomingEventsStatistics(arrayUpcomingEvents) {
    const idContenedorUpcomingEvents = document.getElementById("tbody-upcomingEvents")
    console.log("upcoming events");

    let arrayBooks  = filtarArrayPorCategoria(arrayUpcomingEvents, "books")
    let arrayCinema  = filtarArrayPorCategoria(arrayUpcomingEvents, "cinema");
    let arrayConcert  = filtarArrayPorCategoria(arrayUpcomingEvents, "concert")
    let arrayFood  = filtarArrayPorCategoria(arrayUpcomingEvents, "food")
    let arrayMuseum  = filtarArrayPorCategoria(arrayUpcomingEvents, "museum")
    let arrayParty  = filtarArrayPorCategoria(arrayUpcomingEvents, "party")
    let arrayRace  = filtarArrayPorCategoria(arrayUpcomingEvents, "race")

    let objetoBooks = obtenerIngresosYPorcentajeDeAsistencia2(arrayBooks)
    let objetoCinema = obtenerIngresosYPorcentajeDeAsistencia2(arrayCinema)
    let objetoConcert = obtenerIngresosYPorcentajeDeAsistencia2(arrayConcert)
    let objetoFood = obtenerIngresosYPorcentajeDeAsistencia2(arrayFood)
    let objetoMuseum = obtenerIngresosYPorcentajeDeAsistencia2(arrayMuseum)
    let objetoParty = obtenerIngresosYPorcentajeDeAsistencia2(arrayParty)
    let objetoRace = obtenerIngresosYPorcentajeDeAsistencia2(arrayRace)
    
    let arrayIngresosYPorcentajes = [objetoBooks, objetoCinema, objetoConcert, objetoFood, objetoMuseum, objetoParty, objetoRace]

    pintarTabla(arrayIngresosYPorcentajes, idContenedorUpcomingEvents)
}

function filtarArrayPorCategoria(array, categoria) {
    let nuevoArray = array.filter(event => event.category.toLowerCase() === categoria);
    return nuevoArray;
}

function obtenerIngresosYPorcentajeDeAsistencia(arrayCategoria) {
    let ingresos = 0;
    let asistencia = 0;
    let capacidad = 0;
    let porcentajeDeAsistencia = 0;
    let categoria;
    
    for (const event of arrayCategoria) {
        asistencia += event.assistance;    
        capacidad += event.capacity;
        ingresos += (event.assistance * event.price)
        categoria = event.category;
    }
    porcentajeDeAsistencia = (asistencia * 100) / capacidad;

    console.log(ingresos);
    console.log(porcentajeDeAsistencia);
    console.log(categoria);
    console.log("---------------------------------------------------------------------------------------------------");

    return ({ingresosPorCategoria: ingresos, porcentajeDeAsistenciaPorCategoria: porcentajeDeAsistencia, category: categoria})
}

function obtenerIngresosYPorcentajeDeAsistencia2(arrayCategoria) {
    let ingresos = 0;
    let estimados = 0;
    let capacidad = 0;
    let porcentajeDeAsistencia = 0;
    let categoria;
    
    for (const event of arrayCategoria) {
        estimados += event.estimate;    
        capacidad += event.capacity;
        ingresos += (event.estimate * event.price)
        categoria = event.category;
    }
    porcentajeDeAsistencia = (estimados * 100) / capacidad;

    console.log(estimados);
    console.log(porcentajeDeAsistencia);
    console.log(categoria);
    console.log("---------------------------------------------------------------------------------------------------");

    return ({ingresosPorCategoria: ingresos, porcentajeDeAsistenciaPorCategoria: porcentajeDeAsistencia, category: categoria})
}

function pintarTabla(array, idContenedor) {
    let tableHTML = ``;

    array.forEach(element => {
        if (element.ingresosPorCategoria === 0) {
            return
        }
        tableHTML += `
    <tr>
        <td>${element.category}</td>
        <td>$${element.ingresosPorCategoria}</td>
        <td>${element.porcentajeDeAsistenciaPorCategoria.toFixed(2)}%</td>
    </tr>
    `
    });

    idContenedor.innerHTML = tableHTML;
}

function obtenerEventoConMayorYMenorAsistencia(array) {
    let nombreMayorAsistencia = ""
    let porcentajeMayorAsistencia = 0
    let nombreMenorAsistencia = ""
    let porcentajeMenorAsistencia = 100
    let nombreMasCapacidad = ""
    let masCapacidad = 0
    let objetoConInfo = {}

    for (const event of array) {
        if ((event.assistance * 100) / event.capacity > porcentajeMayorAsistencia) {
            nombreMayorAsistencia = event.name
            porcentajeMayorAsistencia = (event.assistance * 100) / event.capacity
        }
        if ((event.assistance * 100) / event.capacity < porcentajeMenorAsistencia) {
            nombreMenorAsistencia = event.name
            porcentajeMenorAsistencia = (event.assistance * 100) / event.capacity
        }
        if (event.capacity > masCapacidad) {
            nombreMasCapacidad = event.name
            masCapacidad = event.capacity
        }
    }

        objetoConInfo = {nombre1: nombreMayorAsistencia,
        porcentaje1: porcentajeMayorAsistencia,
        nombre2: nombreMenorAsistencia,
        porcentaje2: porcentajeMenorAsistencia,
        nombre3: nombreMasCapacidad,
        capacidad: masCapacidad}

        console.log(objetoConInfo)

    pintar2(objetoConInfo)
}

function pintar2(objeto) {
    let documento = document.getElementById("tbody-events")
    let tableHTML = ``;

    tableHTML += `
    <tr>
        <td>${objeto.nombre1} (${objeto.porcentaje1.toFixed(2)}%)</td>
        <td>${objeto.nombre2} (${objeto.porcentaje2.toFixed(2)}%)</td>
        <td>${objeto.nombre3} (${objeto.capacidad})</td>
    </tr>
    `
    

    documento.innerHTML = tableHTML;
}