import { Departamento } from "./departamento";

export class Municipio {

    constructor(
        public id: number = 0,
        public nombre: string = '',
        public departamento: Departamento = new Departamento()
    ){ }

}