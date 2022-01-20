import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProductos'
})
export class FiltroProductosPipe implements PipeTransform {

  transform(productos: any, args: any[]): Array<any> {
    const resultado = [];

    for(const producto of productos) {
      const detalle = producto.detalle.toLowerCase();
      const referencia = producto.referencia.toString().toLowerCase();
      const filtroTexto = args[0].toLowerCase();

      if(detalle.indexOf(filtroTexto) > -1 ||
         referencia.indexOf(filtroTexto) == 0){
          resultado.push(producto);
      }
    }

    return resultado;
  }

}
