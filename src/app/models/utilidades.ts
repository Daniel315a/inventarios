import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { TipoPersona } from "./tipo-persona";
import { Usuario } from "./usuario";

export class Utilidades {
    
    static appMovil: boolean = false;

    static establecerUsuario(usuario: Usuario): void {
      localStorage.setItem('usr-decoraytransforma', JSON.stringify(usuario));
    }
    
    public static verificarLogin(): boolean {
        return !!localStorage.getItem('usr-decoraytransforma');
    }
    
    public static obtenerUsuario(): any{
      return JSON.parse(localStorage.getItem('usr-decoraytransforma'));
    }

    public static encriptar(cadena: string): string {
      return '';
    }

    public static desencriptar(cadena: string): string {
      return '';
    }

    public static dialogSuccess(mensaje: string){
      Swal.fire({
          text: mensaje,
          icon: 'success'
      });
  }
  
  public static dialogPregunta(titulo: string, mensaje: string, mensajeBtnEliminar: string): Promise<any>{
      return Swal.fire({
          title: titulo,
          text: mensaje,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#004570',
          cancelButtonColor: '#BF0A19',
          confirmButtonText: mensajeBtnEliminar,
          cancelButtonText: 'Cancelar'
        });
  }

  public static dialogErrorHttp(codigoHttp: number, mensaje: string){
      Swal.fire({
          title: 'Error http: ' + codigoHttp,
          text: mensaje,
          icon: 'error'
      });
  }

  public static dialogErrorCampos(mensaje: string, campos: Array<string>){
      let li: string = '';

      campos.forEach(campo => {
          li += `<li style="list-style-type: disc;">
                      ${campo}
                  </li>`;
      });

      let html: string = `
          ${mensaje}
          <div style="text-align: left;">
              <br>
              <ul>
                  ${li}
              </ul>
          <div>
      `;
      
      Swal.fire({
          title: `<strong>Error</strong>`,
          icon: 'error',
          html: html
      })
  }

  public static dialogImprimir(enlace: string){

      let html: string = `
          <p>
              El documento se ha creado correctamente
              <br>
              <a href="${enlace}" target="_blank">
                  Descargar documento
              </a>
          </p>
      `;
      
      Swal.fire({
          icon: 'success',
          html: html
      })
  }

  static getTipoCliente(): TipoPersona {
    return new TipoPersona(
        environment.tipoPersonaCliente.id, 
        environment.tipoPersonaCliente.nombre
    );
  }

  static getTipoVendedor(): TipoPersona {
    return new TipoPersona(
        environment.tipoPersonaVendedor.id, 
        environment.tipoPersonaVendedor.nombre
    );
  }

  static getTipoDistribuidor(): TipoPersona {
    return new TipoPersona(
        environment.tipoPersonaDistribuidor.id, 
        environment.tipoPersonaDistribuidor.nombre
    );
  }

  static redondear(x: number): number {
    return 2 * Math.round(x / 2);  
 }

 static trim(obj: any){
    Object.keys(obj).map(k => obj[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k]);
 }

}