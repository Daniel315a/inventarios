import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { TipoPersona } from 'src/app/models/tipo-persona';
import { Utilidades } from 'src/app/models/utilidades';
import { PersonaService } from 'src/app/services/persona.service';
import { environment } from 'src/environments/environment';
import { PersonasComponent } from '../personas/personas.component';

@Component({
  selector: 'app-txt-persona',
  templateUrl: './txt-persona.component.html',
  styleUrls: ['./txt-persona.component.css'],
  providers: [
    PersonaService
  ]
})
export class TxtPersonaComponent implements OnInit, AfterViewInit {

  public persona: Persona = new Persona();
  public nombrePersona: string = '';

  /**
   * Propiedades del diseño
   */
  @Input()
  public labelPersona: string = '';
  @Input()
  public tipoPersona: TipoPersona = new TipoPersona();
  @ViewChild('listadoPersonas')
  public listadoPersonas: PersonasComponent;
  public modalConsultarPersonasActivo: boolean = false;
  public modalCrearPersonaActivo: boolean = false;

  public labels = {
    numeroDocumento: 'Número de documento',
    nombreCompleto: 'Nombre completo / Razón social'
  };

  constructor(
    private _personaService: PersonaService
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void{
    this.listadoPersonas.consultarListadoPorTipo(this.tipoPersona);
    setTimeout(() => {
      this.listadoPersonas.altoTabla = 300;
    });
  }

  public consultarPersonaPorNumeroDocumento(){
    this._personaService.consultarPorNumeroDocumento(this.persona.numeroDocumento).subscribe(
      result => {
        if(result.resultado){
          this.persona = new Persona();
          this.nombrePersona = '';
          
          this.persona.inicializar(result.datos);
          this.nombrePersona = !!this.persona.razonSocial ? this.persona.razonSocial : this.persona.nombres + ' ' + this.persona.apellidos;
        }
      }
    );
  }

  public consultarPersonaPorId(){
    this._personaService.consultarPorId(this.persona.id).subscribe(
      result => {
        if(result.resultado){
          this.persona = new Persona();
          this.nombrePersona = '';
          
          this.persona.inicializar(result.datos);
          this.nombrePersona = !!this.persona.razonSocial ? this.persona.razonSocial : this.persona.nombres + ' ' + this.persona.apellidos;
        }
      }
    );
  }

  public personaSeleccionada(id: number){
    this.persona.id = id;
    this.consultarPersonaPorId();
    this.cerrarModalConsultarPersonas();
  }

  public abrirModalConsultarPersonas(){
    this.listadoPersonas.consultarListadoPorTipo(this.tipoPersona);
    this.modalConsultarPersonasActivo = true;
  }
  
  public cerrarModalConsultarPersonas(){
    this.modalConsultarPersonasActivo = false;
  }

  public abrirModalCrearPersona(){
    this.modalCrearPersonaActivo = true;
  }
  
  public cerrarModalCrearPersona(){
    this.modalCrearPersonaActivo = false;
  }

  public personaCreada(persona){
    this.persona = persona;
    this.nombrePersona = !!this.persona.razonSocial ? this.persona.razonSocial : this.persona.nombres + ' ' + this.persona.apellidos;
    this.cerrarModalCrearPersona();
  }

}
