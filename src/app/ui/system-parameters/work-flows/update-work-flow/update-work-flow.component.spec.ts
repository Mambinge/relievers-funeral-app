import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkFlowComponent } from './update-work-flow.component';

describe('UpdateWorkFlowComponent', () => {
  let component: UpdateWorkFlowComponent;
  let fixture: ComponentFixture<UpdateWorkFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateWorkFlowComponent]
    });
    fixture = TestBed.createComponent(UpdateWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
