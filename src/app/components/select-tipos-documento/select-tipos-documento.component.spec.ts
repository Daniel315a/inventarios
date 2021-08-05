import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTiposDocumentoComponent } from './select-tipos-documento.component';

describe('SelectTiposDocumentoComponent', () => {
  let component: SelectTiposDocumentoComponent;
  let fixture: ComponentFixture<SelectTiposDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTiposDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTiposDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
