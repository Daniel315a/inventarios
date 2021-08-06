import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
})
export class ProductosComponent implements OnInit, AfterViewInit {

  public producto: Producto = new Producto();

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

  constructor() { }

  ngOnInit(): void {
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

}
