import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerSemanalComponent } from './planner-semanal.component';

describe('PlannerSemanalComponent', () => {
  let component: PlannerSemanalComponent;
  let fixture: ComponentFixture<PlannerSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerSemanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
