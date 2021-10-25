import { Producto } from "./producto";

export class DetallePrestamo{

    constructor(
        public id: number = 0,
        public cantidad: number = 0,
        public producto: Producto = new Producto()
    ){}

    public inicializar(datos: any) {
        if(!!datos){
            this.id = datos.id!! ? datos.id : this.id;
            this.cantidad = datos.cantidad!! ? datos.cantidad : this.cantidad;
            
            this.producto.inicializar(datos.producto);
        }
    }

}