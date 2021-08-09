import { DetalleCotizacion } from "./detalle-cotizacion";

export class Cotizacion {

    constructor(
        public detalles: Array<DetalleCotizacion> = new Array<DetalleCotizacion>(),
        public totalIva: number = 0,
        public precioTotal: number = 0
    ){}

}