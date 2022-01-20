import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Factura } from "../models/factura";
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

    public consultarPorId(id: number): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'por_id').
        set('id', id.toString());

        return this._http.get(this.url, { params: parametros });
    }

    public consultarInformeCsv(fechaInicial: Date, fechaFinal: Date, texto: string): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'informe_csv').
        set('fecha_inicial', fechaInicial.toString().split("T")[0]).
        set('fecha_final', fechaFinal.toString().split("T")[0]).
        set('texto', texto);

        return this._http.get(this.url, { params: parametros });
    }

    public crear(factura: Factura): Observable<any>{
        let detalles: string = JSON.stringify(factura.detalles);
        Utilidades.trim(factura);

        detalles = detalles.replace('porcentajeDescuento', 'porcentaje_descuento');
        detalles = detalles.replace('valorDescuento', 'valor_descuento');
        detalles = detalles.replace('porcentajeIva', 'porcentaje_iva');
        detalles = detalles.replace('valorIva', 'valor_iva');
        detalles = detalles.replace('precioUnitario', 'precio_unitario');
        detalles = detalles.replace('precioTotal', 'precio_total');
        detalles = detalles.replace('esInstalacion', 'es_instalacion');
        detalles = detalles.replace('true', '1');
        detalles = detalles.replace('false', '0');

        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'crear').
        set('fecha', factura.fecha).
        set('id_cliente', factura.cliente.id.toString()).
        set('id_vendedor', factura.vendedor.id.toString()).
        set('valor_total', factura.valorTotal.toString()).
        set('porcentaje_comision', factura.porcentajeComision.toString()).
        set('valor_comision', factura.valorComision.toString()).
        set('total_descuento', factura.totalDescuento.toString()).
        set('total_iva', factura.totalIva.toString()).
        set('detalles', detalles);

        return this._http.post(this.url, parametros);
    }

    public anular(id: number): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'anular').
        set('id', id.toString());

        return this._http.post(this.url, parametros);
    }

}