import { AfterViewInit, ApplicationModule, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cotizacion } from 'src/app/models/cotizacion';
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
import { Utilidades } from 'src/app/models/utilidades';
import { CotizacionService } from 'src/app/services/cotizacion.service';

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
  
  /**
   * Propiedades del diseño
   */

  @ViewChild('divForm')
  public divForm: ElementRef;
  @ViewChild('frmCotizacion')
  public frmCotizacion: ElementRef;
  @ViewChild('divDetalles')
  public divDetalles: ElementRef;
  @ViewChild('divTabs')
  public divTabs: ElementRef;
  public altoDetalles: number = 0;
  public tipoPersonaCliente = Utilidades.getTipoCliente();
  public appMovil: boolean = Utilidades.appMovil;
  public pestannaGeneral: boolean = true;
  public generalActivo: boolean = true;
  public detallesActivo: boolean = true;


  public labels = {
    detalles: 'Detalles',
    informacionGeneral: 'Información general',
    fecha: 'Fecha',
    cliente: 'Cliente',
    notas: 'Notas',
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
    eliminar: 'Eliminar',
    agregar: 'Agregar'
  };

  constructor(
    private route: ActivatedRoute,
    private _cotizacionService: CotizacionService
  ) { }

  ngOnInit(): void {
    this.cotizacion.detalles.push(new DetalleCotizacion());

    if(this.appMovil) {
      this.establecerPestanna(true);
    }

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
    if(this.appMovil){
      this.altoDetalles = 270;
    } else {
      let altoDivDetalles: number = 0;
      let altoSuperior: number = 0;

      altoSuperior = this.divForm.nativeElement.offsetHeight;
      altoDivDetalles = window.innerHeight - altoSuperior - 250;

      if(altoDivDetalles != this.altoDetalles){
        this.altoDetalles = altoDivDetalles;
      }
    }
  }

  public clienteSeleccionado(cliente){
    this.cotizacion.cliente = cliente;
  }

  public agregarDetalle(){
    this.cotizacion.detalles.push(new DetalleCotizacion());
    // if(this.detalleActual.cantidad > 0){
    //   this.detalleActual.porcentajeIva = this.detalleActual.porcentajeIva == null ? 0 : this.detalleActual.porcentajeIva;
    //   this.calcularTotalesDetalle();
    //   this.cotizacion.detalles.push(this.detalleActual);
    //   this.detalleActual = new DetalleCotizacion();
    //   this.calcularTotales();
    // }
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

  public establecerPestanna(pestannaGeneral: boolean){
    this.pestannaGeneral = pestannaGeneral;

    if(this.appMovil) {
      if(this.pestannaGeneral) { 
        this.generalActivo = true;
        this.detallesActivo = false;
      } else {
        this.detallesActivo = true;
        this.generalActivo = false;
      }
    }
  }

  public detalleEliminado(indice: number) {
    this.cotizacion.detalles.splice(indice, 1);
  }

}