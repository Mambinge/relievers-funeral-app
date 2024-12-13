import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionSettingsComponent } from './commission-settings.component';

describe('CommissionSettingsComponent', () => {
  let component: CommissionSettingsComponent;
  let fixture: ComponentFixture<CommissionSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommissionSettingsComponent]
    });
    fixture = TestBed.createComponent(CommissionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
