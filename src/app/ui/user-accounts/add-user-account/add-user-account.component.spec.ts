import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAccountComponent } from './add-user-account.component';

describe('AddUserAccountComponent', () => {
  let component: AddUserAccountComponent;
  let fixture: ComponentFixture<AddUserAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserAccountComponent]
    });
    fixture = TestBed.createComponent(AddUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
