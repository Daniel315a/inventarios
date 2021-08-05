import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Departamento } from "../models/departamento";
import { Utilidades } from "../models/utilidades";

@Injectable()
export class MunicipioService {

    private url: string = environment.url + 'Municipio'

    constructor(
        private _http: HttpClient
    ){ }

    public consultarPorDepartamento(departamento: Departamento): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'consultar_por_departamento').
        set('id_departamento', departamento.id.toString());

        return this._http.get(this.url, {params: parametros});
    }

}