import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClaimApprovalComponent } from './add-claim-approval.component';

describe('AddClaimApprovalComponent', () => {
  let component: AddClaimApprovalComponent;
  let fixture: ComponentFixture<AddClaimApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClaimApprovalComponent]
    });
    fixture = TestBed.createComponent(AddClaimApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
