import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDependentsComponent } from './update-dependents.component';

describe('UpdateDependentsComponent', () => {
  let component: UpdateDependentsComponent;
  let fixture: ComponentFixture<UpdateDependentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDependentsComponent]
    });
    fixture = TestBed.createComponent(UpdateDependentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
