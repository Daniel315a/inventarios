import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Utilidades } from 'src/app/models/utilidades';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-select-productos',
  templateUrl: './select-productos.component.html',
  styleUrls: ['./select-productos.component.css'],
  providers: [
    ProductoService
  ]
})
export class SelectProductosComponent implements OnInit {

  public producto: Producto = new Producto();
  public productos: Array<Producto> = new Array<Producto>();

  constructor(
    private _productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.consultarProductos();
  }

  public consultarProductos(){
    this.productos = new Array<Producto>();
    this.productos.push(
      new Producto(
        0,
        Utilidades.obtenerUsuario().empresa,
        '',
        'Seleccione un producto'
      )
    )

    this._productoService.consultarPorEmpresa().subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(item => {
            this.productos.push(item);
          });
        }
      }
    );
  }

  public productoSeleccionado(){

  }

}
