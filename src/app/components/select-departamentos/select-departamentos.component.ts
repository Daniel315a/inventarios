import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-select-departamentos',
  templateUrl: './select-departamentos.component.html',
  styleUrls: ['./select-departamentos.component.css'],
  providers: [
    DepartamentoService
  ]
})
export class SelectDepartamentosComponent implements OnInit {

  public departamento: Departamento = new Departamento();
  public departamentos: Array<Departamento> = new Array<Departamento>();
  @Output()
  public departamentoSeleccionado: EventEmitter<Departamento> = new EventEmitter<Departamento>();

  constructor(
    private _departamentoService: DepartamentoService
  ) { }

  ngOnInit(): void {
    this.consultarDepartamentos();
  }

  private consultarDepartamentos(){
    this._departamentoService.consultarTodos().subscribe(
      result => {
        if(result.resultado){
          this.departamentos = result.datos;
        }
      }
    );
  }

  public onDepartamentoSeleccionado(){
    this.departamento = this.departamentos.find(departamento => departamento.id == this.departamento.id);
    this.departamentoSeleccionado.emit(this.departamento);
  }

}