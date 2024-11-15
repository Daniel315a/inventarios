import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DetallePrestamo } from "../models/detalle-prestamo";
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

    public consultarPorId(id: number): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'consultar_por_id').
        set('id', id.toString());

        return this._http.get(this.url, {params:  parametros});
    }

    public crear(prestamo: Prestamo): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        Utilidades.trim(prestamo);
        
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

    crearDetalle(idPrestamo: number, detalleActual: DetallePrestamo): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        Utilidades.trim(detalleActual);
        
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'crear_detalle').
        set('id_prestamo', idPrestamo.toString()).
        set('id_producto', detalleActual.producto.id.toString()).
        set('cantidad', detalleActual.cantidad.toString());

        return this._http.post(this.url, parametros);
    }

    public actualizar(prestamo: Prestamo): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        Utilidades.trim(prestamo);

        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'actualizar').
        set('id', prestamo.id.toString()).
        set('id_distribuidor', prestamo.distribuidor.id.toString()).
        set('id_empleado', prestamo.encargado.id.toString()).
        set('fecha_devolucion', prestamo.fechaEntrega).
        set('notas', prestamo.notas);

        return this._http.post(this.url, parametros);
    }

    public eliminarDetalle(id: number): Observable<any>  {
        const usuario = Utilidades.obtenerUsuario();

        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'eliminar_detalle').
        set('id', id.toString());

        return this._http.post(this.url, parametros);
    }

    public eliminar(id: number): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();

        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'eliminar').
        set('id', id.toString());

        return this._http.post(this.url, parametros);
    }

}