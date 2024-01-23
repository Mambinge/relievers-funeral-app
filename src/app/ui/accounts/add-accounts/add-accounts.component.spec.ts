import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountsComponent } from './add-accounts.component';

describe('AddAccountsComponent', () => {
  let component: AddAccountsComponent;
  let fixture: ComponentFixture<AddAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccountsComponent]
    });
    fixture = TestBed.createComponent(AddAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
