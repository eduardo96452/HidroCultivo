import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirecalidadComponent } from './airecalidad.component';

describe('AirecalidadComponent', () => {
  let component: AirecalidadComponent;
  let fixture: ComponentFixture<AirecalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirecalidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirecalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
