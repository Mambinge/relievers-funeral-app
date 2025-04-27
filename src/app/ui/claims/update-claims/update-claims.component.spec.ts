import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClaimsComponent } from './update-claims.component';

describe('UpdateClaimsComponent', () => {
  let component: UpdateClaimsComponent;
  let fixture: ComponentFixture<UpdateClaimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateClaimsComponent]
    });
    fixture = TestBed.createComponent(UpdateClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
