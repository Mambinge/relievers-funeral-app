import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRidersComponent } from './update-riders.component';

describe('UpdateRidersComponent', () => {
  let component: UpdateRidersComponent;
  let fixture: ComponentFixture<UpdateRidersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRidersComponent]
    });
    fixture = TestBed.createComponent(UpdateRidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
