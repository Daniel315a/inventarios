import { DetalleCotizacion } from "./detalle-cotizacion";
import { Persona } from "./persona";
import { Usuario } from "./usuario";

export class Cotizacion {
    
    constructor(
        public id: number = 0,
        public usuario: Usuario = new Usuario(),
        public fecha: string = new Date().toISOString().split("T")[0],
        public cliente: Persona = new Persona(),
        public notas: string = '',
        public detalles: Array<DetalleCotizacion> = new Array<DetalleCotizacion>(),
        public totalIva: number = 0,
        public precioTotal: number = 0
    ){}

    inicializar(datos) {
        if(!!datos){
            this.id = !!datos.id ? datos.id : this.id;
            this.fecha = !!datos.fecha ? datos.fecha : this.fecha;
            this.notas = !!datos.notas ? datos.notas : this.notas;
            this.totalIva = !!datos.total_iva ? datos.total_iva : this.totalIva;
            this.precioTotal = !!datos.precio_total ? datos.precio_total : this.precioTotal;

            this.cliente.inicializar(datos.cliente);
            this.usuario.inicializar(datos.usuario);
            datos.detalles.forEach(element => {
                let detalle: DetalleCotizacion = new DetalleCotizacion();
                detalle.inicializar(element);
                
                this.detalles.push(detalle);
            });
        }
    }

}