import { DetallePrestamo } from "./detalle-prestamo";

export class Prestamo{

    constructor(
        public detalles: Array<DetallePrestamo> = Array<DetallePrestamo>()
    ){}

}