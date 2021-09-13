import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listado-prestamos',
  templateUrl: './listado-prestamos.component.html',
  styleUrls: ['./listado-prestamos.component.css']
})
export class ListadoPrestamosComponent implements OnInit, AfterViewInit {

  /**
   * Propiedades del diseño
   */

  @ViewChild('divForm')
  public divForm: ElementRef;
  public altoDivTabla: number = 0;

  public labels = {
    buscar: 'Buscar'
  }

  public botones = {
    nuevo: 'Crear préstamo'
  }

  public columnas = {
    documentoCliente: "N° Documento",
    nombreCliente: "Nombre / Razón social",
    fechaPrestamo: "Fecha de préstamo",
    acciones: "Acciones"
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
