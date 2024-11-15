export class Solicitud {
    
    constructor(
        public id: number = 0,
        public nombre: string = '',
        public nombreVisible: string = ''
    ) {
        
    }

    inicializar(datos: any): void {
        if(!!datos){
            this.id = !!datos.id ? datos.id : 0;
            this.nombre = !!datos.nombre ? datos.nombre : '';
            this.nombreVisible = !!datos.nombre_visible ? datos.nombre_visible : '';
        }
    }
}