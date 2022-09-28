export class Elemento {
    
    constructor(
        public id: number = 0,
        public controlador: string = ''
    ) {
        
    }

    inicializar(datos: any): void {
        if(!!datos){
            this.id = !!datos.id ? datos.id : 0;
            this.controlador = !!datos.controlador ? datos.controlador : '';
        }
    }

}