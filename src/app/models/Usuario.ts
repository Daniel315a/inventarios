import { Permiso } from "./permiso";
import { Empresa } from "./empresa"

export class Usuario {
        
    constructor(
        public id: number = 0,
        public nombre: string = '',
        public token: string = '',
        public permisos: Array<Permiso> = new Array<Permiso>(),
        public empresa: Empresa = new Empresa()
    ) {
        
    }

    public inicializar(datos: any): void {
        if(!!datos){
            this.id = !!datos.id ? datos.id : 0;
            this.nombre = !!datos.nombre ? datos.nombre : '';
            this.token = !!datos.token ? datos.token : '';
            this.empresa = new Empresa();
            
            this.empresa.inicializar(datos.empresa);

            let permisos: Array<any> = !!datos.permisos ? datos.permisos : new Array<any>();

            permisos.forEach(permiso => {
                let objPermiso: Permiso = new Permiso();
                
                objPermiso.inicializar(permiso);
                this.permisos.push(objPermiso);
            });

        }
    }

}