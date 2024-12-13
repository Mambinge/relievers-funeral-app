import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsParametersComponent } from './payments-parameters.component';

describe('PaymentsParametersComponent', () => {
  let component: PaymentsParametersComponent;
  let fixture: ComponentFixture<PaymentsParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsParametersComponent]
    });
    fixture = TestBed.createComponent(PaymentsParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
