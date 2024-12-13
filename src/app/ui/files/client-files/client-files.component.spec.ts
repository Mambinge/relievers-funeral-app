import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFilesComponent } from './client-files.component';

describe('ClientFilesComponent', () => {
  let component: ClientFilesComponent;
  let fixture: ComponentFixture<ClientFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientFilesComponent]
    });
    fixture = TestBed.createComponent(ClientFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
