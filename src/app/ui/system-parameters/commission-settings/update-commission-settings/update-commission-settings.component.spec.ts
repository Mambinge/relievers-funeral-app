import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommissionSettingsComponent } from './update-commission-settings.component';

describe('UpdateCommissionSettingsComponent', () => {
  let component: UpdateCommissionSettingsComponent;
  let fixture: ComponentFixture<UpdateCommissionSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCommissionSettingsComponent]
    });
    fixture = TestBed.createComponent(UpdateCommissionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
