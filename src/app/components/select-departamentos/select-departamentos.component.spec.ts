import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDepartamentosComponent } from './select-departamentos.component';

describe('SelectDepartamentosComponent', () => {
  let component: SelectDepartamentosComponent;
  let fixture: ComponentFixture<SelectDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDepartamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
