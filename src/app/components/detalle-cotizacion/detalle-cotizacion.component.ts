import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
import { Utilidades } from 'src/app/models/utilidades';
import { SelectProductosComponent } from '../select-productos/select-productos.component';

@Component({
  selector: 'app-detalle-cotizacion',
  templateUrl: './detalle-cotizacion.component.html',
  styleUrls: ['./detalle-cotizacion.component.css']
})
export class DetalleCotizacionComponent implements OnInit {

  @Input()
  public detalle: DetalleCotizacion;
  @Input()
  public indiceDetalle: number;

  /**
   * Propiedades del diseño
   */

  @ViewChild('frmDetalle')
  public frmDetalle: ElementRef;
  @ViewChild('selectProducto')
  public selectProductos: SelectProductosComponent;
  @Output()
  public detalleEliminado: EventEmitter<number> = new EventEmitter<number>();
  public appMovil: boolean = Utilidades.appMovil;

  public labels = {
    cantidad: 'Cantidad',
    descripcion: 'Detalle',
    precioUnitario: 'Precio unitario',
    iva: '% IVA'
  }

  constructor() { }

  ngOnInit(): void {
  }

  public productoSeleccionado(producto){
    this.detalle.producto = producto;
    this.detalle.descripcion = this.detalle.producto.detalle;
    this.detalle.precioUnitario = this.detalle.producto.precio;

    const inputDetalle = this.frmDetalle.nativeElement["detalle"];

    if(inputDetalle) {
      inputDetalle.focus();
    }
  }

  public calcularTotal(){
    this.detalle.precioTotal = this.detalle.cantidad * this.detalle.precioUnitario;

    this.detalle.valorIva = Utilidades.redondear(this.detalle.precioTotal * (this.detalle.porcentajeIva / 100));
    this.detalle.precioTotal += Utilidades.redondear(this.detalle.valorIva);
  }

  public onDetalleEliminado() {
    this.detalleEliminado.emit(this.indiceDetalle);
  }

}
