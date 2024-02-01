import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccountApprovalComponent } from './view-account-approval.component';

describe('ViewAccountApprovalComponent', () => {
  let component: ViewAccountApprovalComponent;
  let fixture: ComponentFixture<ViewAccountApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAccountApprovalComponent]
    });
    fixture = TestBed.createComponent(ViewAccountApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
