import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeathPeriodComponent } from './update-death-period.component';

describe('UpdateDeathPeriodComponent', () => {
  let component: UpdateDeathPeriodComponent;
  let fixture: ComponentFixture<UpdateDeathPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDeathPeriodComponent]
    });
    fixture = TestBed.createComponent(UpdateDeathPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
