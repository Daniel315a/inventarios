import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-listado-prestamos',
  templateUrl: './listado-prestamos.component.html',
  styleUrls: ['./listado-prestamos.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
  providers: [
    PrestamoService
  ]
})
export class ListadoPrestamosComponent implements OnInit, AfterViewInit {

  public listadoPrestamos: Array<any> = new Array<any>();

  /**
   * Propiedades del diseño
   */

  @ViewChild('divForm')
  public divForm: ElementRef;
  public altoDivTabla: number = 0;
  public filtro:string;

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

  constructor(
    private _prestamoService: PrestamoService
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
    let altoDivTabla = window.innerHeight - altoDivForm - 110;
    
    if(altoDivTabla != this.altoDivTabla){
      this.altoDivTabla = altoDivTabla;
    }
  }

  public consultarListado(){
    this.listadoPrestamos = new Array<any>();

    this._prestamoService.consultarListado().subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(item => {
            let prestamo: any = new Object();

            prestamo.id = item.id;
            prestamo.numeroDocumento = item.numero_documento;
            prestamo.nombre = item.nombre;
            prestamo.fechaPrestamo = item.fecha_prestamo;
            
            this.listadoPrestamos.push(prestamo);
          });

          this.filtro = '';
        }
      }
    );
  }

}
