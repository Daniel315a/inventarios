import { Component, EventEmitter, OnInit } from '@angular/core';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';

@Component({
  selector: 'app-select-tipos-documento',
  templateUrl: './select-tipos-documento.component.html',
  styleUrls: ['./select-tipos-documento.component.css'],
  providers: [
    TipoDocumentoService
  ]
})
export class SelectTiposDocumentoComponent implements OnInit {

  public tipoDocumento: TipoDocumento = new TipoDocumento();
  public tiposDocumento: Array<TipoDocumento> = new Array<TipoDocumento>();
  public tipoDocumentoSeleccionado: EventEmitter<TipoDocumento> = new EventEmitter<TipoDocumento>();

  constructor(
    private _tipoDocumentoService: TipoDocumentoService
  ) { }

  ngOnInit(): void {
    this.consultarTiposDocumento();
  }

  public onTipoSeleccionado(){
    const tipoDocumento = this.tiposDocumento.find(tipoDocumento => tipoDocumento.id = this.tipoDocumento.id);
    this.tipoDocumentoSeleccionado.emit(tipoDocumento);
  }

  public consultarTiposDocumento(){
    this._tipoDocumentoService.consultarTodos().subscribe(
      result => {
        if(result.resultado){
          this.tiposDocumento = result.datos;
        }
      }
    );
  }

}
