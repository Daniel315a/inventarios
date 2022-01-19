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

  @Input()
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
    this.departamentos = new Array<Departamento>();

    this.departamentos.push(new Departamento(
      0,
      'Seleccione un departamento'
    ));

    this._departamentoService.consultarTodos().subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(departamento => {
            this.departamentos.push(departamento);
          });
        }
      }
    );
  }

  public onDepartamentoSeleccionado(value: number){
    this.departamento = new Departamento();
    this.departamento = this.departamentos.find(objDepartamento => objDepartamento.id == value);
    this.departamentoSeleccionado.emit(this.departamento);
  }

}