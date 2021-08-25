import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-listado-cotizaciones',
  templateUrl: './listado-cotizaciones.component.html',
  styleUrls: ['./listado-cotizaciones.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
})
export class ListadoCotizacionesComponent implements OnInit, AfterViewInit {

  /**
   * Propiedades del diseño
   */
  public altoDivTabla: number = 0;
  @ViewChild('divForm')
  public divForm: ElementRef;
  public labels = {
    buscar: 'Buscar'
  }

  public botones = {
    nuevo: 'Crear cotización'
  }

  public columnas = {
    documentoCliente: 'N° Documento',
    nombreCliente: 'Nombre / Razón social',
    acciones: 'Acciones'
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize();
    });
  }

  public onResize(){
    let altoDivForm:number = this.divForm.nativeElement.offsetHeight;
    let altoDivTabla = window.innerHeight - altoDivForm - 110;
    
    if(altoDivTabla != this.altoDivTabla){
      this.altoDivTabla = altoDivTabla;
    }
  }

}
