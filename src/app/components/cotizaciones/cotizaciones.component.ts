import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cotizacion } from 'src/app/models/cotizacion';
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
import { Utilidades } from 'src/app/models/utilidades';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class CotizacionesComponent implements OnInit, AfterViewInit {

  public cotizacion: Cotizacion = new Cotizacion();
  public detalleActual: DetalleCotizacion = new DetalleCotizacion();
  
  /**
   * Propiedades del diseño
   */

  @ViewChild('divForm')
  public divForm: ElementRef;
  public altoTablaDetalles: number = 100;
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
    let altoDivTabla = window.innerHeight - altoDivForm - 280;
    
    if(altoDivTabla != this.altoTablaDetalles){
      this.altoTablaDetalles = altoDivTabla;
    }
  }

  public productoSeleccionado(producto){
    this.detalleActual.producto = producto;
    this.detalleActual.descripcion = this.detalleActual.producto.detalle;
    this.detalleActual.precioUnitario = this.detalleActual.producto.precio;
  }

  public agregarDetalle(){
    if(this.detalleActual.cantidad > 0){
      this.calcularTotalesDetalle();
      this.cotizacion.detalles.push(this.detalleActual);
      this.detalleActual = new DetalleCotizacion();
      this.calcularTotales();
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

}
