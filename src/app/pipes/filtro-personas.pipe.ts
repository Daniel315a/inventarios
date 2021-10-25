import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPersonas'
})
export class FiltroPersonasPipe implements PipeTransform {

  transform(personas: any, args: any[]): any {
    const resultado = [];
    let iteraciones: number = 0;

    for(const persona of personas)
    {
      iteraciones++;

      const nombres = persona.nombres.toLowerCase();
      const apellidos = persona.apellidos.toLowerCase();
      const razonSocial = persona.razonSocial.toLowerCase();
      const numeroDocumento = persona.numeroDocumento.toString();
      const tipo = persona.tipo.nombre.toLowerCase();
      const filtroTexto = args[0].toLowerCase();
      
      if(nombres.indexOf(filtroTexto) > -1 ||
          apellidos.indexOf(filtroTexto) > -1 ||
          razonSocial.indexOf(filtroTexto) > -1 ||
          numeroDocumento.indexOf(filtroTexto) > -1 ||
          tipo.indexOf(filtroTexto) > -1){
            resultado.push(persona);
          }
    }

    return iteraciones > 0 ? resultado : personas;
  }

}
