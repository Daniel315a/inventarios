import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DetalleFactura } from 'src/app/models/detalle-factura';
import { Factura } from 'src/app/models/factura';
import { TipoPersona } from 'src/app/models/tipo-persona';
import { Utilidades } from 'src/app/models/utilidades';
import { roundHalfEven } from 'round-half-even';
import { FacturaService } from 'src/app/services/factura.service';
import { TxtPersonaComponent } from '../txt-persona/txt-persona.component';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers:[
    FacturaService
  ],
  host: {
    '(window:resize)': 'onResize($event)'
  },
})
export class FacturaComponent implements OnInit, AfterViewInit {

  public factura: Factura = new Factura();
  public detalleActual: DetalleFactura = new DetalleFactura();

  /**
   * Propiedades del diseño
   */

  @ViewChild('divForm')
  public divForm: ElementRef;
  @ViewChild('txtCliente')
  public txtCliente: TxtPersonaComponent;
  @ViewChild('txtVendedor')
  public txtVendedor: TxtPersonaComponent;
  public tipoPersonaCliente: TipoPersona = Utilidades.getTipoCliente();
  public tipoPersonaVendedor: TipoPersona = Utilidades.getTipoVendedor();
  public altoTablaDetalles: number = 0;

  public labels = {
    fecha: 'Fecha',
    cliente: 'Cliente',
    vendedor: 'Vendedor',
    cantidad: 'Cantidad',
    detalle: 'Detalle',
    iva: '% IVA',
    descuento: '% Dto',
    esInstalacion: 'Instalación',
    valorUnitario: 'Precio unitario'
  }

  public columnas = {
    cantidad: 'Cantidad',
    referenciaProducto: 'Producto',
    descripcion: 'Descripción',
    valorUnitario: 'Precio unitario',
    iva: 'IVA',
    descuento: 'Descuento',
    valorTotal: 'Precio total',
    instalacion: 'Instalación'
  }

  public botones = {
    agregarDetalle: 'Agregar detalle',
    guardar: 'Guardar'
  }

  public mensajes = {
    facturaCreada: 'La factura se ha creado correctamente'
  }

  constructor(
    private _facturaService: FacturaService
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
    this.detalleActual.descripcion = this.detalleActual.producto.detalle;
    this.detalleActual.precioUnitario = this.detalleActual.producto.precio;
  }

  public agregarDetalle(){
    if(this.detalleActual.cantidad > 0){
      this.calcularTotalesDetalle();
      this.factura.detalles.push(this.detalleActual);
      this.detalleActual = new DetalleFactura();
    }
  }

  public calcularTotalesDetalle(){
    if(this.detalleActual.porcentajeIva == undefined){
      this.detalleActual.porcentajeIva = 0.00;
    }

    if(this.detalleActual.porcentajeDescuento == undefined){
      this.detalleActual.porcentajeDescuento = 0.00;
    }

    this.detalleActual.precioTotal = this.detalleActual.precioUnitario * this.detalleActual.cantidad;
    
    let valorDescuento = this.detalleActual.precioTotal * (this.detalleActual.porcentajeDescuento / 100);
    this.detalleActual.valorDescuento = Utilidades.redondear(valorDescuento);

    this.detalleActual.precioTotal -= this.detalleActual.valorDescuento;

    let valorIva = this.detalleActual.precioTotal * (this.detalleActual.porcentajeIva / 100);
    this.detalleActual.valorIva = Utilidades.redondear(valorIva);

    this.detalleActual.precioTotal += this.detalleActual.valorIva;
  }

  public establecerDetalleInstalacion(detalle: DetalleFactura, checked){
    detalle.esInstalacion = checked;
  }

  public crear(){
    this._facturaService.crear(this.factura).subscribe(
      result => {
        if(result.resultado){
          this.limpiarCampos();
          Utilidades.dialogSuccess(this.mensajes.facturaCreada);
        }
      }
    );
  }

  public limpiarCampos(){
    this.factura = new Factura();
    this.txtCliente.nombrePersona = '';
    this.txtVendedor.nombrePersona = '';
  }

  public clienteSeleccionado(cliente){
    this.factura.cliente = cliente;
  }

  public vendedorSeleccionado(vendedor){
    this.factura.vendedor = vendedor;
  }
  
}
