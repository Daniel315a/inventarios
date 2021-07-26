import { Permiso } from "./Permiso";

export class Usuario {
    
    constructor(
        public id: number = 0,
        public nombre: string = '',
        public token: string = '',
        public permisos: Array<Permiso> = new Array<Permiso>(),
        public empresa: Empresa = new Empresa()
    ) {
        
    }

}