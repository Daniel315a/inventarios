import { Component, OnInit } from '@angular/core';
import { Municipio } from 'src/app/models/municipio';

@Component({
  selector: 'app-select-municipios',
  templateUrl: './select-municipios.component.html',
  styleUrls: ['./select-municipios.component.css']
})
export class SelectMunicipiosComponent implements OnInit {

  public municipio: Municipio = new Municipio();
  public municipios: Array<Municipio> = new Array<Municipio>();

  constructor() { }

  ngOnInit(): void {
  }

  public onMunicipioSeleccionado(){

  }

}
