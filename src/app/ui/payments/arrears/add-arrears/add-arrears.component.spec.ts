import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrearsComponent } from './add-arrears.component';

describe('AddArrearsComponent', () => {
  let component: AddArrearsComponent;
  let fixture: ComponentFixture<AddArrearsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArrearsComponent]
    });
    fixture = TestBed.createComponent(AddArrearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
