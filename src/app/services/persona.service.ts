import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Persona } from "../models/persona";
import { Utilidades } from "../models/utilidades";

@Injectable()
export class PersonaService {

    private url: string = environment.url + 'Persona';

    constructor(
        private _http: HttpClient
    ){ }

    public consultarListado(): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'consultar_por_empresa').
        set('empresa', usuario.empresa.id);

        return this._http.get(this.url, {params:  parametros});
    }

    public consultarPorId(id: number): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'consultar_por_id').
        set('id', id.toString());

        return this._http.get(this.url, {params:  parametros});
    }

    public crear(persona: Persona): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'crear').
        set('municipio', persona.municipio.id.toString()).
        set('tipo', persona.tipo.id.toString()).
        set('empresa', persona.empresa.id.toString()).
        set('tipo_documento', persona.tipoDocumento.id.toString()).
        set('numero_documento', persona.numeroDocumento).
        set('nombres', persona.nombres).
        set('apellidos', persona.apellidos).
        set('razon_social', persona.razonSocial).
        set('direccion', persona.direccion).
        set('telefono', persona.telefono).
        set('email', persona.email).
        set('habilitada', '1');

        return this._http.post(this.url, parametros);
    }

    public actualizar(persona: Persona): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'actualizar').
        set('id', persona.id.toString()).
        set('municipio', persona.municipio.id.toString()).
        set('tipo', persona.tipo.id.toString()).
        set('empresa', persona.empresa.id.toString()).
        set('tipo_documento', persona.tipoDocumento.id.toString()).
        set('numero_documento', persona.numeroDocumento).
        set('nombres', persona.nombres).
        set('apellidos', persona.apellidos).
        set('razon_social', persona.razonSocial).
        set('direccion', persona.direccion).
        set('telefono', persona.telefono).
        set('email', persona.email).
        set('habilitada', '1');

        return this._http.post(this.url, parametros);
    }

    public eliminar(id: number): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'eliminar').
        set('id', id.toString()).
        set('habilitada', '0');

        return this._http.post(this.url, parametros);
    }

}