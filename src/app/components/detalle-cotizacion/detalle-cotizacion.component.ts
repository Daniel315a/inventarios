import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
import { Utilidades } from 'src/app/models/utilidades';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { SelectProductosComponent } from '../select-productos/select-productos.component';

@Component({
  selector: 'app-detalle-cotizacion',
  templateUrl: './detalle-cotizacion.component.html',
  styleUrls: ['./detalle-cotizacion.component.css'],
  providers: [
    CotizacionService
  ]
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
  @Output()
  public totalCalculado: EventEmitter<any> = new EventEmitter<any>();
  public appMovil: boolean = Utilidades.appMovil;

  public labels = {
    cantidad: 'Cantidad',
    descripcion: 'Detalle',
    precioUnitario: 'Precio unitario',
    iva: '% IVA'
  }

  constructor(
    private _cotizacionService: CotizacionService
  ) { }

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
    
    this.totalCalculado.emit();
  }

  public onDetalleEliminado() {
    if(this.detalle.id != 0) {
      this._cotizacionService.eliminarDetalle(this.detalle.id).subscribe(
        result => {
          if(result.resultado) {
            
          }
        }
      );
    }

    this.detalleEliminado.emit(this.indiceDetalle);
  }

}
