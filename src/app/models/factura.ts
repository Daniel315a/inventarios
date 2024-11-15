import { DetalleFactura } from "./detalle-factura";
import { Persona } from "./persona";
import { Remision } from "./remision";

export class Factura{
    
    constructor(
        public id: number = 0,
        public remisiones: Array<Remision> = new Array<Remision>(),
        public consecutivo = 0,
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

    public inicializar(datos){
        if(!!datos){
            this.id = !!datos.id ? datos.id : this.id;
            this.consecutivo = !!datos.consecutivo ? datos.consecutivo : this.consecutivo;
            this.fecha = !!datos.fecha ? datos.fecha : this.fecha;
            this.cliente.inicializar(datos.cliente);
            this.vendedor.inicializar(datos.vendedor);
            this.valorTotal = !!datos.valor_total ? datos.valor_total : this.valorTotal;
            this.porcentajeComision = !!datos.porcentaje_comision ? datos.porcentaje_comision : this.porcentajeComision;
            this.valorComision = !!datos.valor_comision ? datos.valor_comision : this.valorComision;
            this.totalDescuento = !!datos.total_descuento ? datos.total_descuento : this.totalDescuento;
            this.totalIva = !!datos.total_iva ? datos.total_iva : this.totalIva;

            datos.remisiones.forEach(remision => {
                let objRemision: Remision = new Remision();
                objRemision.inicializar(remision);
                this.remisiones.push(objRemision);
            });

            datos.detalles.forEach(detalle => {
                let objDetalle: DetalleFactura = new DetalleFactura();
                objDetalle.inicializar(detalle);
                this.detalles.push(objDetalle);
            });
        }
    }

}