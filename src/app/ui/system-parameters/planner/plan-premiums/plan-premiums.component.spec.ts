import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPremiumsComponent } from './plan-premiums.component';

describe('PlanPremiumsComponent', () => {
  let component: PlanPremiumsComponent;
  let fixture: ComponentFixture<PlanPremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanPremiumsComponent]
    });
    fixture = TestBed.createComponent(PlanPremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
