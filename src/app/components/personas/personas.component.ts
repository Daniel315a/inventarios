import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
  providers: [
    PersonaService
  ]
})
export class PersonasComponent implements OnInit {

  /**
   * Propiedades del diseño
   */

  public listadoPersonas: Array<any> = new Array<any>();
  @Output()
  public personaSeleccionada:EventEmitter<number> = new EventEmitter<number>();
  public altoTabla: number = 0;

  public labels = {
    buscar: 'Buscar...'
  };

  public columnas = {
    numeroDocumento: 'Número de documento',
    nombreCompleto: 'Nombre completo / Razón social',
    tipoPersona: 'Tipo',
    acciones: 'Acciones'
  }

  constructor(
    private _personaService: PersonaService
  ) { }
  
  ngOnInit(): void {
    this.consultarListado();
  }

  private consultarListado(){
    this._personaService.consultarListado().subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(item => {
            let persona: Persona = new Persona();
            persona.inicializar(item);

            this.listadoPersonas.push(persona);
          });
        }
      }
    );
  }

  private onPersonaSeleccionada(id: number){
    this.personaSeleccionada.emit(id);
  }

}
