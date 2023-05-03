import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientesComponent } from './nutrientes.component';

describe('NutrientesComponent', () => {
  let component: NutrientesComponent;
  let fixture: ComponentFixture<NutrientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutrientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutrientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
