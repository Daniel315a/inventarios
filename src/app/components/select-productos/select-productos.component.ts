import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Utilidades } from 'src/app/models/utilidades';
import { FiltroProductosPipe } from 'src/app/pipes/filtro-productos.pipe';
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
  public productosFiltrados: Array<Producto> = new Array<Producto>();
  public listadoActivo: boolean = false;
  public itemActivo: Producto;
  public filtroProducto: string;
  @Output()
  public productoSeleccionado: EventEmitter<Producto> = new EventEmitter<Producto>();

  constructor(
    private _productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.consultarProductos();
  }

  public consultarProductos(){
    this.productos = new Array<Producto>();

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

  public onProductoSeleccionado(){
    let producto = this.productos.find(producto => producto.id == this.producto.id);
    this.productoSeleccionado.emit(producto);
  }

  public onChangedBusquedaProducto(key){
    this.listadoActivo = false;

    if(this.filtroProducto.length > 1){
      this.productosFiltrados = new FiltroProductosPipe().transform(this.productos, [this.filtroProducto]);

      if(this.productosFiltrados.length > 0){
        this.listadoActivo = true;
      }
    }

    this.controlarDesplazamiento(key);
  }

  public controlarDesplazamiento(key){
    if(this.listadoActivo){
      let indiceActivo: number = this.productosFiltrados.indexOf(this.itemActivo);

      if(key == "ArrowDown"){
        this.itemActivo = this.productosFiltrados[indiceActivo + 1];
      } else if (key == "ArrowUp") {
        this.itemActivo = this.productosFiltrados[indiceActivo - 1];
      }
      else if(key == "Enter") {
        this.establecerProducto(this.productosFiltrados[indiceActivo].referencia);
      }
    }
  }

  public establecerProducto(referencia: string){
    this.itemActivo = this.productosFiltrados.find(producto => producto.referencia == referencia);
    this.producto = this.itemActivo;
    this.filtroProducto = this.producto.referencia;
    this.listadoActivo = false;
    
    this.onProductoSeleccionado();    
  }

}
