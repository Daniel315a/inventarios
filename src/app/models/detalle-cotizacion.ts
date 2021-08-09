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

}