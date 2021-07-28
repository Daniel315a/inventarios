import { Component, OnInit } from '@angular/core';
import { Utilidades } from 'src/app/models/utilidades';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /**
   * Variables del diseño
   */

  public nombreUsuario: string = 'Juan';
  public nombreEmpresa: string = 'Decora y transforma';
  public menuActivo: boolean = false;
  
  public labels = {
    cerrarSesion: 'Cerrar sesión'
  };

  constructor() { }

  ngOnInit(): void {
    const usuario = Utilidades.obtenerUsuario();
    this.nombreUsuario = usuario.nombre;
    this.nombreEmpresa = usuario.empresa.nombre;
  }

  public establecerEstiloMenuUsuario(event?){
    this.menuActivo = event.type == 'mouseover' ? true : false;
  }

  public activarMenuBurger()
  {
    this.menuActivo = true;
  }

}
