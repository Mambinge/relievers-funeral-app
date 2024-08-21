import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsParametersComponent } from './claims-parameters.component';

describe('ClaimsParametersComponent', () => {
  let component: ClaimsParametersComponent;
  let fixture: ComponentFixture<ClaimsParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimsParametersComponent]
    });
    fixture = TestBed.createComponent(ClaimsParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
