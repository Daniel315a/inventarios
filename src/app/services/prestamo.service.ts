import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Prestamo } from "../models/prestamo";
import { Utilidades } from "../models/utilidades";

@Injectable()
export class PrestamoService{

    private url: string = environment.url + 'Prestamo';

    constructor(
        private _http: HttpClient
    ){}

    public consultarListado(): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'consultar_por_empresa').
        set('empresa', usuario.empresa.id);

        return this._http.get(this.url, {params:  parametros});
    }

    public crear(prestamo: Prestamo): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const detalles: string = JSON.stringify(prestamo.detalles);
        
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'crear').
        set('distribuidor', prestamo.distribuidor.id.toString()).
        set('empleado', prestamo.encargado.id.toString()).
        set('fecha_prestamo', prestamo.fecha).
        set('notas', prestamo.notas).
        set('detalles', detalles);

        return this._http.post(this.url, parametros);
    }

}