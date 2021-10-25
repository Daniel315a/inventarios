import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DetallePrestamo } from 'src/app/models/detalle-prestamo';
import { Prestamo } from 'src/app/models/prestamo';
import { TipoPersona } from 'src/app/models/tipo-persona';
import { Utilidades } from 'src/app/models/utilidades';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { TxtPersonaComponent } from '../txt-persona/txt-persona.component';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css'],
  providers:[
    PrestamoService
  ],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class PrestamoComponent implements OnInit, AfterViewInit {

  public prestamo: Prestamo = new Prestamo();
  public detalleActual: DetallePrestamo = new DetallePrestamo();

  /**
   * Propiedades del diseño
   */
  
  @ViewChild('divForm')
  public divForm: ElementRef;
  public tipoPersonaDistribuidor: TipoPersona = Utilidades.getTipoDistribuidor();
  public tipoPersonaVendedor: TipoPersona = Utilidades.getTipoVendedor();
  public altoTablaDetalles: number = 0;
  @ViewChild('txtDistribuidor')
  public txtDistribuidor: TxtPersonaComponent;
  @ViewChild('txtDistribuidor')
  public txtEncargado: TxtPersonaComponent;

  public labels = {
    fecha: 'Fecha',
    distribuidor: 'Distribuidor',
    encargado: 'Encargado',
    cantidad: 'Cantidad',
    notas: 'Notas',
    detalle: 'Detalle',
    fechaEntrega: 'Fecha de entrega'
  };

  public columnas = {
    cantidad: 'Cantidad',
    producto: 'Producto'
  }

  public botones = {
    guardar: 'Guardar',
    registrarEntrega: 'Registrar devolución',
    eliminar: 'Eliminar'
  }

  public mensajes = {
    registroCreado: 'El registro se ha creado correctamente'
  }

  constructor(
    private _prestamoService: PrestamoService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize();
    });
  }

  public onResize(){
    let altoDivForm:number = this.divForm.nativeElement.offsetHeight;
    let altoDivTabla = window.innerHeight - altoDivForm - 160;
    
    if(altoDivTabla != this.altoTablaDetalles){
      this.altoTablaDetalles = altoDivTabla;
    }
  }

  public productoSeleccionado(producto){
    this.detalleActual.producto = producto;
  }

  public agregarDetalle(){
    this.prestamo.detalles.push(this.detalleActual);
    this.detalleActual = new DetallePrestamo();
  }

  public limpiar(){
    this.prestamo = new Prestamo();
    this.txtDistribuidor.nombrePersona = '';
    this.txtEncargado.nombrePersona = '';
  }

  public guardar(){
    if(this.prestamo.id == 0){
      this.crear();
    } else {
      this.actualizar();
    }
  }

  public crear(){
    this._prestamoService.crear(this.prestamo).subscribe(
      result => {
        if(result.resultado){
          this.prestamo.id = result.datos.id;
          Utilidades.dialogSuccess(this.mensajes.registroCreado);
        }
      }
    );
  }

  public actualizar(){}

}
