import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private _municipioService: MunicipioService
  ) { }

  ngOnInit(): void {
    this.consultarMunicipios();
  }

  public onMunicipioSeleccionado(){

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
