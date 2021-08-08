import { Departamento } from "./departamento";

export class Municipio {

    constructor(
        public id: number = 0,
        public nombre: string = '',
        public departamento: Departamento = new Departamento()
    ){ }

    public inicializar(datos){
        if(!!datos){
            this.id = !!datos.id ? datos.id : this.id;
            this.nombre = !!datos.nombre ? datos.nombre : this.nombre;
            this.departamento.inicializar(datos.departamento);
        }
    } 

}