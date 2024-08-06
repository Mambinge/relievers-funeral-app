import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeathTypeComponent } from './update-death-type.component';

describe('UpdateDeathTypeComponent', () => {
  let component: UpdateDeathTypeComponent;
  let fixture: ComponentFixture<UpdateDeathTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDeathTypeComponent]
    });
    fixture = TestBed.createComponent(UpdateDeathTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
