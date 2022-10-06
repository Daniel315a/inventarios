import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { Remision } from 'src/app/models/remision';
import { TxtPersonaComponent } from '../txt-persona/txt-persona.component';

@Component({
  selector: 'app-remision',
  templateUrl: './remision.component.html',
  styleUrls: ['./remision.component.css']
})
export class RemisionComponent implements OnInit {

  public remision: Remision = new Remision();

  /**
   * Propiedades del diseño
   */

  @ViewChild('txtEncargado')
  public txtEncargado: TxtPersonaComponent;

  public labels = {
    despachador: 'Despachador',
    documentoSoporte: 'Soporte',
    seleccionarArchivo: 'Seleccionar archivo',
    notas: 'Notas',
    fechaDespacho: 'Despacho',
    fechaInstalacion: 'Instalación'
  }

  public botones = {
    guardar: 'Guardar',
    eliminar: 'Eliminar',
    imprimir: 'Imprimir'
  }

  constructor() { }

  ngOnInit(): void {
  }

  public encargadoSeleccionado(persona: Persona){

  }

}
