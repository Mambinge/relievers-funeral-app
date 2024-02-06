import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountPayoutsComponent } from './add-account-payouts.component';

describe('AddAccountPayoutsComponent', () => {
  let component: AddAccountPayoutsComponent;
  let fixture: ComponentFixture<AddAccountPayoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccountPayoutsComponent]
    });
    fixture = TestBed.createComponent(AddAccountPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
