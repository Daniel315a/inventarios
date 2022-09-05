import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Utilidades } from 'src/app/models/utilidades';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    UsuarioService
  ]
})
export class LoginComponent implements OnInit {

  public usuario: string = '';
  public contrasenna: string = '';

  /**
   * Propiedades del diseño
   */

  public mensaje: string = '';

  public labels = {
    usuario: 'Usuario',
    contrasenna: 'Contraseña',
    mensajeLogin: 'Inicio de sesión'
  };

  public botones = {
    login: 'Ingresar'
  }

  private mensajes = {
    loginIncorrecto: 'Usuario y contraseña incorrectos'
  }

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  public login(): void{
    this._usuarioService.login(this.usuario, this.contrasenna).subscribe(
      result => {
          if(result.resultado){
            let usuario: Usuario = new Usuario();
            usuario.inicializar(result.datos);
            Utilidades.establecerUsuario(usuario);
            window.location.reload();
          } else {
            this.mensaje = this.mensajes.loginIncorrecto;
            setTimeout(() => {
              this.mensaje = '';
            }, 3000);
          }
      }
    );
  }

}