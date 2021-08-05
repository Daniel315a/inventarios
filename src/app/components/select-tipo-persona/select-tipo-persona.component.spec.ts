import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTipoPersonaComponent } from './select-tipo-persona.component';

describe('SelectTipoPersonaComponent', () => {
  let component: SelectTipoPersonaComponent;
  let fixture: ComponentFixture<SelectTipoPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTipoPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTipoPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
