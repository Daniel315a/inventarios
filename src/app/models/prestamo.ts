import { DetallePrestamo } from "./detalle-prestamo";
import { Persona } from "./persona";

export class Prestamo{

    constructor(
        public id: number = 0,
        public fecha: string = new Date().toISOString().split("T")[0],
        public fechaEntrega: string = null,
        public distribuidor: Persona = new Persona(),
        public encargado: Persona = new Persona(),
        public notas: string = '',
        public detalles: Array<DetallePrestamo> = new Array<DetallePrestamo>()
    ){}

    public inicializar(datos: any){
        if(!!datos){
            this.detalles = new Array<DetallePrestamo>();
            this.encargado = new Persona();
            this.distribuidor = new Persona();

            this.id = datos.id!! ? datos.id : this.id;
            this.fecha = datos.fecha!! ? datos.fecha : this.fecha;
            this.fechaEntrega = datos.fecha_devolucion!! ? datos.fecha_devolucion : this.fechaEntrega;
            this.notas = datos.notas!! ? datos.notas : this.notas;
            
            this.distribuidor.inicializar(datos.distribuidor);
            this.encargado.inicializar(datos.empleado);

            if(!!datos.detalles){
                datos.detalles.forEach(objDetalle => {
                    let detalle = new DetallePrestamo();
                    detalle.inicializar(objDetalle);
    
                    this.detalles.push(detalle);
                });
            }
        }
    }

}