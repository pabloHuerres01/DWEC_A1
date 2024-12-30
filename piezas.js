class Pieza {
    constructor(numeroPieza, numeroPedido, largo, ancho, grosor, color = "Natural", ambasCaras = false, cortada = false) {
        if (!Number.isInteger(numeroPieza) || numeroPieza < 1) {
            throw new Error("El número de pieza debe ser un entero mayor o igual a 1.");
        }
        if (!Number.isInteger(numeroPedido) || numeroPedido < 1) {
            throw new Error("El número de pedido debe ser un entero mayor o igual a 1.");
        }
        if (largo <= 0 || ancho <= 0 || grosor <= 0) {
            throw new Error("Las medidas de la pieza deben ser mayores que 0.");
        }

        this.numeroPieza = numeroPieza;
        this.numeroPedido = numeroPedido;
        this.largo = largo;
        this.ancho = ancho;
        this.grosor = grosor;
        this.color = color;
        this.ambasCaras = ambasCaras;
        this.cortada = cortada;
    }
}

export default Pieza;
