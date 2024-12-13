import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPasswordPolicyComponent } from './add-password-policy.component';

describe('AddPasswordPolicyComponent', () => {
  let component: AddPasswordPolicyComponent;
  let fixture: ComponentFixture<AddPasswordPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPasswordPolicyComponent]
    });
    fixture = TestBed.createComponent(AddPasswordPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
