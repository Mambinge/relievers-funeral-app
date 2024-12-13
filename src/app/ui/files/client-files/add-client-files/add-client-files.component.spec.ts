import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientFilesComponent } from './add-client-files.component';

describe('AddClientFilesComponent', () => {
  let component: AddClientFilesComponent;
  let fixture: ComponentFixture<AddClientFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClientFilesComponent]
    });
    fixture = TestBed.createComponent(AddClientFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
