import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TipoPersona } from 'src/app/models/tipo-persona';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';

@Component({
  selector: 'app-select-tipos-persona',
  templateUrl: './select-tipos-persona.component.html',
  styleUrls: ['./select-tipos-persona.component.css'],
  providers: [
    TipoPersonaService
  ]
})
export class SelectTiposPersonaComponent implements OnInit {

  @Input()
  public tipoPersona: TipoPersona = new TipoPersona();
  public tiposPersona: Array<TipoPersona> = new Array<TipoPersona>();
  @Output()
  public tipoPersonaSeleccionado: EventEmitter<TipoPersona> = new EventEmitter<TipoPersona>();

  constructor(
    private _tipoPersonaService: TipoPersonaService
  ) { }

  ngOnInit(): void {

    setInterval(() => {
      // console.log(this.tipoPersona);
    }, 3000);

    this.consultarTiposPersona();
  }

  public consultarTiposPersona(){
    this.tiposPersona = new Array<TipoPersona>();

    this.tiposPersona.push(
      new TipoPersona(
        0,
        'Seleccione un tipo de persona'
      )
    );

    this._tipoPersonaService.consultarTodos().subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(objTipoPersona => {
            const tipoPersona: TipoPersona = new TipoPersona();
            tipoPersona.inicializar(objTipoPersona);

            this.tiposPersona.push(tipoPersona);
          });
        }
      }
    );
  }

  public onTipoSeleccionado(){
    let tipoPersona = this.tiposPersona.find(tipoPersona => tipoPersona.id == this.tipoPersona.id);
    this.tipoPersonaSeleccionado.emit(tipoPersona);
  }

}
