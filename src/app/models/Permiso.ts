import { Accion } from "./Accion";
import { Elemento } from "./Elemento";
import { Solicitud } from "./Solicitud";

export class Permiso {

    constructor(
        public id: number = 0,
        public elemento: Elemento = new Elemento(),
        public nombre: string = '',
        public acciones: Array<Accion> = new Array<Accion>(),
        public solicitud: Solicitud = new Solicitud(),
        public accesoDenegado: boolean = false 
    ){

    }

}