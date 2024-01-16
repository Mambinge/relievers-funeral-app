import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPremiumsComponent } from './payment-premiums.component';

describe('PaymentPremiumsComponent', () => {
  let component: PaymentPremiumsComponent;
  let fixture: ComponentFixture<PaymentPremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentPremiumsComponent]
    });
    fixture = TestBed.createComponent(PaymentPremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
