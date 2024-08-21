import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeathPeriodComponent } from './add-death-period.component';

describe('AddDeathPeriodComponent', () => {
  let component: AddDeathPeriodComponent;
  let fixture: ComponentFixture<AddDeathPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeathPeriodComponent]
    });
    fixture = TestBed.createComponent(AddDeathPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
