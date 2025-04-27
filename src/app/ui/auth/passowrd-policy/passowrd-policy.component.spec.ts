import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassowrdPolicyComponent } from './passowrd-policy.component';

describe('PassowrdPolicyComponent', () => {
  let component: PassowrdPolicyComponent;
  let fixture: ComponentFixture<PassowrdPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassowrdPolicyComponent]
    });
    fixture = TestBed.createComponent(PassowrdPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
