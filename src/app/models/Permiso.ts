import { Accion } from "./accion";
import { Elemento } from "./elemento";
import { Solicitud } from "./solicitud";

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

    public inicializar(datos: any): void{
        if(!!datos){
            this.id = !!datos.id ? datos.id : 0;
            this.elemento = new Elemento();
            this.nombre = !!datos.nombre ? datos.nombre : '';
            this.solicitud = new Solicitud();
            this.accesoDenegado = !!datos.acceso_denegado;

            this.elemento.inicializar(datos.elemento);
            this.solicitud.inicializar(datos.solicitud);

            let acciones = !!datos.acciones ? datos.acciones : new Array<any>();

            acciones.forEach(accion => {
                const objAccion = new Accion();

                objAccion.inicializar(accion);
                this.acciones.push(objAccion);
            });

        }
    }

}