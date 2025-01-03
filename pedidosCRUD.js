let pedidos = [
    { numeroPedido: 1, cliente: "Juan Pérez", fechaPedido: "2024-01-01" },
    { numeroPedido: 2, cliente: "Ana López", fechaPedido: "2024-01-05" }
]; // Array para almacenar los pedidos
function inicializarPedidos() {
    return pedidos;
}
function crearPedido(pedido) {
    validarPedido(pedido);
    if (pedidos.some(p => p.numeroPedido === pedido.numeroPedido)) {
        throw new Error("El número de pedido ya existe.");
    }
    pedidos.push(pedido);
    guardarPedidosEnLocalStorage();
}
// Guardar pedidos en LocalStorage
function guardarPedidosEnLocalStorage() {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

// Cargar pedidos desde LocalStorage
function cargarPedidosDesdeLocalStorage() {
    const datos = localStorage.getItem('pedidos');
    if (datos) {
        pedidos = JSON.parse(datos);
    }
}
// Leer todos los pedidos
function obtenerPedidos() {
    return pedidos;
}

// Leer un pedido por su número
function obtenerPedidoPorNumero(numeroPedido) {
    return pedidos.find(p => p.numeroPedido === numeroPedido) || null;
}

function actualizarPedido(numeroPedido, datosActualizados) {
    const pedido = pedidos.find(p => p.numeroPedido === numeroPedido);
    if (!pedido) {
        throw new Error("Pedido no encontrado.");
    }
    Object.assign(pedido, datosActualizados);
    guardarPedidosEnLocalStorage();
}

function eliminarPedido(numeroPedido) {
    const pedidoIndex = pedidos.findIndex(p => p.numeroPedido === numeroPedido);
    if (pedidoIndex === -1) {
        throw new Error("Pedido no encontrado.");
    }
    pedidos.splice(pedidoIndex, 1);
    guardarPedidosEnLocalStorage();
}

// Validar un pedido antes de crearlo
function validarPedido(pedido) {
    if (!Number.isInteger(pedido.numeroPedido) || pedido.numeroPedido < 1) {
        throw new Error("El número de pedido debe ser un entero mayor o igual a 1.");
    }
    if (typeof pedido.cliente !== 'string' || pedido.cliente.trim() === '') {
        throw new Error("El cliente debe ser un nombre válido.");
    }
    const fecha = new Date(pedido.fechaPedido);
    if (isNaN(fecha) || fecha > new Date()) {
        throw new Error("La fecha de pedido debe ser válida y no puede ser futura.");
    }
}

export {
    crearPedido,
    obtenerPedidos,
    obtenerPedidoPorNumero,
    actualizarPedido,
    eliminarPedido,
    inicializarPedidos,
    guardarPedidosEnLocalStorage,
    cargarPedidosDesdeLocalStorage,
};