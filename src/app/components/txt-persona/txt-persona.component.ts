import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { TipoPersona } from 'src/app/models/tipo-persona';
import { PersonaService } from 'src/app/services/persona.service';
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

  @Input()
  public nombrePersona: string = '';

  /**
   * Propiedades del diseño
   */
  @Input()
  public persona: Persona = new Persona();
  @Input()
  public labelPersona: string = '';
  @Input()
  public tipoPersona: TipoPersona;
  @Input()
  public consultarEmpleados: boolean;
  @Output()
  public personaSeleccionada: EventEmitter<Persona> = new EventEmitter<Persona>();
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
    setTimeout(() => {
      this.listadoPersonas.altoTabla = 300;

      if(this.persona.id != 0) {
        this.nombrePersona = !!this.persona.razonSocial ? this.persona.razonSocial : this.persona.nombres + ' ' + this.persona.apellidos;
      }
    });
  }

  public consultarPersonaPorNumeroDocumento(){
    if(!!this.persona.numeroDocumento){
      this._personaService.consultarPorNumeroDocumento(this.persona.numeroDocumento).subscribe(
        result => {
          if(result.resultado){
            this.persona = new Persona();
            this.nombrePersona = '';
            
            this.persona.inicializar(result.datos);
            this.nombrePersona = !!this.persona.razonSocial ? this.persona.razonSocial : this.persona.nombres + ' ' + this.persona.apellidos;
            this.onPersonaSeleccionada();
          }
        }
      );
    } else {
      this.persona = new Persona();
      this.nombrePersona = '';
      this.onPersonaSeleccionada();
    }
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

  public personaSeleccionadaEnListado(id: number){
    this.persona.id = id;
    this.consultarPersonaPorId();
    this.cerrarModalConsultarPersonas();
    this.onPersonaSeleccionada();
  }

  public abrirModalConsultarPersonas(){
    if(this.consultarEmpleados == true){
      this.listadoPersonas.consultarEmpleados();
    } else {
      if(this.tipoPersona){
        this.listadoPersonas.consultarListadoPorTipo(this.tipoPersona)
      } else {
        this.listadoPersonas.consultarListado();
      }
    }
    
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

  public onPersonaSeleccionada(){
    this.personaSeleccionada.emit(this.persona);
  }

}
