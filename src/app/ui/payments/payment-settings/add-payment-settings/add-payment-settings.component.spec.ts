import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentSettingsComponent } from './add-payment-settings.component';

describe('AddPaymentSettingsComponent', () => {
  let component: AddPaymentSettingsComponent;
  let fixture: ComponentFixture<AddPaymentSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPaymentSettingsComponent]
    });
    fixture = TestBed.createComponent(AddPaymentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
