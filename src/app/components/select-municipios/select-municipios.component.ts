import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  @Output()
  public municipioSeleccionado: EventEmitter<Municipio> = new EventEmitter<Municipio>();

  constructor(
    private _municipioService: MunicipioService
  ) { }

  ngOnInit(): void {
    this.consultarMunicipios();
  }

  public onMunicipioSeleccionado(id: number){
    this.municipio = new Municipio();
    this.municipio = this.municipios.find(objMunicipio => objMunicipio.id == id);
    this.municipioSeleccionado.emit(this.municipio);
  }

  public consultarMunicipios(){
    this.municipios = new Array<Municipio>();
    
    this.municipios.push(new Municipio(
      0,
      'Seleccione un municipio'
    ));

    this._municipioService.consultarPorDepartamento(this.departamento).subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(municipio => {
            municipio.departamento = this.departamento;

            this.municipios.push(municipio);
          });

          this.municipio = this.municipios[0];
        }
      }
    );
  }

}
