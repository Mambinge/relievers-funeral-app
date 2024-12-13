import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordPolicyComponent } from './update-password-policy.component';

describe('UpdatePasswordPolicyComponent', () => {
  let component: UpdatePasswordPolicyComponent;
  let fixture: ComponentFixture<UpdatePasswordPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePasswordPolicyComponent]
    });
    fixture = TestBed.createComponent(UpdatePasswordPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
