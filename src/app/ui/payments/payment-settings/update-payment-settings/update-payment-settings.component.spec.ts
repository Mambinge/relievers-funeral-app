import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentSettingsComponent } from './update-payment-settings.component';

describe('UpdatePaymentSettingsComponent', () => {
  let component: UpdatePaymentSettingsComponent;
  let fixture: ComponentFixture<UpdatePaymentSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePaymentSettingsComponent]
    });
    fixture = TestBed.createComponent(UpdatePaymentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
