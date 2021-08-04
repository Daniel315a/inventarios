import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/models/departamento';

@Component({
  selector: 'app-select-departamentos',
  templateUrl: './select-departamentos.component.html',
  styleUrls: ['./select-departamentos.component.css']
})
export class SelectDepartamentosComponent implements OnInit {

  public departamento: Departamento = new Departamento();
  public departamentos: Array<Departamento> = new Array<Departamento>();

  constructor() { }

  ngOnInit(): void {
  }

  public onDepartamentoSeleccionado(){

  }

}