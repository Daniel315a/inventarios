import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Propiedades del diseño
   */

  public labels = {
    usuario: 'Usuario',
    contrasenna: 'Contraseña',
    mensajeLogin: 'Inicio de sesión'
  };

  public botones = {
    login: 'Ingresar'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
