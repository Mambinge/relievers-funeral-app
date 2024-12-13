import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCommissionComponent } from './pay-commission.component';

describe('PayCommissionComponent', () => {
  let component: PayCommissionComponent;
  let fixture: ComponentFixture<PayCommissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayCommissionComponent]
    });
    fixture = TestBed.createComponent(PayCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
