import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankDetailsComponent } from './add-bank-details.component';

describe('AddBankDetailsComponent', () => {
  let component: AddBankDetailsComponent;
  let fixture: ComponentFixture<AddBankDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBankDetailsComponent]
    });
    fixture = TestBed.createComponent(AddBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
