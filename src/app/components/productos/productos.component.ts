import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Utilidades } from 'src/app/models/utilidades';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [
    ProductoService
  ],
  host: {
    '(window:resize)': 'onResize($event)'
  },
})
export class ProductosComponent implements OnInit, AfterViewInit {

  public producto: Producto = new Producto();
  public productos: Array<any> = new Array<any>();

  /**
   * Propiedades del diseño
   */

  @ViewChild('divForm')
  public divForm: ElementRef;
  public altoDivTabla: number;

  public labels = {
    referencia: 'Referencia',
    detalle: 'Detalle',
    cantidadInterna: 'Cantidad interna',
    cantidadDisponible: 'Cantidad disponible',
    precio: 'Precio unitario'
  };

  public botones = {
    guardar: 'Guardar',
    eliminar: 'Eliminar'
  };

  public columnas = {
    referencia: 'Referencia',
    detalle: 'Detalle',
    acciones: 'Acciones'
  }

  public mensajes = {
    preguntaEliminar: '¿Está seguro de eliminar el registro? Esta opción no se puede deshacer.',
    productoCreado: 'El producto se ha creado correctamente',
    productoActualizado: 'El producto se ha actualizado correctamente'
  }

  constructor(
    private _productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.consultarProductos();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize();
    });
  }

  public onResize(){
    let altoDivForm:number = this.divForm.nativeElement.offsetHeight;
    let altoDivTabla = window.innerHeight - altoDivForm - 110;
    
    if(altoDivTabla != this.altoDivTabla){
      this.altoDivTabla = altoDivTabla;
    }
  }

  public consultarProductos(){
    this._productoService.consultarPorEmpresa().subscribe(
      result => {
        if(result.resultado){
          this.productos = result.datos;
        }
      }
    );
  }

  public consultarPorId(id: number){
    this._productoService.consultarProductoPorId(id).subscribe(
      result => {
        if(result.resultado){
          this.producto = new Producto();
          this.producto.inicializar(result.datos);
        }
      }
    );
  }

  public deshabilitarProducto(){
    Utilidades.dialogPregunta('', this.mensajes.preguntaEliminar, 'Sí, eliminar').then((result) => {
      this._productoService.deshabilitarProducto(this.producto.id).subscribe(
        result => {
          if(result.resultado){
            this.producto = new Producto();
            this.consultarProductos();
          }
        }
      );
    });
  }

  public limpiarProducto(){
    this.producto = new Producto();
  }

  public guardar(){
    if(this.producto.id == 0){
      this.crear();
    } else {
      this.actualizar();
    }
  }

  private crear(){
    this._productoService.crear(this.producto).subscribe(
      result => {
        if(result.resultado){
          this.producto.id = result.datos.id;
          Utilidades.dialogSuccess(this.mensajes.productoCreado);
          this.consultarProductos();
        }
      },
      error => {
        Utilidades.dialogErrorHttp(error.error.codigo_http, error.error.mensaje);
      }
    );
  }

  private actualizar(){
    this._productoService.actualizar(this.producto).subscribe(
      result => {
        if(result.resultado){
          Utilidades.dialogSuccess(this.mensajes.productoActualizado);
          this.consultarProductos();
        }
      },
      error => {
        Utilidades.dialogErrorHttp(error.error.codigo_http, error.error.mensaje);
      }
    );
  }

}
