import { obtenerPedidoPorNumero } from './pedidosCRUD.js';
import { obtenerPiezasPorPedido } from './piezasCRUD.js';

function calcularSuperficie(largo, ancho) {
    return largo * ancho;
}

function calcularVolumen(largo, ancho, grosor) {
    return largo * ancho * grosor;
}

function obtenerDetallePedido(numeroPedido) {
    const pedido = obtenerPedidoPorNumero(numeroPedido);
    if (!pedido) throw new Error("Pedido no encontrado.");

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

export { obtenerDetallePedido };
