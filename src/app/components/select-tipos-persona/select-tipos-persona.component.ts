import { Component, OnInit } from '@angular/core';
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

  public tipoPersona: TipoPersona = new TipoPersona();
  public tiposPersona: Array<TipoPersona> = new Array<TipoPersona>();

  constructor(
    private _tipoPersonaService: TipoPersonaService
  ) { }

  ngOnInit(): void {
    this.consultarTiposPersona();
  }

  public consultarTiposPersona(){
    this._tipoPersonaService.consultarTodos().subscribe(
      result => {
        if(result.resultado){
          this.tiposPersona = result.datos;
        }
      }
    );
  }

}
