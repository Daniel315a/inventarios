import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCotizaciones'
})
export class FiltroCotizacionesPipe implements PipeTransform {

  transform(cotizaciones: any, args: any[]): any {
    const resultado = [];

    for(const cotizacion of cotizaciones) {
      const nombre = cotizacion.nombre.toLowerCase();
      const numeroDocumento = cotizacion.numeroDocumento.toString();
      const filtroTexto = args[0].toLowerCase();

      if(nombre.indexOf(filtroTexto) > -1 ||
          numeroDocumento.indexOf(filtroTexto) > -1){
            resultado.push(cotizacion);
          }
    }

    return resultado;
  }

}
