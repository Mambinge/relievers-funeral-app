import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountPremiumsComponent } from './add-account-premiums.component';

describe('AddAccountPremiumsComponent', () => {
  let component: AddAccountPremiumsComponent;
  let fixture: ComponentFixture<AddAccountPremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccountPremiumsComponent]
    });
    fixture = TestBed.createComponent(AddAccountPremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
