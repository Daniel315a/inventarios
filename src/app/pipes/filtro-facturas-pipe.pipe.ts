import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFacturas'
})
export class FiltroFacturasPipePipe implements PipeTransform {

  transform(facturas: any, args: any[]): any {
    const resultado = [];
    const fechaInicial: Date = args[1];
    const fechaFinal: Date = args[2];

    for(const factura of facturas){
      const nombreCliente = factura.nombreCliente.toLowerCase();
      const nombreVendedor = factura.nombreVendedor.toLowerCase();
      const fecha: Date = factura.fecha;
      const filtroTexto = args[0].toLowerCase();
      
      if((nombreCliente.indexOf(filtroTexto) > -1 || nombreVendedor.indexOf(filtroTexto) > -1) &&
          (fecha >= fechaInicial && fecha <= fechaFinal)){
          resultado.push(factura);
      }
    }

    return resultado;
  }

}
