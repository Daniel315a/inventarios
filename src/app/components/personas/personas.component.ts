import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { TipoPersona } from 'src/app/models/tipo-persona';
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

  public filtro: string;
  public personas: Array<Persona> = new Array<Persona>();
  @Output()
  public personaSeleccionada:EventEmitter<number> = new EventEmitter<number>();
  public altoTabla: number = 0;
  @Input()
  public esBuscador: boolean = false;
  
  public labels = {
    buscar: 'Buscar...'
  };

  public columnas = {
    numeroDocumento: 'N° documento',
    nombreCompleto: 'Nombre completo / Razón social',
    tipoPersona: 'Tipo',
    acciones: 'Acciones'
  }

  constructor(
    private _personaService: PersonaService
  ) { }
  
  ngOnInit(): void {
  }

  public consultarListado(){
    this.personas = new Array<Persona>();

    this._personaService.consultarListado().subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(item => {
            let persona: Persona = new Persona();
            persona.inicializar(item);

            this.personas.push(persona);
          });
        }
      }
    );
  }

  public consultarListadoPorTipo(tipoPersona: TipoPersona){
    this.personas = new Array<Persona>();

    this._personaService.consultarListadoPorTipo(tipoPersona).subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(item => {
            let persona: Persona = new Persona();
            persona.inicializar(item);

            this.personas.push(persona);
          });
        }
      }
    );
  }

  public consultarEmpleados(){
    this.personas = new Array<Persona>();

    this._personaService.consultarEmpleados().subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(item => {
            let persona: Persona = new Persona();
            persona.inicializar(item);

            this.personas.push(persona);
          });
        }
      }
    );
  }

  private onPersonaSeleccionada(id: number, clickFila: boolean = false){
    if(this.esBuscador && clickFila){
      this.personaSeleccionada.emit(id);
    } else if (!this.esBuscador && !clickFila) {
      this.personaSeleccionada.emit(id);
    }

  }

}
