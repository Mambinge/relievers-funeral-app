import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommissionSettingsComponent } from './add-commission-settings.component';

describe('AddCommissionSettingsComponent', () => {
  let component: AddCommissionSettingsComponent;
  let fixture: ComponentFixture<AddCommissionSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommissionSettingsComponent]
    });
    fixture = TestBed.createComponent(AddCommissionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
