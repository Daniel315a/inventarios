import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
  providers: [
    PersonaService
  ]
})
export class PersonasComponent implements OnInit, AfterViewInit {

  /**
   * Propiedades del diseño
   */

  public listadoPersonas: Array<any> = new Array<any>(); 
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
    tipoPersona: 'Tipo',
    acciones: 'Acciones'
  }

  constructor(
    private _personaService: PersonaService
  ) { }
  
  ngOnInit(): void {
    this.consultarListado();
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

  private consultarListado(){
    this._personaService.consultarListado().subscribe(
      result => {
        if(result.resultado){
          result.datos.forEach(item => {
            let persona: any = new Object;
            persona.numeroDocumento = item.numero_documento;
            
            if(item.razon_social == ''){
              persona.nombreCompleto = item.nombres + ' ' + item.apellidos;
            } else {
              persona.nombreCompleto = item.razon_social;
            }

            persona.tipoPersona = item.tipo.nombre;

            this.listadoPersonas.push(persona);
          });
        }
      }
    );
  }

}
