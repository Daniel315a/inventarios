import { Empresa } from "./empresa";
import { Municipio } from "./municipio";
import { TipoDocumento } from "./tipo-documento";
import { TipoPersona } from "./tipo-persona";

export class Persona{

    constructor(
        public id: number = 0,
        public municipio: Municipio = new Municipio(),
        public tipoPersona: TipoPersona = new TipoPersona(),
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

}