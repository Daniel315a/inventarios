import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class UsuarioService {

    private url: string = environment.url + 'Usuario';

    constructor(
        private _http: HttpClient
    ){}

    public login(usuario: string, contrasenna: string): Observable<any> {
        const parametros: HttpParams = new HttpParams().
        set('solicitud', 'login').
        set('nombre', usuario).
        set('contrasenna', contrasenna);

        return this._http.post(this.url, parametros);
    }

}