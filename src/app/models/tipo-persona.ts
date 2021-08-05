export class TipoPersona {

    constructor(
        public id: number = 0,
        public nombre: string = '',
        public esEmpleado: boolean = false
    ){}

    public inicializar(datos: any){
        if(!!datos){
            this.id = datos.id;
            this.nombre = datos.nombre;
            this.esEmpleado = Boolean(datos.es_empleado);
        }
    }

}