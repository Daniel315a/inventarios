import { Empresa } from "./empresa";

export class Producto{

    constructor(
        public id: number = 0,
        public empresa: Empresa = new Empresa(),
        public referencia: string = '',
        public detalle: string = '',
        public cantidadInterna: number = null,
        public cantidadDisponible: number = null,
        public precio: number = 0.0,
        public habilitado: boolean = false
    ){}

    public inicializar(datos: any){
        if(!!datos){
            this.id = !!datos.id ? datos.id : this.id;
            this.empresa = new Empresa();
            this.referencia = !!datos.referencia ? datos.referencia : this.referencia;
            this.detalle = !!datos.detalle ? datos.detalle : this.detalle;
            this.cantidadInterna = !!datos.cantidad_interna ? datos.cantidad_interna : this.cantidadInterna;
            this.cantidadDisponible = !!datos.cantidad_disponible ? datos.cantidad_disponible : this.cantidadDisponible;
            this.precio = !!datos.precio ? datos.precio : this.precio;
            this.habilitado = !!datos.habilitado ? datos.habilitado == 1 : this.habilitado;

            this.empresa.inicializar(datos.empresa);
        }
    }

}