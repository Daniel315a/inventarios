import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTiposPersonaComponent } from './select-tipos-persona.component';

describe('SelectTiposPersonaComponent', () => {
  let component: SelectTiposPersonaComponent;
  let fixture: ComponentFixture<SelectTiposPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTiposPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTiposPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
