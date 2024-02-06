import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPayoutsComponent } from './account-payouts.component';

describe('AccountPayoutsComponent', () => {
  let component: AccountPayoutsComponent;
  let fixture: ComponentFixture<AccountPayoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPayoutsComponent]
    });
    fixture = TestBed.createComponent(AccountPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
