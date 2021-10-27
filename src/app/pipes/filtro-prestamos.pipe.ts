import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPrestamos'
})
export class FiltroPrestamosPipe implements PipeTransform {

  transform(prestamos: any, args: any[]): unknown {
    const resultado = [];

    for(const prestamo of prestamos) {
      const nombre = prestamo.nombre.toLowerCase();
      const numeroDocumento = prestamo.numeroDocumento.toString();
      const filtroTexto = args[0].toLowerCase();

      if(nombre.indexOf(filtroTexto) > -1 ||
          numeroDocumento.indexOf(filtroTexto) > -1){
            resultado.push(prestamo);
          }
    }

    return resultado;
  }

}
