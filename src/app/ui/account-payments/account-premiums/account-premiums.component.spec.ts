import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPremiumsComponent } from './account-premiums.component';

describe('AccountPremiumsComponent', () => {
  let component: AccountPremiumsComponent;
  let fixture: ComponentFixture<AccountPremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPremiumsComponent]
    });
    fixture = TestBed.createComponent(AccountPremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
