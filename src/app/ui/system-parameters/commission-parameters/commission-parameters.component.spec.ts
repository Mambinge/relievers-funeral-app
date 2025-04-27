import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionParametersComponent } from './commission-parameters.component';

describe('CommissionParametersComponent', () => {
  let component: CommissionParametersComponent;
  let fixture: ComponentFixture<CommissionParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommissionParametersComponent]
    });
    fixture = TestBed.createComponent(CommissionParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
