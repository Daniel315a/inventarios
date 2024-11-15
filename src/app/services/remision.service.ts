import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Remision } from "../models/remision";
import { Utilidades } from "../models/utilidades";

@Injectable()
export class RemisionService {

    private url: string = environment.url + 'Remision';

    constructor(
        private _http: HttpClient
    ) { }

    public crear(remision: Remision, idFactura: number): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'crear').
        set('id_factura', idFactura).
        set('id_encargado', remision.encargado.id).
        set('notas', remision.notas).
        set('fecha_entrega', remision.fechaEntrega).
        set('fecha_instalacion', remision.fechaInstalacion);

        return this._http.post(this.url, parametros);
    }

    public actualizar(remision: Remision): Observable<any> {

        console.log(remision.encargado);

        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'actualizar').
        set('id', remision.id).
        set('id_encargado', remision.encargado.id).
        set('notas', remision.notas).
        set('fecha_entrega', remision.fechaEntrega).
        set('fecha_instalacion', remision.fechaInstalacion);

        return this._http.post(this.url, parametros);
    }

    public agregarSoporte(): Observable<any> {
        return null;
    }

    public consultarPorId(): Observable<any> {
        return null;
    }

    public imprimir(): Observable<any> {
        return null;
    }

}