import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  /**
   * Propiedades del diseño
   */

  public labels = {
    cliente: 'Cliente'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
