import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanPremiumsComponent } from './add-plan-premiums.component';

describe('AddPlanPremiumsComponent', () => {
  let component: AddPlanPremiumsComponent;
  let fixture: ComponentFixture<AddPlanPremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlanPremiumsComponent]
    });
    fixture = TestBed.createComponent(AddPlanPremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
