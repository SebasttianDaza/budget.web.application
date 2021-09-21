/**  Pasos para la cabecera */


//Crear un array para que guarde los objetos

const ingresos = [
    new Ingreso('Salario', 5400000),
    new Ingreso('Prima', 500000)
];
const egresos = [
    new Egreso('Servicios Generales', 300000)
];

// Funcion para el evento onload, que carge antes de la pagina

let cargarApp = () => {
    cargarCabecera();
    cargarIngreso();
    cargarEgreso();
}


//Funcion para recorrer los arrays de Ingreso y Egresos

let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

//Funcion para cargar de manera dinamica los datos de la cabecera

let cargarCabecera = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos());
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
};

//Funcion para dar formato al tipo de numero en moneda

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-CO',{style:'currency', currency: 'COP', minimumFractionDigits: 2});
}

//Funcion para dar formato de porcentaje al Egreso

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-CO', {style: 'percent', minimumFractionDigits:2});
}

/**Fin de pasos para la Cabecera */


/** Funciones de Contenedor*/

//Funcion para cargar el objeto de Ingreso

const cargarIngreso = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

//Funcion para agregar Objeto de Ingreso

const crearIngresosHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline" onclick = "eliminarIngreso(${ingreso.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return ingresoHTML;
}

//Funcion para eliminar objeto de Ingreso

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecera();
    cargarIngreso();
}

// Funcion para cargar  Objetos de egreso en el conetenedor

const cargarEgreso = () => {
    let egresosHTML = '';
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

//Funcion para crear Objetos de Egresos

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline" onclick="eliminarEgresos(${egreso.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return egresoHTML;
          
}

//Funcion para eliminar el objeto de Egreso

const eliminarEgresos = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecera();
    cargarEgreso();
}


/**Fin de Funciones de Contenedor */

/**fFunciones del Formulario */
//Funcion para agregar los datos de los objetos Ingreso y Egreso a las clases y listas

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecera();
            cargarIngreso();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecera();
            cargarEgreso();
        }
    }
}


/**Fin de Funciones de Fromulario*/
