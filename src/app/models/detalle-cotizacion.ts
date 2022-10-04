import { Producto } from "./producto";

export class DetalleCotizacion {

    constructor(
        public id: number = 0,
        public cantidad: number = 0,
        public producto: Producto = new Producto(),
        public descripcion: string = '',
        public precioUnitario: number = null,
        public porcentajeIva: number = null,
        public valorIva: number = 0,
        public precioTotal: number = 0,
    ){}

    public inicializar(datos) {
        if(!!datos) {
            this.id = !!datos.id ? datos.id : this.id;
            this.cantidad = !!datos.cantidad ? datos.cantidad : this.cantidad;
            this.descripcion = !!datos.descripcion ? datos.descripcion : this.descripcion;
            this.precioUnitario = !!datos.precio_unitario ? datos.precio_unitario : this.precioUnitario;
            this.porcentajeIva = !!datos.porcentaje_iva ? datos.porcentaje_iva : this.porcentajeIva;
            this.valorIva = !!datos.valor_iva ? datos.valor_iva : this.valorIva;
            this.precioTotal = !!datos.precio_total ? datos.precio_total : this.precioTotal;

            this.producto.inicializar(datos.producto);
        }
    }

}