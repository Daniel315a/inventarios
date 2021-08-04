import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMunicipiosComponent } from './select-municipios.component';

describe('SelectMunicipiosComponent', () => {
  let component: SelectMunicipiosComponent;
  let fixture: ComponentFixture<SelectMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMunicipiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
