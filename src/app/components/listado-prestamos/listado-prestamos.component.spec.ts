import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPrestamosComponent } from './listado-prestamos.component';

describe('ListadoPrestamosComponent', () => {
  let component: ListadoPrestamosComponent;
  let fixture: ComponentFixture<ListadoPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPrestamosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
