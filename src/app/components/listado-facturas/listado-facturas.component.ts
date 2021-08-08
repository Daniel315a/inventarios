import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
})
export class ListadoFacturasComponent implements OnInit, AfterViewInit {

  public facturas: Array<any> = new Array<any>();

  /**
   * Propiedades del diseño
   */

  @ViewChild('divForm')
  public divForm: ElementRef;
  public altoDivTabla: number = 200;
  @Input()
  public componenteHijo: boolean = false;

  public labels = {
    buscar: 'Buscar...'
  };

  public columnas = {
    numeroFactura: 'Número de factura',
    nombreCliente: 'Nombre / Razón social del cliente',
    valorTotal: 'Valor total',
    acciones: 'Acciones'
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize();
    });
  }

  public onResize(){
    if(this.componenteHijo){
      return;
    }

    let altoDivForm:number = this.divForm.nativeElement.offsetHeight;
    let altoDivTabla = window.innerHeight - altoDivForm - 110;
    
    if(altoDivTabla != this.altoDivTabla){
      this.altoDivTabla = altoDivTabla;
    }
  }

}
