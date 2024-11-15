import { AfterViewInit, Component, ElementRef, isDevMode, OnInit, ViewChild } from '@angular/core';
import { DetalleFactura } from 'src/app/models/detalle-factura';
import { Factura } from 'src/app/models/factura';
import { TipoPersona } from 'src/app/models/tipo-persona';
import { Utilidades } from 'src/app/models/utilidades';
import { FacturaService } from 'src/app/services/factura.service';
import { TxtPersonaComponent } from '../txt-persona/txt-persona.component';
import { ActivatedRoute } from '@angular/router';
import { SelectProductosComponent } from '../select-productos/select-productos.component';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { Cotizacion } from 'src/app/models/cotizacion';
import { RemisionComponent } from '../remision/remision.component';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers:[
    FacturaService,
    CotizacionService
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
  @ViewChild('frmFactura')
  public frmFactura: ElementRef;
  @ViewChild('txtCliente')
  public txtCliente: TxtPersonaComponent;
  @ViewChild('txtVendedor')
  public txtVendedor: TxtPersonaComponent;
  @ViewChild('selectProductos')
  public selectProductos: SelectProductosComponent;
  @ViewChild('formRemision')
  public formRemision: RemisionComponent;
  public tipoPersonaCliente: TipoPersona = Utilidades.getTipoCliente();
  public tipoPersonaVendedor: TipoPersona = Utilidades.getTipoVendedor();
  public altoTablaDetalles: number = 0;
  public modalRemisionActivo: boolean = false;

  public labels = {
    fecha: 'Fecha',
    cliente: 'Cliente',
    vendedor: 'Vendedor',
    cantidad: 'Cantidad',
    detalle: 'Detalle',
    iva: '% IVA',
    descuento: '% Dto',
    esInstalacion: 'Instalación',
    valorUnitario: 'Precio unitario',
    comision: 'Comisión (%)',
    totalDescuento: 'Descuento',
    totalIva: 'IVA',
    totalFactura: 'Total',
    valorComision: 'Comisión',
    numeroFactura: 'Número de factura'
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
    guardar: 'Guardar',
    anular: 'Anular',
    remisionar: 'Remisionar'
  }

  public mensajes = {
    facturaCreada: 'La factura se ha creado correctamente',
    preguntaAnular: '¿Está seguro de anular la factura? Esta opción no se puede deshacer.',
    facturaAnulada: 'La factura se ha anulado correctamente'
  }

  constructor(
    private route: ActivatedRoute,
    private _facturaService: FacturaService,
    private _cotizacionService: CotizacionService
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParams.id != undefined) {
      this.factura.id =  this.route.snapshot.queryParams.id;
      this.consultarPorId();
    } else if (this.route.snapshot.queryParams.id_cotizacion != undefined) {
      this.llenarFacturaConCotizacion(this.route.snapshot.queryParams.id_cotizacion);
    }
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize();
    });
  }

  public onResize(){
    let altoDivForm:number = this.divForm.nativeElement.offsetHeight;
    let altoDivTabla = window.innerHeight - altoDivForm - 340;
    
    if(altoDivTabla != this.altoTablaDetalles){
      this.altoTablaDetalles = altoDivTabla;
    }
  }

  public llenarFacturaConCotizacion(idCotizacion: number) {
    this._cotizacionService.consultarPorId(idCotizacion).subscribe(
      result => {
        const cotizacion = new Cotizacion();
        cotizacion.inicializar(result.datos);

        this.factura.cliente = cotizacion.cliente;
        this.factura.vendedor = cotizacion.usuario.persona;

        cotizacion.detalles.forEach(detalleCotizacion => {
          let detalleFactura = new DetalleFactura();

          detalleFactura.cantidad = detalleCotizacion.cantidad;
          detalleFactura.producto = detalleCotizacion.producto;
          detalleFactura.descripcion = detalleCotizacion.descripcion;
          detalleFactura.porcentajeIva = detalleCotizacion.porcentajeIva;
          detalleFactura.valorIva = detalleCotizacion.valorIva;
          detalleFactura.precioUnitario = detalleCotizacion.precioUnitario;
          detalleFactura.precioTotal = detalleCotizacion.precioTotal;

          this.factura.detalles.push(detalleFactura);
        });

        this.calcularTotales();
      },
      error => {
        console.log(error);
      }
    );
  }

  public productoSeleccionado(producto){
    this.detalleActual.producto = producto;
    this.detalleActual.descripcion = this.detalleActual.producto.referencia + ': ' + this.detalleActual.producto.detalle;
    this.detalleActual.precioUnitario = this.detalleActual.producto.precio;
    
    const inputDetalle = this.frmFactura.nativeElement["detalle"];

    if(inputDetalle) {
      inputDetalle.focus();
    }
  }

  public agregarDetalle(){
    if(this.detalleActual.cantidad > 0 && this.detalleActual.producto.id != 0){
      this.calcularTotalesDetalle();
      this.factura.detalles.push(this.detalleActual);
      this.limpiarDetalle();
      this.calcularTotales();
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

  public calcularTotales(){
    let valorTotal: number = 0;
    let valorComision: number = 0;
    let totalDescuento: number = 0;
    let totalIva: number = 0;
    let netoComision: number = 0;

    this.factura.detalles.forEach(detalle => {
      valorTotal += detalle.precioTotal;
      totalDescuento += detalle.valorDescuento;
      totalIva += detalle.valorIva;

      if(!detalle.esInstalacion){
        netoComision += (detalle.cantidad * detalle.precioUnitario) - detalle.valorDescuento;
      }

    });

    valorComision = netoComision * (this.factura.porcentajeComision / 100);

    this.factura.valorTotal = Utilidades.redondear(valorTotal);
    this.factura.totalDescuento = Utilidades.redondear(totalDescuento);
    this.factura.totalIva = Utilidades.redondear(totalIva);
    this.factura.valorComision = Utilidades.redondear(valorComision);
  }

  public establecerDetalleInstalacion(detalle: DetalleFactura, checked){
    detalle.esInstalacion = checked;
    this.calcularTotales();
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
    
    this.txtCliente.persona = new Persona();
    this.txtVendedor.persona = new Persona();

    this.txtCliente.nombrePersona = '';
    this.txtVendedor.nombrePersona = '';

    this.txtCliente.consultarPersonaPorNumeroDocumento();
    this.txtVendedor.consultarPersonaPorNumeroDocumento();
  }

  public consultarPorId(){
    this._facturaService.consultarPorId(this.factura.id).subscribe(
      result => {
        if(result.resultado){
          this.factura = new Factura();
          this.factura.inicializar(result.datos);
          this.txtCliente.persona = this.factura.cliente;
          this.txtVendedor.persona = this.factura.vendedor;
          
          this.txtCliente.consultarPersonaPorNumeroDocumento();
          this.txtVendedor.consultarPersonaPorNumeroDocumento();
        }
      }
    );
  }

  public anularFactura(){
    Utilidades.dialogPregunta('', this.mensajes.preguntaAnular, 'Sí, anular').then((result) => {
      this._facturaService.anular(this.factura.id).subscribe(
        result => {
          if(result.resultado){
            Utilidades.dialogSuccess(this.mensajes.facturaAnulada);
          }
        }
      );
    });
  }

  public vendedorSeleccionado(vendedor){
    this.factura.vendedor = vendedor;
  }
 
  public clienteSeleccionado(cliente){
    this.factura.cliente = cliente;
  }

  public detalleSeleccionado(detalle: DetalleFactura, indiceDetalle: number){
    if(this.detalleActual.producto.referencia == '' && this.factura.id == 0){
      this.detalleActual = detalle;
      this.factura.detalles.splice(indiceDetalle, 1);
      this.selectProductos.producto = this.detalleActual.producto;
      this.selectProductos.filtroProducto = this.detalleActual.producto.referencia;
      this.calcularTotales();
    }
  }

  public limpiarDetalle(){
    this.detalleActual = new DetalleFactura();
    this.selectProductos.filtroProducto = '';
  }

  public cerrarModalRemision(){
    this.modalRemisionActivo = false;
  }

  public abrirModalRemision(){
    this.formRemision.factura = this.factura;
    
    if(this.factura.remisiones.length > 0) {
      this.formRemision.llenar(this.factura.remisiones[0]);
    }

    this.modalRemisionActivo = true;
  }

}