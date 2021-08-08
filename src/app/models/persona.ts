import { Empresa } from "./empresa";
import { Municipio } from "./municipio";
import { TipoDocumento } from "./tipo-documento";
import { TipoPersona } from "./tipo-persona";

export class Persona{

    constructor(
        public id: number = 0,
        public municipio: Municipio = new Municipio(),
        public tipo: TipoPersona = new TipoPersona(),
        public empresa: Empresa = new Empresa(),
        public tipoDocumento: TipoDocumento = new TipoDocumento(),
        public numeroDocumento: string = '',
        public nombres: string = '',
        public apellidos: string = '',
        public razonSocial: string = '',
        public direccion: string = '',
        public telefono: string = '',
        public email: string = ''
    ){}

    public inicializar(datos){
        if(!!datos){
            this.id = !!datos.id ? datos.id : this.id;
            this.numeroDocumento = !!datos.numero_documento ? datos.numero_documento : this.numeroDocumento;
            this.nombres = !!datos.nombres ? datos.nombres : this.nombres;
            this.apellidos = !!datos.apellidos ? datos.apellidos : this.apellidos;
            this.razonSocial = !!datos.razon_social ? datos.razon_social : this.razonSocial;
            this.direccion = !!datos.direccion ? datos.direccion : this.direccion;
            this.telefono = !!datos.telefono ? datos.telefono : this.telefono;
            this.email = !!datos.email ? datos.email : this.email;

            this.tipoDocumento.inicializar(datos.tipo_documento);
            this.tipo.inicializar(datos.tipo);
            this.municipio.inicializar(datos.municipio);
            this.empresa.inicializar(datos.empresa);
        }
    }

}