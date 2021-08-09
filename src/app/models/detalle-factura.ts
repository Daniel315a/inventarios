import { Producto } from "./producto";

export class DetalleFactura{

    constructor(
        public id: number = 0,
        public producto: Producto = new Producto(),
        public cantidad: number = 0,
        public descripcion: string = '', 
        public porcentajeDescuento: number = null,
        public valorDescuento: number = 0.00,
        public porcentajeIva: number = null,
        public valorIva: number = 0.00,
        public precioUnitario: number = null,
        public precioTotal: number = 0.00,
        public esInstalacion: boolean = false
    ){}

}