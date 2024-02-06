import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountApprovalComponent } from './add-account-approval.component';

describe('AddAccountApprovalComponent', () => {
  let component: AddAccountApprovalComponent;
  let fixture: ComponentFixture<AddAccountApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccountApprovalComponent]
    });
    fixture = TestBed.createComponent(AddAccountApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
