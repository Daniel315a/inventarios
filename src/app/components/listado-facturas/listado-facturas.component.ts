import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.css'],
  providers: [
    FacturaService
  ],
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

  public botones = {
    nuevo: 'Crear factura'
  }

  constructor(
    private _facturaService: FacturaService
  ) { }

  ngOnInit(): void {
    this.consultarListado();
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

  public consultarListado(){
    this.facturas = new Array<any>();

    this._facturaService.consultarListado().subscribe(
      result => {
        if(result.resultado){
          
          result.datos.forEach(item => {
            let factura: any = new Object();

            factura.id = item.id;
            factura.consecutivo = item.consecutivo;
            factura.fecha = item.fecha;
            factura.nombreCliente = item.nombre_cliente;
            factura.valorTotal = item.valor_total;

            this.facturas.push(factura);
          });

        }
      }
    );

    console.log(this.facturas);
  }

}
