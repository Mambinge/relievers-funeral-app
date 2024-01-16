import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStagesComponent } from './work-stages.component';

describe('WorkStagesComponent', () => {
  let component: WorkStagesComponent;
  let fixture: ComponentFixture<WorkStagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkStagesComponent]
    });
    fixture = TestBed.createComponent(WorkStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
