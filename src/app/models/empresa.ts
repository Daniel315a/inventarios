export class Empresa {

    constructor(
        public id: number = 0,
        public nombre: string = ''
    ) {
        
    }

    public inicializar(datos: any): void{
        if(!!datos){
            this.id = !!datos.id ? datos.id : 0;
            this.nombre = !!datos.nombre ? datos.nombre : '';
        }
    }

}