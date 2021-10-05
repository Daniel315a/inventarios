import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPersonas'
})
export class FiltroPersonasPipe implements PipeTransform {

  transform(personas: any, args: any[]): any {
    const resultado = [];

    for(const persona of personas)
    {
      const filtroTexto = args[0].toLowerCase();
      const nombres = persona.nombres.toLowerCase();
      const apellidos = persona.apellidos.toLowerCase();
      const razonSocial = persona.razonSocial.toLowerCase();
      const numeroDocumento = persona.numeroDocumento.toString();
      const tipo = persona.tipo.nombre.toLowerCase();
      
      if(nombres.indexOf(filtroTexto) > -1 ||
          apellidos.indexOf(filtroTexto) > -1 ||
          razonSocial.indexOf(filtroTexto) > -1 ||
          numeroDocumento.indexOf(filtroTexto) > -1 ||
          tipo.indexOf(filtroTexto) > -1){
            resultado.push(persona);
          }

    }

    return resultado;
  }

}
