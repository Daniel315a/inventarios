import { Component, Input, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-txt-persona',
  templateUrl: './txt-persona.component.html',
  styleUrls: ['./txt-persona.component.css'],
  providers: [
    PersonaService
  ]
})
export class TxtPersonaComponent implements OnInit {

  public persona: Persona = new Persona();
  public nombrePersona: string = '';

  /**
   * Propiedades del diseño
   */
  @Input()
  public labelPersona: string = '';

  public labels = {
    numeroDocumento: 'Número de documento',
    nombreCompleto: 'Nombre completo / Razón social'
  };

  constructor(
    private _personaService: PersonaService
  ) { }

  ngOnInit(): void {
  }

  public consultarPersonaPorNumeroDocumento(){
    this._personaService.consultarPorNumeroDocumento(this.persona.numeroDocumento).subscribe(
      result => {
        if(result.resultado){
          this.persona.inicializar(result.datos);
          this.nombrePersona = !!this.persona.razonSocial ? this.persona.razonSocial : this.persona.nombres + ' ' + this.persona.apellidos;
        }
      }
    );
  }

}
