import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkStagesComponent } from './add-work-stages.component';

describe('AddWorkStagesComponent', () => {
  let component: AddWorkStagesComponent;
  let fixture: ComponentFixture<AddWorkStagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWorkStagesComponent]
    });
    fixture = TestBed.createComponent(AddWorkStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
