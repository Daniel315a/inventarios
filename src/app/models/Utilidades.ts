import { Usuario } from "./usuario";

export class Utilidades {
    
    static establecerUsuario(usuario: Usuario): void {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    
    public static verificarLogin(): boolean {
        return !!localStorage.getItem('usr-decoraytransforma');
    }
    
}