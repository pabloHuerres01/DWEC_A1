import { crearPedido, obtenerPedidos } from './pedidosCRUD.js';
import { crearPieza, obtenerPiezas } from './piezasCRUD.js';
import { obtenerDetallePedido } from './detallePedidos.js';

// Referencias a elementos del DOM
const formPedido = document.getElementById('formPedido');
const listaPedidos = document.getElementById('listaPedidos');
const formPieza = document.getElementById('formPieza');
const listaPiezas = document.getElementById('listaPiezas');
const formDetallePedido = document.getElementById('formDetallePedido');
const tablaDetalle = document.getElementById('tablaDetalle').querySelector('tbody');

// Actualizar la lista de pedidos en el DOM
function actualizarListaPedidos() {
    listaPedidos.innerHTML = '';
    const pedidos = obtenerPedidos();
    pedidos.forEach(pedido => {
        const li = document.createElement('li');
        li.textContent = `Pedido #${pedido.numeroPedido} - ${pedido.cliente} (${pedido.fechaPedido})`;
        listaPedidos.appendChild(li);
    });
}

// Actualizar la lista de piezas en el DOM
function actualizarListaPiezas() {
    listaPiezas.innerHTML = '';
    const piezas = obtenerPiezas();
    piezas.forEach(pieza => {
        const li = document.createElement('li');
        li.textContent = `Pieza #${pieza.numeroPieza} - Pedido #${pieza.numeroPedido} - ${pieza.largo}x${pieza.ancho}x${pieza.grosor} (${pieza.color})`;
        listaPiezas.appendChild(li);
    });
}

// Manejar el envío del formulario de pedidos
formPedido.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const numeroPedido = parseInt(document.getElementById('numeroPedido').value, 10);
        const cliente = document.getElementById('cliente').value;
        const fechaPedido = document.getElementById('fechaPedido').value;

        crearPedido({ numeroPedido, cliente, fechaPedido, procesado: false, servido: false });
        actualizarListaPedidos();
        formPedido.reset();
    } catch (error) {
        alert(error.message);
    }
});

// Manejar el envío del formulario de piezas
formPieza.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const numeroPieza = parseInt(document.getElementById('numeroPieza').value, 10);
        const numeroPedido = parseInt(document.getElementById('numeroPedidoPieza').value, 10);
        const largo = parseFloat(document.getElementById('largo').value);
        const ancho = parseFloat(document.getElementById('ancho').value);
        const grosor = parseFloat(document.getElementById('grosor').value);
        const color = document.getElementById('color').value || "Natural";

        crearPieza({ numeroPieza, numeroPedido, largo, ancho, grosor, color, ambasCaras: false, cortada: false }, obtenerPedidos());
        actualizarListaPiezas();
        formPieza.reset();
    } catch (error) {
        alert(error.message);
    }
});

// Manejar el envío del formulario de detalle de pedido
formDetallePedido.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const numeroPedido = parseInt(document.getElementById('detalleNumeroPedido').value, 10);
        const { detalles } = obtenerDetallePedido(numeroPedido);

        // Limpiar la tabla
        tablaDetalle.innerHTML = '';

        // Rellenar la tabla con detalles de las piezas
        detalles.forEach(pieza => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pieza.numeroPieza}</td>
                <td>${pieza.largo}</td>
                <td>${pieza.ancho}</td>
                <td>${pieza.grosor}</td>
                <td>${pieza.color}</td>
                <td>${pieza.superficie.toFixed(2)}</td>
                <td>${pieza.volumen.toFixed(2)}</td>
            `;
            tablaDetalle.appendChild(row);
        });

        formDetallePedido.reset();
    } catch (error) {
        alert(error.message);
    }
});

// Inicializar listas
actualizarListaPedidos();
actualizarListaPiezas();
