import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cotizacion } from 'src/app/models/cotizacion';
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
import { Utilidades } from 'src/app/models/utilidades';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { SelectProductosComponent } from '../select-productos/select-productos.component';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  providers: [
    CotizacionService
  ],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class CotizacionComponent implements OnInit, AfterViewInit {

  public cotizacion: Cotizacion = new Cotizacion();
  public detalleActual: DetalleCotizacion = new DetalleCotizacion();
  
  /**
   * Propiedades del diseño
   */

  @ViewChild('divForm')
  public divForm: ElementRef;
  @ViewChild('frmCotizacion')
  public frmCotizacion: ElementRef;
  @ViewChild('selectProducto')
  public selectProductos: SelectProductosComponent;
  public altoTablaDetalles: number = 0;
  public tipoPersonaCliente = Utilidades.getTipoCliente();

  public labels = {
    fecha: 'Fecha',
    cliente: 'Cliente',
    notas: 'Notas',
    cantidad: 'Cantidad',
    descripcion: 'Detalle',
    precioUnitario: 'Precio unitario',
    iva: '% IVA',
    totalIva: 'IVA',
    precioTotal: 'Total'
  };

  public mensajes = {
    cotizacionCreada: 'La cotización se ha creado correctamente'
  }

  public columnas = {
    cantidad: 'Cantidad',
    descripcion: 'Descripción',
    precioUnitario: 'Precio unitario',
    iva: 'IVA',
    precioTotal: 'Total'
  };

  public botones = {
    guardar: 'Guardar',
    eliminar: 'Eliminar'
  };

  constructor(
    private route: ActivatedRoute,
    private _cotizacionService: CotizacionService
  ) { }

  ngOnInit(): void {
    // if(this.route.snapshot.queryParams.id != undefined) {
    //   this.cotizacion.id =  this.route.snapshot.queryParams.id;
    //   this.consultarPorId();
    // }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize();
    });
  }

  public onResize(){
    let altoDivForm:number = this.divForm.nativeElement.offsetHeight;
    let altoDivTabla = window.innerHeight - altoDivForm - 250;
    
    if(altoDivTabla != this.altoTablaDetalles){
      this.altoTablaDetalles = altoDivTabla;
    }
  }

  public clienteSeleccionado(cliente){
    this.cotizacion.cliente = cliente;
  }

  public productoSeleccionado(producto){
    this.detalleActual.producto = producto;
    this.detalleActual.descripcion = this.detalleActual.producto.detalle;
    this.detalleActual.precioUnitario = this.detalleActual.producto.precio;

    const inputDetalle = this.frmCotizacion.nativeElement["detalle"];

    if(inputDetalle) {
      inputDetalle.focus();
    }
  }

  public agregarDetalle(){
    if(this.detalleActual.cantidad > 0){
      this.detalleActual.porcentajeIva = this.detalleActual.porcentajeIva == null ? 0 : this.detalleActual.porcentajeIva;
      this.calcularTotalesDetalle();
      this.cotizacion.detalles.push(this.detalleActual);
      this.detalleActual = new DetalleCotizacion();
      this.calcularTotales();
      this.limpiarDetalle();
    }
  }

  public calcularTotalesDetalle(){
    this.detalleActual.precioTotal = this.detalleActual.cantidad * this.detalleActual.precioUnitario;

    this.detalleActual.valorIva = Utilidades.redondear(this.detalleActual.precioTotal * (this.detalleActual.porcentajeIva / 100));
    this.detalleActual.precioTotal += Utilidades.redondear(this.detalleActual.valorIva);
  }

  public calcularTotales(){
    let total: number = 0;
    let totalIva: number = 0;

    this.cotizacion.detalles.forEach(detalle => {
      totalIva += detalle.valorIva;
      total += detalle.precioTotal;
    });

    this.cotizacion.totalIva = Utilidades.redondear(totalIva);
    this.cotizacion.precioTotal = Utilidades.redondear(total);
  }

  public llenarDetalle(detalle, indice) 
  {
    if(this.detalleActual.producto.referencia == '' && this.cotizacion.id == 0){
      this.detalleActual = detalle;
      this.cotizacion.detalles.splice(indice, 1);
      this.selectProductos.filtroProducto = this.detalleActual.producto.referencia;

      this.calcularTotales();
    }
  }

  public limpiarDetalle(){
    this.detalleActual = new DetalleCotizacion();
    this.selectProductos.filtroProducto = '';
  }

  public guardar() {
    this._cotizacionService.crear(this.cotizacion).subscribe(
      result => {
        Utilidades.dialogSuccess(this.mensajes.cotizacionCreada);
      },
      error => {
        console.log(error);
      }
    );
  }

}