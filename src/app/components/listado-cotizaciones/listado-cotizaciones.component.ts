import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Utilidades } from 'src/app/models/utilidades';
import { CotizacionService } from 'src/app/services/cotizacion.service';

@Component({
  selector: 'app-listado-cotizaciones',
  templateUrl: './listado-cotizaciones.component.html',
  styleUrls: ['./listado-cotizaciones.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
  providers: [
    CotizacionService
  ]
})
export class ListadoCotizacionesComponent implements OnInit, AfterViewInit {

  public listadoCotizaciones: Array<any> = new Array<any>();
  public filtro: string;

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
    nuevo: 'Crear cotización',
    excel: 'Exportar a excel'
  }

  public columnas = {
    documentoCliente: 'N° Documento',
    fecha: 'Fecha',
    nombreCliente: 'Nombre / Razón social',
    acciones: 'Acciones'
  }

  constructor(
    private _cotizacionService: CotizacionService
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
    let altoDivForm:number = this.divForm.nativeElement.offsetHeight;
    let altoDivTabla = window.innerHeight - altoDivForm - 140;
    
    if(altoDivTabla != this.altoDivTabla){
      this.altoDivTabla = altoDivTabla;
    }
  }

  public consultarListado(){
    this.listadoCotizaciones = new Array<any>();

    this._cotizacionService.consultarListado().subscribe(
      result => {
        if(result.resultado){
          
          result.datos.forEach(item => {
            let cotizacion: any = new Object();

            cotizacion.id = item.id;
            cotizacion.fecha = item.fecha;
            cotizacion.numeroDocumento = item.numero_documento;
            cotizacion.nombre = item.nombre;

            this.listadoCotizaciones.push(cotizacion);
          });

          this.filtro = '';
        }
      }
    );
  }

  public exportarExcel(){
    this._cotizacionService.consultarInformeCsv(this.filtro).subscribe(
      result => {
        Utilidades.dialogImprimir(result.datos.ruta);
      }
    );
  }

}
