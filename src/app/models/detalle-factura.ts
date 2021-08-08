import { Producto } from "./producto";

export class DetalleFactura{

    constructor(
        public id: number = 0,
        public producto: Producto = new Producto(),
        public descripcion: string = '', 
        public precio: number = 0.00,
        public porcentajeDescuento: number = 0.00,
        public valorDescuento: number = 0.00,
        public esInstalacion: boolean = false
    ){}

}