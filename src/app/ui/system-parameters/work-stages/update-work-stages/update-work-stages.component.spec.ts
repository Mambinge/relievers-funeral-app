import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkStagesComponent } from './update-work-stages.component';

describe('UpdateWorkStagesComponent', () => {
  let component: UpdateWorkStagesComponent;
  let fixture: ComponentFixture<UpdateWorkStagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateWorkStagesComponent]
    });
    fixture = TestBed.createComponent(UpdateWorkStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
