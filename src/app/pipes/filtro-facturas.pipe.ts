import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFacturas'
})
export class FiltroFacturasPipe implements PipeTransform {

  transform(facturas: any, args: any[]): any {
    const resultado = [];
    const fechaInicial: Date = args[1];
    const fechaFinal: Date = args[2];
    const filtroTexto = args[0].toLowerCase();
    
    for(const factura of facturas){
      const nombreCliente = factura.nombreCliente.toLowerCase();
      const nombreVendedor = factura.nombreVendedor.toLowerCase();
      const fecha: Date = factura.fecha;
      
      if((nombreCliente.indexOf(filtroTexto) > -1 || nombreVendedor.indexOf(filtroTexto) > -1) &&
          (fecha >= fechaInicial && fecha <= fechaFinal)){
          resultado.push(factura);
      }
    }

    return resultado;
  }

}
