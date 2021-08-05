import { Component, OnInit, EventEmitter } from '@angular/core';
import { Departamento } from 'src/app/models/departamento';
import { Municipio } from 'src/app/models/municipio';
import { MunicipioService } from 'src/app/services/municipio.service';

@Component({
  selector: 'app-select-municipios',
  templateUrl: './select-municipios.component.html',
  styleUrls: ['./select-municipios.component.css'],
  providers: [
    MunicipioService
  ]
})
export class SelectMunicipiosComponent implements OnInit {

  public departamento: Departamento = new Departamento();
  public municipio: Municipio = new Municipio();
  public municipios: Array<Municipio> = new Array<Municipio>();
  public municipioSeleccionado: EventEmitter<Municipio> = new EventEmitter<Municipio>();

  constructor(
    private _municipioService: MunicipioService
  ) { }

  ngOnInit(): void {
    this.consultarMunicipios();
  }

  public onMunicipioSeleccionado(){
    let municipio = this.municipios.find(municipio => municipio.id == this.municipio.id);
    this.municipioSeleccionado.emit(municipio);
  }

  public consultarMunicipios(){
    this._municipioService.consultarPorDepartamento(this.departamento).subscribe(
      result => {
        if(result.resultado){
          this.municipios = result.datos;
        }
      }
    );
  }

}
