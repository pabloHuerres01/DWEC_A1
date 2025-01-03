import {
    crearPedido,
    obtenerPedidos,
    actualizarPedido,
    eliminarPedido,
    inicializarPedidos,
    cargarPedidosDesdeLocalStorage
} from './pedidosCRUD.js';
import {
    inicializarPiezas,
    crearPieza,
    obtenerPiezas,
    eliminarPieza,
    actualizarPieza,
    cargarPiezasDesdeLocalStorage
} from './piezasCRUD.js';
import { obtenerDetallePedido } from './detallePedidos.js';

const formPedido = document.getElementById('formPedido');
const listaPedidos = document.getElementById('listaPedidos');
const formPieza = document.getElementById('formPieza');
const listaPiezas = document.getElementById('listaPiezas');
const formDetallePedido = document.getElementById('formDetallePedido');
const tablaDetalle = document.getElementById('tablaDetalle').querySelector('tbody');

function inicializarDatos() {
    cargarPedidosDesdeLocalStorage();
    cargarPiezasDesdeLocalStorage();
    actualizarListaPedidos();
    actualizarListaPiezas();
}

inicializarDatos();

function actualizarListaPedidos() {
    listaPedidos.innerHTML = '';
    const pedidos = obtenerPedidos();
    pedidos.forEach(pedido => {
        const li = document.createElement('li');
        li.textContent = `Pedido #${pedido.numeroPedido} - ${pedido.cliente} (${pedido.fechaPedido})`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', () => {
            try {
                eliminarPedido(pedido.numeroPedido);
                actualizarListaPedidos();
            } catch (error) {
                alert(error.message);
            }
        });

        const modificarBtn = document.createElement('button');
        modificarBtn.textContent = 'Modificar';
        modificarBtn.addEventListener('click', () => {
            const nuevoCliente = prompt("Nuevo nombre del cliente:", pedido.cliente);
            const nuevaFecha = prompt("Nueva fecha de pedido (YYYY-MM-DD):", pedido.fechaPedido);

            try {
                actualizarPedido(pedido.numeroPedido, {
                    cliente: nuevoCliente,
                    fechaPedido: nuevaFecha
                });
                actualizarListaPedidos();
            } catch (error) {
                alert(error.message);
            }
        });

        li.appendChild(eliminarBtn);
        li.appendChild(modificarBtn);
        listaPedidos.appendChild(li);
    });
}

function actualizarListaPiezas() {
    listaPiezas.innerHTML = '';
    const piezas = obtenerPiezas();
    piezas.forEach(pieza => {
        const li = document.createElement('li');
        li.textContent = `Pieza #${pieza.numeroPieza} - Pedido #${pieza.numeroPedido} - ${pieza.largo}x${pieza.ancho}x${pieza.grosor} (${pieza.color})`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', () => {
            try {
                eliminarPieza(pieza.numeroPieza);
                actualizarListaPiezas();
            } catch (error) {
                alert(error.message);
            }
        });

        const modificarBtn = document.createElement('button');
        modificarBtn.textContent = 'Modificar';
        modificarBtn.addEventListener('click', () => {
            const nuevoLargo = parseFloat(prompt("Nuevo largo (cm):", pieza.largo)) || pieza.largo;
            const nuevoAncho = parseFloat(prompt("Nuevo ancho (cm):", pieza.ancho)) || pieza.ancho;
            const nuevoGrosor = parseFloat(prompt("Nuevo grosor (cm):", pieza.grosor)) || pieza.grosor;
            const nuevoColor = prompt("Nuevo color:", pieza.color) || pieza.color;

            try {
                actualizarPieza(pieza.numeroPieza, {
                    largo: nuevoLargo,
                    ancho: nuevoAncho,
                    grosor: nuevoGrosor,
                    color: nuevoColor,
                });
                actualizarListaPiezas();
            } catch (error) {
                alert(error.message);
            }
        });

        li.appendChild(eliminarBtn);
        li.appendChild(modificarBtn);
        listaPiezas.appendChild(li);
    });
}

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

formPieza.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const numeroPieza = parseInt(document.getElementById('numeroPieza').value, 10);
        const numeroPedido = parseInt(document.getElementById('numeroPedidoPieza').value, 10);
        const largo = parseFloat(document.getElementById('largo').value);
        const ancho = parseFloat(document.getElementById('ancho').value);
        const grosor = parseFloat(document.getElementById('grosor').value);
        const color = document.getElementById('color').value; // Obtener el color seleccionado

        crearPieza({ numeroPieza, numeroPedido, largo, ancho, grosor, color, ambasCaras: false, cortada: false }, obtenerPedidos());
        actualizarListaPiezas();
        formPieza.reset();
    } catch (error) {
        alert(error.message);
    }
});


formDetallePedido.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const numeroPedido = parseInt(document.getElementById('detalleNumeroPedido').value, 10);
        const { detalles } = obtenerDetallePedido(numeroPedido);

        tablaDetalle.innerHTML = '';
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

actualizarListaPedidos();
actualizarListaPiezas();
