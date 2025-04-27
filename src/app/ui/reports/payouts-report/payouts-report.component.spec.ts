import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutsReportComponent } from './payouts-report.component';

describe('PayoutsReportComponent', () => {
  let component: PayoutsReportComponent;
  let fixture: ComponentFixture<PayoutsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayoutsReportComponent]
    });
    fixture = TestBed.createComponent(PayoutsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
