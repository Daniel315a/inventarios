import { Persona } from "./persona";
import { Factura } from "./factura";

export class Remision {

    constructor(
        public id: number = 0,
        public encargado: Persona = new Persona(),
        public urlArchivo: string = '',
        public notas: string = '',
        public fechaEntrega: string = new Date().toISOString().split("T")[0],
        public fechaInstalacion: string = new Date().toISOString().split("T")[0]
    ){}

    public inicializar(datos){
        if(!!datos){ 
            this.id = !!datos.id ? datos.id : this.id;
            this.urlArchivo = !!datos.nombre_archivo_soporte ? datos.nombre_archivo_soporte : this.urlArchivo;
            this.notas = !!datos.notas ? datos.notas : this.notas;
            this.fechaEntrega = !!datos.fecha_entrega ? datos.fecha_entrega : this.fechaEntrega;
            this.fechaInstalacion = !!datos.fecha_instalacion ? datos.fecha_instalacion : this.fechaInstalacion;
            
            this.encargado.inicializar(datos.encargado);
        }
    }

}