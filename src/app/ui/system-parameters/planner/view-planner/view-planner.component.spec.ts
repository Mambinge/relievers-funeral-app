import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlannerComponent } from './view-planner.component';

describe('ViewPlannerComponent', () => {
  let component: ViewPlannerComponent;
  let fixture: ComponentFixture<ViewPlannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPlannerComponent]
    });
    fixture = TestBed.createComponent(ViewPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
