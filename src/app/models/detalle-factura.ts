import { Producto } from "./producto";

export class DetalleFactura{

    constructor(
        public id: number = 0,
        public producto: Producto = new Producto(),
        public cantidad: number = undefined,
        public descripcion: string = '', 
        public porcentajeDescuento: number = null,
        public valorDescuento: number = 0.00,
        public porcentajeIva: number = null,
        public valorIva: number = 0.00,
        public precioUnitario: number = null,
        public precioTotal: number = 0.00,
        public esInstalacion: boolean = false
    ){}

    public inicializar(datos){
        if(!!datos){
            this.id = !!datos.id ? datos.id : this.id;
            this.producto.inicializar(datos.producto);
            this.cantidad = !!datos.cantidad ? datos.cantidad : this.cantidad;
            this.descripcion = !!datos.descripcion ? datos.descripcion : this.descripcion;
            this.porcentajeDescuento = !!datos.porcentaje_descuento ? datos.porcentaje_descuento : this.porcentajeDescuento;
            this.valorDescuento = !!datos.valor_descuento ? datos.valor_descuento : this.valorDescuento;
            this.porcentajeIva = !!datos.porcentaje_iva ? datos.porcentaje_iva : this.porcentajeIva;
            this.valorIva = !!datos.valor_iva ? datos.valor_iva : this.valorIva;
            this.precioUnitario = !!datos.precio_unitario ? datos.precio_unitario : this.precioUnitario;
            this.precioTotal = !!datos.precio_total ? datos.precio_total : this.precioTotal;
            this.esInstalacion = !!datos.es_instalacion ? datos.es_instalacion : this.esInstalacion;
        }
    }

}