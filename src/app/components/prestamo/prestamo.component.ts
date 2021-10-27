import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @ViewChild('txtEncargado')
  public txtEncargado: TxtPersonaComponent;
  public modalDevolucionActivo: boolean = false;

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
    producto: 'Producto',
    acciones: 'Acciones'
  }

  public botones = {
    guardar: 'Guardar',
    registrarEntrega: 'Registrar devolución',
    eliminar: 'Eliminar'
  }

  public mensajes = {
    registroCreado: 'El registro se ha creado correctamente',
    registroActualizado: 'El registro se ha actualizado correctamente',
    preguntaEliminar: '¿Está seguro de eliminar el registro? Esta opción no se puede deshacer.',
    registroEliminado: 'El registro se ha eliminado correctamente'
  }

  constructor(
    private route: ActivatedRoute,
    private _prestamoService: PrestamoService
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParams.id != undefined) {
      this.prestamo.id =  this.route.snapshot.queryParams.id;
      this.consultarPorId();
    }
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

  public consultarPorId(){
    this._prestamoService.consultarPorId(this.prestamo.id).subscribe(
      result => {
        if(result.resultado){
          this.prestamo.inicializar(result.datos);
        }
      }
    );
  }

  public agregarDetalle(){
    
    if(this.prestamo.id > 0){
      this._prestamoService.crearDetalle(this.prestamo.id, this.detalleActual).subscribe(
        result => {
          if(result.resultado){
            this.prestamo.detalles.push(this.detalleActual);
            this.detalleActual = new DetallePrestamo();      
          }
        }
      );
    } else {
      this.prestamo.detalles.push(this.detalleActual);
      this.detalleActual = new DetallePrestamo();
    }
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

    this.modalDevolucionActivo = false;
  }

  public crear(){
    this._prestamoService.crear(this.prestamo).subscribe(
      result => {
        if(result.resultado){
          this.prestamo.inicializar(result.datos);
          Utilidades.dialogSuccess(this.mensajes.registroCreado);
        }
      }
    );
  }

  public actualizar(){
    this._prestamoService.actualizar(this.prestamo).subscribe(
      result => {
        if(result.resultado){
          this.prestamo.inicializar(result.datos);
          Utilidades.dialogSuccess(this.mensajes.registroActualizado);
        }
      }
    );
  }

  public eliminarDetalle(detalle: DetallePrestamo){
    if(detalle.id == 0){
      this.quitarDetalleLista(detalle);
    } else {
      this._prestamoService.eliminarDetalle(detalle.id).subscribe(
        result => {
          if(result.resultado){
            this.quitarDetalleLista(detalle);
          }
        }
      );
    }
  }

  private quitarDetalleLista(detalle: DetallePrestamo){
    const indice = this.prestamo.detalles.indexOf(detalle);
    this.prestamo.detalles.splice(indice);
  }

  public eliminar(){
    Utilidades.dialogPregunta('', this.mensajes.preguntaEliminar, 'Sí, eliminar').then(
      result => {
        if(result.isConfirmed){
          this._prestamoService.eliminar(this.prestamo.id).subscribe(
            result => {
              if(result.resultado){
                Utilidades.dialogSuccess(this.mensajes.registroEliminado);
                this.limpiar();
              }
            }
          );
        }
      }
    );
  }

  public cerrarModalDevolucion(){
    this.modalDevolucionActivo = false;
  }

  public abrirModalDevolucion(){
    this.modalDevolucionActivo = true;
  }

}
