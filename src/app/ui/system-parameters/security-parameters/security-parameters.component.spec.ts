import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityParametersComponent } from './security-parameters.component';

describe('SecurityParametersComponent', () => {
  let component: SecurityParametersComponent;
  let fixture: ComponentFixture<SecurityParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityParametersComponent]
    });
    fixture = TestBed.createComponent(SecurityParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
