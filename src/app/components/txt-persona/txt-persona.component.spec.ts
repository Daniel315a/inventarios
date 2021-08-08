import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtPersonaComponent } from './txt-persona.component';

describe('TxtPersonaComponent', () => {
  let component: TxtPersonaComponent;
  let fixture: ComponentFixture<TxtPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxtPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
