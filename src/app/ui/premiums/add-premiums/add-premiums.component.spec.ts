import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPremiumsComponent } from './add-premiums.component';

describe('AddPremiumsComponent', () => {
  let component: AddPremiumsComponent;
  let fixture: ComponentFixture<AddPremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPremiumsComponent]
    });
    fixture = TestBed.createComponent(AddPremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
