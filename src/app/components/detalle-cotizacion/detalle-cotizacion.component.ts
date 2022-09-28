import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
import { SelectProductosComponent } from '../select-productos/select-productos.component';

@Component({
  selector: 'app-detalle-cotizacion',
  templateUrl: './detalle-cotizacion.component.html',
  styleUrls: ['./detalle-cotizacion.component.css']
})
export class DetalleCotizacionComponent implements OnInit {

  @Input()
  public detalle: DetalleCotizacion;

  /**
   * Propiedades del diseño
   */

  @ViewChild('frmDetalle')
  public frmDetalle: ElementRef;
  @ViewChild('selectProducto')
  public selectProductos: SelectProductosComponent;

  public labels = {
    cantidad: 'Cantidad',
    descripcion: 'Detalle',
    precioUnitario: 'Precio unitario',
    iva: '% IVA'
  }

  constructor() { }

  ngOnInit(): void {
  }

  public calcularTotal() {

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

}
