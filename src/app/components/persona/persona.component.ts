import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { SelectMunicipiosComponent } from '../select-municipios/select-municipios.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  public persona: Persona = new Persona();

  /**
   * Propiedades del diseño
   */
  @ViewChild('selectMunicipios')
  public selectMunicipios: SelectMunicipiosComponent;

  public labels = {
    tipo: 'Tipo',
    departamento: 'Departamento',
    municipio: 'Municipio',
    tipoDocumento: 'Tipo de documento',
    numeroDocumento: 'Número de documento'
  };

  constructor() { }

  ngOnInit(): void {
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

}
