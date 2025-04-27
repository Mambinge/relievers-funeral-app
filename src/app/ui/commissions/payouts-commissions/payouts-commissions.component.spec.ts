import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutsCommissionsComponent } from './payouts-commissions.component';

describe('PayoutsCommissionsComponent', () => {
  let component: PayoutsCommissionsComponent;
  let fixture: ComponentFixture<PayoutsCommissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayoutsCommissionsComponent]
    });
    fixture = TestBed.createComponent(PayoutsCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
