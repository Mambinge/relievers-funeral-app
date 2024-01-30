import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFilesComponent } from './update-files.component';

describe('UpdateFilesComponent', () => {
  let component: UpdateFilesComponent;
  let fixture: ComponentFixture<UpdateFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFilesComponent]
    });
    fixture = TestBed.createComponent(UpdateFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
