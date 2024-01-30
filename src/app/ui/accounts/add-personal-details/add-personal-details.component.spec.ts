import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonalDetailsComponent } from './add-personal-details.component';

describe('AddPersonalDetailsComponent', () => {
  let component: AddPersonalDetailsComponent;
  let fixture: ComponentFixture<AddPersonalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPersonalDetailsComponent]
    });
    fixture = TestBed.createComponent(AddPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
