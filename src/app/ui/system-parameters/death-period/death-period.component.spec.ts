import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathPeriodComponent } from './death-period.component';

describe('DeathPeriodComponent', () => {
  let component: DeathPeriodComponent;
  let fixture: ComponentFixture<DeathPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeathPeriodComponent]
    });
    fixture = TestBed.createComponent(DeathPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
