import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittancePayoutComponent } from './remittance-payout.component';

describe('RemittancePayoutComponent', () => {
  let component: RemittancePayoutComponent;
  let fixture: ComponentFixture<RemittancePayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemittancePayoutComponent]
    });
    fixture = TestBed.createComponent(RemittancePayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
