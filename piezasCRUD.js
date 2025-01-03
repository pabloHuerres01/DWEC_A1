import { obtenerPedidoPorNumero } from './pedidosCRUD.js';

let piezas = [
    { numeroPieza: 1, numeroPedido: 1, largo: 100, ancho: 50, grosor: 2, color: "Natural", ambasCaras: false },
    { numeroPieza: 2, numeroPedido: 1, largo: 120, ancho: 60, grosor: 3, color: "Blanco", ambasCaras: true },
    { numeroPieza: 3, numeroPedido: 2, largo: 80, ancho: 40, grosor: 2.5, color: "Madera", ambasCaras: false }
];

function inicializarPiezas() {
    return piezas;
}


function crearPieza(pieza, pedidos) {
    validarPieza(pieza, pedidos);
    if (piezas.some(p => p.numeroPieza === pieza.numeroPieza)) {
        throw new Error("El número de pieza ya existe.");
    }
    piezas.push(pieza);
    guardarPiezasEnLocalStorage();
}

function obtenerPiezas() {
    return piezas;
}

function obtenerPiezasPorPedido(numeroPedido) {
    return piezas.filter(p => p.numeroPedido === numeroPedido);
}

function actualizarPieza(numeroPieza, datosActualizados) {
    const pieza = piezas.find(p => p.numeroPieza === numeroPieza);
    if (!pieza) throw new Error("Pieza no encontrada.");
    Object.assign(pieza, datosActualizados);
    guardarPiezasEnLocalStorage();
}

function eliminarPieza(numeroPieza) {
    piezas = piezas.filter(p => p.numeroPieza !== numeroPieza);
    guardarPiezasEnLocalStorage();
}

function validarPieza(pieza, pedidos) {
    if (!Number.isInteger(pieza.numeroPieza) || pieza.numeroPieza < 1) {
        throw new Error("El número de pieza debe ser mayor o igual a 1.");
    }
    if (!pedidos.some(p => p.numeroPedido === pieza.numeroPedido)) {
        throw new Error("El pedido asociado no existe.");
    }
    if (pieza.largo <= 0 || pieza.ancho <= 0 || pieza.grosor <= 0) {
        throw new Error("Las dimensiones deben ser mayores que 0.");
    }
    const coloresPermitidos = ["Natural", "Blanco", "Madera", "Negro"];
    if (!coloresPermitidos.includes(pieza.color)) {
        throw new Error("Color no permitido.");
    }
}

// Guardar piezas en LocalStorage
function guardarPiezasEnLocalStorage() {
    localStorage.setItem('piezas', JSON.stringify(piezas));
}

// Cargar piezas desde LocalStorage
function cargarPiezasDesdeLocalStorage() {
    const datos = localStorage.getItem('piezas');
    if (datos) {
        piezas = JSON.parse(datos);
    }
}
export {
    crearPieza,
    obtenerPiezas,
    obtenerPiezasPorPedido,
    actualizarPieza,
    eliminarPieza,
    inicializarPiezas,
    guardarPiezasEnLocalStorage,
    cargarPiezasDesdeLocalStorage,
};
