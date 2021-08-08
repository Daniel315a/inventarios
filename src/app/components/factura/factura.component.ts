import { Component, OnInit } from '@angular/core';
import { TipoPersona } from 'src/app/models/tipo-persona';
import { Utilidades } from 'src/app/models/utilidades';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  /**
   * Propiedades del diseño
   */

  public tipoPersonaCliente: TipoPersona = Utilidades.getTipoCliente();

  public labels = {
    cliente: 'Cliente'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
