import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathTypeComponent } from './death-type.component';

describe('DeathTypeComponent', () => {
  let component: DeathTypeComponent;
  let fixture: ComponentFixture<DeathTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeathTypeComponent]
    });
    fixture = TestBed.createComponent(DeathTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
