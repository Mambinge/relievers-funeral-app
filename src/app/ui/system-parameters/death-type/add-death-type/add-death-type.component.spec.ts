import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeathTypeComponent } from './add-death-type.component';

describe('AddDeathTypeComponent', () => {
  let component: AddDeathTypeComponent;
  let fixture: ComponentFixture<AddDeathTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeathTypeComponent]
    });
    fixture = TestBed.createComponent(AddDeathTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
