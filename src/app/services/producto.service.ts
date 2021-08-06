import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Utilidades } from "../models/utilidades";

@Injectable()
export class ProductoService {

    private url: string = environment.url + "Producto";

    constructor(
        private _http: HttpClient
    ){}

    public consultarPorEmpresa(): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'consultar_de_empresa').
        set('id_empresa', usuario.empresa.id);

        return this._http.get(this.url, {params: parametros});
    }

}