export class Departamento{

    constructor(
        public id: number = 0,
        public nombre: string = ''
    ){ }

    public inicializar(datos){
        if(!!datos){
            this.id = !!datos.id ? datos.id : this.id;
            this.nombre = !!datos.nombre ? datos.nombre: this.nombre;
        }
    }

}