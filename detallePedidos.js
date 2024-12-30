import { obtenerPedidoPorNumero } from './pedidosCRUD.js';
import Pieza from './piezas.js';

let piezas = []; // Array para almacenar las piezas

// Calcular superficie y volumen
function calcularSuperficie(largo, ancho) {
    return largo * ancho;
}

function calcularVolumen(largo, ancho, grosor) {
    return largo * ancho * grosor;
}

// Crear una pieza
function crearPieza(pieza, pedidos) {
    validarPieza(pieza, pedidos); // Validar antes de agregar
    if (piezas.some(p => p.numeroPieza === pieza.numeroPieza)) {
        throw new Error("El número de pieza ya existe.");
    }
    piezas.push(pieza);
}

// Leer todas las piezas
function obtenerPiezas() {
    return piezas;
}

// Leer piezas por número de pedido
function obtenerPiezasPorPedido(numeroPedido) {
    return piezas.filter(p => p.numeroPedido === numeroPedido);
}

// Actualizar una pieza
function actualizarPieza(numeroPieza, datosActualizados) {
    const pieza = piezas.find(p => p.numeroPieza === numeroPieza);
    if (!pieza) {
        throw new Error("Pieza no encontrada.");
    }
    Object.assign(pieza, datosActualizados);
}

// Eliminar una pieza
function eliminarPieza(numeroPieza) {
    piezas = piezas.filter(p => p.numeroPieza !== numeroPieza);
}

// Validar una pieza antes de crearla
function validarPieza(pieza, pedidos) {
    if (!Number.isInteger(pieza.numeroPieza) || pieza.numeroPieza < 1) {
        throw new Error("El número de pieza debe ser un entero mayor o igual a 1.");
    }
    if (!Number.isInteger(pieza.numeroPedido) || pieza.numeroPedido < 1) {
        throw new Error("El número de pedido debe ser un entero mayor o igual a 1.");
    }
    if (!pedidos.some(p => p.numeroPedido === pieza.numeroPedido)) {
        throw new Error("El número de pedido asociado no existe.");
    }
    if (pieza.largo <= 0 || pieza.ancho <= 0 || pieza.grosor <= 0) {
        throw new Error("Las dimensiones deben ser mayores que 0.");
    }
}

// Obtener detalles de un pedido
function obtenerDetallePedido(numeroPedido) {
    const pedido = obtenerPedidoPorNumero(numeroPedido);
    if (!pedido) {
        throw new Error("Pedido no encontrado.");
    }

    const piezasPedido = obtenerPiezasPorPedido(numeroPedido);
    const detalles = piezasPedido.map(pieza => ({
        numeroPieza: pieza.numeroPieza,
        largo: pieza.largo,
        ancho: pieza.ancho,
        grosor: pieza.grosor,
        color: pieza.color,
        superficie: calcularSuperficie(pieza.largo, pieza.ancho),
        volumen: calcularVolumen(pieza.largo, pieza.ancho, pieza.grosor),
    }));

    return { pedido, detalles };
}

// Exportar funciones
export {
    crearPieza,
    obtenerPiezas,
    obtenerPiezasPorPedido,
    actualizarPieza,
    eliminarPieza,
    obtenerDetallePedido,
};
