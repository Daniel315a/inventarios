import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { Persona } from 'src/app/models/persona';
import { Remision } from 'src/app/models/remision';
import { Utilidades } from 'src/app/models/utilidades';
import { RemisionService } from 'src/app/services/remision.service';
import { TxtPersonaComponent } from '../txt-persona/txt-persona.component';

@Component({
  selector: 'app-remision',
  templateUrl: './remision.component.html',
  styleUrls: ['./remision.component.css'],
  providers: [
    RemisionService
  ]
})
export class RemisionComponent implements OnInit {
  
  public remision: Remision = new Remision();
  public factura: Factura = new Factura();

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

  public mensajes = {
    remisionCreada: 'La remisión se ha creado correctamente',
    remisionActualizada: 'La remisión se ha actualizado correctamente'
  }

  constructor(
    private _remisionService: RemisionService
  ) { }

  ngOnInit(): void {
  }

  public encargadoSeleccionado(persona){
    this.remision.encargado = persona;
  }

  public guardar() {
    if(this.remision.id == 0) {
      this.crearRemision();
    } else {
      this.actualizarRemision();
    }
  }

  public crearRemision(){
    this._remisionService.crear(this.remision, this.factura.id).subscribe(
      result => {
        if(result.resultado) {
          this.remision.id = result.datos.id;
          Utilidades.dialogSuccess(this.mensajes.remisionCreada);
        }
      }
    );
  }

  public actualizarRemision(){
    this._remisionService.actualizar(this.remision).subscribe(
      result => {
        if(result.resultado) {
          Utilidades.dialogSuccess(this.mensajes.remisionActualizada);
        }
      }
    );
  }

  public llenar(remision: Remision) {
    this.remision = remision;
    this.txtEncargado.persona = this.remision.encargado;
    this.txtEncargado.consultarPersonaPorNumeroDocumento();
  }

}
