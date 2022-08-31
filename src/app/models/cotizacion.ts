import { DetalleCotizacion } from "./detalle-cotizacion";
import { Persona } from "./persona";

export class Cotizacion {

    constructor(
        public id: number = 0,
        public fecha: string = new Date().toISOString().split("T")[0],
        public cliente: Persona = new Persona(),
        public notas: string = '',
        public detalles: Array<DetalleCotizacion> = new Array<DetalleCotizacion>(),
        public totalIva: number = 0,
        public precioTotal: number = 0
    ){}

}