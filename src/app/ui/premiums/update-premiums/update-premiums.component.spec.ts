import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePremiumsComponent } from './update-premiums.component';

describe('UpdatePremiumsComponent', () => {
  let component: UpdatePremiumsComponent;
  let fixture: ComponentFixture<UpdatePremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePremiumsComponent]
    });
    fixture = TestBed.createComponent(UpdatePremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
