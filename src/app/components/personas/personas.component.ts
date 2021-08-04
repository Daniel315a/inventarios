import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class PersonasComponent implements OnInit, AfterViewInit {

  /**
   * Propiedades del diseño
   */

  public altoDivTabla: number = 0;
  @ViewChild('divTabla')
  public divTabla: ElementRef;
  @ViewChild('divForm')
  public divForm: ElementRef;

  public labels = {
    buscar: 'Buscar...'
  };

  public columnas = {
    numeroDocumento: 'Número de documento',
    nombreCompleto: 'Nombre completo',
    tipoPersona: 'Tipo'
  }

  constructor() { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize();
    });
  }

  public onResize(){
    let altoDivForm:number = this.divForm.nativeElement.offsetHeight;
    let altoDivTabla = window.innerHeight - altoDivForm - 110;
    
    if(altoDivTabla != this.altoDivTabla){
      this.altoDivTabla = altoDivTabla;
    }
  }

}
