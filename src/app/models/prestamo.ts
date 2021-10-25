import { DetallePrestamo } from "./detalle-prestamo";
import { Persona } from "./persona";

export class Prestamo{

    constructor(
        public id: number = 0,
        public fecha: string = new Date().toISOString().split("T")[0],
        public fechaEntrega: string = new Date().toISOString().split("T")[0],
        public distribuidor: Persona = new Persona(),
        public encargado: Persona = new Persona(),
        public notas: string = '',
        public detalles: Array<DetallePrestamo> = Array<DetallePrestamo>()
    ){}

}