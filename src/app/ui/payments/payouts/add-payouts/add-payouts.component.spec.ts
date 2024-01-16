import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayoutsComponent } from './add-payouts.component';

describe('AddPayoutsComponent', () => {
  let component: AddPayoutsComponent;
  let fixture: ComponentFixture<AddPayoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPayoutsComponent]
    });
    fixture = TestBed.createComponent(AddPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
