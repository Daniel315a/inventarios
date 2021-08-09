import { Producto } from "./producto";

export class DetallePrestamo{

    constructor(
        public id: number = 0,
        public cantidad: number = 0,
        public producto: Producto = new Producto()
    ){}

}