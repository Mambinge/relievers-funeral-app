import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentPremiumsComponent } from './add-payment-premiums.component';

describe('AddPaymentPremiumsComponent', () => {
  let component: AddPaymentPremiumsComponent;
  let fixture: ComponentFixture<AddPaymentPremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPaymentPremiumsComponent]
    });
    fixture = TestBed.createComponent(AddPaymentPremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
