import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cotizacion } from "../models/cotizacion";
import { Utilidades } from "../models/utilidades";

@Injectable()
export class CotizacionService {
                
    public url: string = environment.url + 'Cotizacion';

    constructor(
        private _http: HttpClient
    ){}

    public consultarListado(): Observable<any>{
        // TODO: Agregar consulta por empresa
        
        const usuario = Utilidades.obtenerUsuario();
        const solicitud:string = 'consultar_por_usuario';
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', solicitud);

        return this._http.get(this.url, {params:  parametros});
    }

    consultarInformeCsv(filtro: string): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'informe_csv').
        set('texto', filtro);

        return this._http.get(this.url, {params:  parametros});
    }

    public consultarPorId(id: number): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'consultar_por_id').
        set('id', id);

        return this._http.get(this.url, {params:  parametros});
    }

    public crear(cotizacion: Cotizacion): Observable<any>{
        let detalles: string = JSON.stringify(cotizacion.detalles);
        Utilidades.trim(cotizacion);

        detalles = detalles.replace(/precioUnitario/gi, 'precio_unitario');
        detalles = detalles.replace(/porcentajeIva/gi, 'porcentaje_iva');
        detalles = detalles.replace(/valorIva/gi, 'valor_iva');
        detalles = detalles.replace(/precioTotal/gi, 'precio_total');
        detalles = detalles.replace(/true/gi, '1');
        detalles = detalles.replace(/false/gi, '0');

        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'crear').
        set('fecha', cotizacion.fecha).
        set('cliente', cotizacion.cliente.id.toString()).
        set('notas', cotizacion.notas).
        set('total_iva', cotizacion.totalIva.toString()).
        set('precio_total', cotizacion.precioTotal.toString()).
        set('detalles', detalles);

        return this._http.post(this.url, parametros);
    }

    public actualizar(cotizacion: Cotizacion): Observable<any> {
        let detalles: string = JSON.stringify(cotizacion.detalles.filter(cotizacion => cotizacion.id == 0));

        Utilidades.trim(cotizacion);

        detalles = detalles.replace(/precioUnitario/gi, 'precio_unitario');
        detalles = detalles.replace(/porcentajeIva/gi, 'porcentaje_iva');
        detalles = detalles.replace(/valorIva/gi, 'valor_iva');
        detalles = detalles.replace(/precioTotal/gi, 'precio_total');
        detalles = detalles.replace(/true/gi, '1');
        detalles = detalles.replace(/false/gi, '0');

        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'actualizar').
        set('id', cotizacion.id).
        set('cliente', cotizacion.cliente.id.toString()).
        set('notas', cotizacion.notas).
        set('total_iva', cotizacion.totalIva.toString()).
        set('precio_total', cotizacion.precioTotal.toString()).
        set('detalles', detalles);

        return this._http.post(this.url, parametros);
    }

    public eliminarDetalle(idDetalle: number): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'eliminar_detalle').
        set('id', idDetalle);

        return this._http.post(this.url, parametros);
    }

    public eliminar(cotizacion: Cotizacion): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'eliminar').
        set('id', cotizacion.id);

        return this._http.post(this.url, parametros);
    }

}