import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';
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

  public limpiarProducto(){
    this.producto = new Producto();
  }

}
