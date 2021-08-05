import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Utilidades } from "../models/utilidades";

export class TipoPersonaService{

    private url: string = environment.url + 'TipoPersona';

    constructor(
        private _http: HttpClient
    ){}

    public consultarTodos(): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'consultar_todos');

        return this._http.get(this.url, {params: parametros});
    }

}