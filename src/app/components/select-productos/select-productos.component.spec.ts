import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductosComponent } from './select-productos.component';

describe('SelectProductosComponent', () => {
  let component: SelectProductosComponent;
  let fixture: ComponentFixture<SelectProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
