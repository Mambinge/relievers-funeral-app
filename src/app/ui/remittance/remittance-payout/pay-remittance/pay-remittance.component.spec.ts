import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRemittanceComponent } from './pay-remittance.component';

describe('PayRemittanceComponent', () => {
  let component: PayRemittanceComponent;
  let fixture: ComponentFixture<PayRemittanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayRemittanceComponent]
    });
    fixture = TestBed.createComponent(PayRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
