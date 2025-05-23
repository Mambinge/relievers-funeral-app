import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePermissionsComponent } from './update-permissions.component';

describe('UpdatePermissionsComponent', () => {
  let component: UpdatePermissionsComponent;
  let fixture: ComponentFixture<UpdatePermissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePermissionsComponent]
    });
    fixture = TestBed.createComponent(UpdatePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
