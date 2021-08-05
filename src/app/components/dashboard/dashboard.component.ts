import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Utilidades } from 'src/app/models/utilidades';
import { trigger, style, transition, state, animate } from '@angular/animations';
import { Municipio } from 'src/app/models/municipio';
import { Departamento } from 'src/app/models/departamento';
import { SelectMunicipiosComponent } from '../select-municipios/select-municipios.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('ocultarMenu', [
      state('visible', style({
        transform: 'translateX(0)',
        display: 'block'
      })),
      state('oculto', style({
        transform: 'translateX(-100%)',
        display: 'none'
      })),
      transition('visible => oculto', [
        animate(200)
      ]),
      transition('oculto => visible', [
        animate(200)
      ])
    ]),
    trigger('establecerTamannoContenedor', [
      state('menu-visible', style({
        /**
         * Al total de la pantalla se le restan 315px
         * 300 por el ancho del menú de la izquierda
         * 15 por los padding y margin del menu
         */
        width: (window.innerWidth - 315).toString() + 'px',
        marginLeft: '300px'
      })),
      state('menu-oculto', style({
        width: '100%',
        marginLeft: '0px'
      })), 
      transition('menu-visible => menu-oculto', [
        animate(200)
      ]),
      transition('menu-oculto => menu-visible', [
        animate(200)
      ])
    ])
  ],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  /**
   * Variables del diseño
   */

  public nombreUsuario: string = 'Juan';
  public nombreEmpresa: string = 'Decora y transforma';
  public menuActivo: boolean = false;
  public menuLateralVisible: boolean = true;
  public btnVerMenuLateralVisible: boolean = false;
  @ViewChild('divContenedor')
  public divContenedor: ElementRef;
  @ViewChild('menuLateral')
  public menuLateral: ElementRef;
  
  public labels = {
    cerrarSesion: 'Cerrar sesión'
  };

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const usuario = Utilidades.obtenerUsuario();
    this.nombreUsuario = usuario.nombre;
    this.nombreEmpresa = usuario.empresa.nombre;
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.onResize();
    });
  }

  public establecerEstiloMenuUsuario(event?){
    this.menuActivo = event.type == 'mouseover' ? true : false;
  }

  public activarMenuBurger() {
    this.menuActivo = true;
  }

  public establecerEstadoMenuLateral(){
    this.menuLateralVisible = !this.btnVerMenuLateralVisible;
  }

  public establecerEstadoBtnVerMenu(){
    this.btnVerMenuLateralVisible = !this.menuLateralVisible;
  }

  public ocultarBtnVerMenu(){
    this.btnVerMenuLateralVisible = false;
  }

  public ocultarMenuLateral(){
    this.menuLateralVisible = false;
  }

  public onResize()
  {
    this.renderer.setStyle(this.divContenedor.nativeElement, 'height', (window.innerHeight - 65) + 'px');
    
    if(this.menuLateralVisible){
      let anchoContenedor: string =  (window.innerWidth - 315).toString() + 'px';
      this.renderer.setStyle(this.divContenedor.nativeElement, 'width', anchoContenedor);
    }
    else 
    {
      this.renderer.setStyle(this.divContenedor.nativeElement, 'width', '100%');
    }
  }

  public departamento: Departamento = new Departamento();
  public municipio: Municipio = new Municipio();
  @ViewChild('selectMunicipios')
  public selectMunicipios: SelectMunicipiosComponent;

  public departamentoSeleccionado(departamento){
    this.departamento = departamento;
    this.selectMunicipios.departamento = this.departamento;
    this.selectMunicipios.consultarMunicipios();
  }

}
