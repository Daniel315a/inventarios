import { DetalleFactura } from "./detalle-factura";
import { Persona } from "./persona";

export class Factura{
    
    constructor(
        public id: number = 0,
        public fecha: string = new Date().toISOString().split("T")[0],
        public cliente: Persona = new Persona(),
        public vendedor: Persona = new Persona(),
        public detalles: Array<DetalleFactura> = new Array<DetalleFactura>(),
        public valorTotal: number = 0.0,
        public porcentajeComision: number = 0.00,
        public valorComision: number = 0.00,
        public totalDescuento: number = 0.00,
        public totalIva: number = 0.00
    ){}

}