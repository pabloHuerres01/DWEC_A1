class Pedido {
    constructor(numeroPedido, cliente, fechaPedido, procesado = false, servido = false) {
        if (!Number.isInteger(numeroPedido) || numeroPedido < 1) {
            throw new Error("El número de pedido debe ser un entero mayor o igual a 1.");
        }
        if (cliente.length > 50) {
            throw new Error("El nombre del cliente no puede superar los 50 caracteres.");
        }
        if (new Date(fechaPedido) > new Date()) {
            throw new Error("La fecha de pedido no puede ser futura.");
        }

        this.numeroPedido = numeroPedido;
        this.cliente = cliente;
        this.fechaPedido = fechaPedido;
        this.procesado = procesado;
        this.servido = servido;
    }
}

export default Pedido;
