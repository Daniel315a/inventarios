import { Usuario } from "./usuario";

export class Utilidades {
    
    static establecerUsuario(usuario: Usuario): void {
      localStorage.setItem('usr-decoraytransforma', JSON.stringify(usuario));
    }
    
    public static verificarLogin(): boolean {
        return !!localStorage.getItem('usr-decoraytransforma');
    }
    
    public static obtenerUsuario(): any{
      return JSON.parse(localStorage.getItem('usr-decoraytransforma'));
    }

}