import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Utilidades } from "../models/utilidades";

@Injectable()
export class FacturaService {
 
    private url: string = environment.url + 'Factura';

    constructor(
        private _http: HttpClient
    ){}

    public consultarListado(): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'listado');

        return this._http.get(this.url, { params: parametros });
    }

}