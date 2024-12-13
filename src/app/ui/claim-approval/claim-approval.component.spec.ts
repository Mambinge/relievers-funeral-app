import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimApprovalComponent } from './claim-approval.component';

describe('ClaimApprovalComponent', () => {
  let component: ClaimApprovalComponent;
  let fixture: ComponentFixture<ClaimApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimApprovalComponent]
    });
    fixture = TestBed.createComponent(ClaimApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
