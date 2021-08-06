import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Producto } from "../models/producto";
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

    public consultarProductoPorId(id: number): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'consultar_por_id').
        set('id', id.toString());

        return this._http.get(this.url, {params: parametros});
    }

    public deshabilitarProducto(id: number): Observable<any> {
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'deshabilitar').
        set('id', id.toString());

        return this._http.post(this.url, parametros);
    }

    public crear(producto: Producto): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        let parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'crear').
        set('id_empresa', usuario.empresa.id).
        set('detalle', producto.detalle).
        set('cantidad_interna', producto.cantidadInterna.toString()).
        set('cantidad_disponible', producto.cantidadDisponible.toString()).
        set('precio', producto.precio.toString());

        if(producto.referencia != ''){
            parametros = parametros.set('referencia', producto.referencia);
        }

        return this._http.post(this.url, parametros);
    }

    public actualizar(producto: Producto): Observable<any>{
        const usuario = Utilidades.obtenerUsuario();
        const parametros: HttpParams = new HttpParams().
        set('token', usuario.token).
        set('solicitud', 'actualizar').
        set('id', producto.id.toString()).
        set('detalle', producto.detalle).
        set('cantidad_interna', producto.cantidadInterna.toString()).
        set('cantidad_disponible', producto.cantidadDisponible.toString()).
        set('precio', producto.precio.toString());

        return this._http.post(this.url, parametros);
    }

}