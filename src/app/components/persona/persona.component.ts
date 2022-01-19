import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Departamento } from 'src/app/models/departamento';
import { Municipio } from 'src/app/models/municipio';
import { Persona } from 'src/app/models/persona';
import { Utilidades } from 'src/app/models/utilidades';
import { PersonaService } from 'src/app/services/persona.service';
import { PersonasComponent } from '../personas/personas.component';
import { SelectDepartamentosComponent } from '../select-departamentos/select-departamentos.component';
import { SelectMunicipiosComponent } from '../select-municipios/select-municipios.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  providers: [
    PersonaService
  ],
  host: {
    '(window:resize)': 'onResize($event)'
  },
})
export class PersonaComponent implements OnInit, AfterViewInit {

  public persona: Persona = new Persona();

  /**
   * Propiedades del diseño
   */
  @ViewChild('divForm')
  public divForm: ElementRef;
  @ViewChild('listadoPersonas')
  public listadoPersonas: PersonasComponent;
  @ViewChild('selectMunicipios')
  public selectMunicipios: SelectMunicipiosComponent;
  @ViewChild('selectDepartamentos')
  public selectDepartamentos: SelectDepartamentosComponent;
  @Input()
  public creacionPersona: boolean = false;
  @Output()
  public personaCreada: EventEmitter<Persona> = new EventEmitter<Persona>();

  public labels = {
    tipo: 'Tipo',
    departamento: 'Departamento',
    municipio: 'Municipio',
    domicilio: 'Domicilio',
    identificacion: 'Identificación',
    numeroDocumento: 'Número de documento',
    nombreCompleto: 'Nombre completo',
    nombres: 'Nombres',
    apellidos: 'Apellidos',
    razonSocial: 'Razón social',
    contacto: 'Contacto',
    direccion: 'Direccion',
    telefono: 'telefono',
    email: 'E-mail'
  };

  public botones = {
    eliminar: 'Eliminar',
    guardar: 'Guardar'
  }

  public mensajes = {
    personaCreada: 'La persona se ha creado correctamente',
    personaActualizada: 'La persona se ha actualizado correctamente',
    preguntaEliminar: '¿Está seguro de eliminar el registro? Esta opción no se puede deshacer.',
    personaEliminada: 'La persona se ha eliminado correctamente'
  }

  constructor(
    private _personaService: PersonaService
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    if(!this.creacionPersona){
      this.listadoPersonas.consultarListado();
      setTimeout(() => {
        this.onResize();
      });
    }
  }

  public departamentoSeleccionado(departamento){
    this.persona.municipio.departamento = departamento;
    this.selectMunicipios.departamento = this.persona.municipio.departamento;
    this.selectMunicipios.consultarMunicipios();
  }

  public municipioSeleccionado(municipio){
    this.persona.municipio = municipio;
  }

  public tipoPersonaSeleccionado(tipoPersona){
    this.persona.tipo = tipoPersona;
  }

  public tipoDocumentoSeleccionado(tipoDocumento){
    this.persona.tipoDocumento = tipoDocumento;
  }

  public onResize(){
    if(!this.creacionPersona){
      let altoDivForm:number = this.divForm.nativeElement.offsetHeight;
      let altoDivTabla = window.innerHeight - altoDivForm - 140;
      
      if(altoDivTabla != this.listadoPersonas.altoTabla){
        this.listadoPersonas.altoTabla = altoDivTabla;
      }
    }
  }

  public personaSeleccionada(id: number){
    this._personaService.consultarPorId(id).subscribe(
      result => {
        if(result.datos){
          this.persona = new Persona();
          this.persona.inicializar(result.datos);

          this.establecerMunicipio();
        }
      }
    );
  }

  public guardar(){
   if(this.persona.id == 0){
     this.crear();
   } else {
     this.actualizar();
   }
  }

  private crear(){
    this._personaService.crear(this.persona).subscribe(
      result=> {
        if(result.resultado){
          this.persona.id = result.datos.id;
          
          if(this.creacionPersona){
            this.personaCreada.emit(this.persona);
          } else {
            this.listadoPersonas.consultarListado();
          }

          Utilidades.dialogSuccess(this.mensajes.personaCreada);
        }
      },
      error => {
        Utilidades.dialogErrorHttp(error.error.codigo_http, error.error.mensaje);
      }
    );
  }

  private actualizar(){
    this._personaService.actualizar(this.persona).subscribe(
      result=> {
        if(result.resultado){
          this.listadoPersonas.consultarListado();
          Utilidades.dialogSuccess(this.mensajes.personaActualizada);
        }
      },
      error => {
        Utilidades.dialogErrorHttp(error.error.codigo_http, error.error.mensaje);
      }
    );
  }

  public eliminar(){
    Utilidades.dialogPregunta('', this.mensajes.preguntaEliminar, 'Sí, eliminar').then(
      result => {
        if(result.isConfirmed){
          this._personaService.eliminar(this.persona.id).subscribe(
            result=> {
              if(result.resultado){
                this.listadoPersonas.consultarListado();
                this.limpiar();
                Utilidades.dialogSuccess(this.mensajes.personaEliminada);
              }
            },
            error => {
              Utilidades.dialogErrorHttp(error.error.codigo_http, error.error.mensaje);
            }
          );
        }
    });
  }

  public limpiar(){
    this.persona = new Persona();
    this.establecerMunicipio();
  }
  
  public establecerMunicipio(){
    this.selectDepartamentos.departamento = this.persona.municipio.departamento;
    this.selectMunicipios.departamento = this.persona.municipio.departamento;
    this.selectMunicipios.consultarMunicipios(this.persona.municipio);
  }

}