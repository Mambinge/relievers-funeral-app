import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlanPremiumsComponent } from './update-plan-premiums.component';

describe('UpdatePlanPremiumsComponent', () => {
  let component: UpdatePlanPremiumsComponent;
  let fixture: ComponentFixture<UpdatePlanPremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePlanPremiumsComponent]
    });
    fixture = TestBed.createComponent(UpdatePlanPremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
