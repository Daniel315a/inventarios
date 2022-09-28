export class Accion {

    constructor(
        public nombre: string = '',
        public valor: boolean = false
    ) {
        
    }

    inicializar(datos: Accion): void {
        if(!!datos){
            this.nombre = !!datos.nombre ? datos.nombre : '';
            this.valor = !!datos.valor ? datos.valor : false;
        }
    }

}