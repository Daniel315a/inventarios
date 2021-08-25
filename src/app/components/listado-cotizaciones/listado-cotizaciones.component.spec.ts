import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCotizacionesComponent } from './listado-cotizaciones.component';

describe('ListadoCotizacionesComponent', () => {
  let component: ListadoCotizacionesComponent;
  let fixture: ComponentFixture<ListadoCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCotizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
