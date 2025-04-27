import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClaimsComponent } from './view-claims.component';

describe('ViewClaimsComponent', () => {
  let component: ViewClaimsComponent;
  let fixture: ComponentFixture<ViewClaimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClaimsComponent]
    });
    fixture = TestBed.createComponent(ViewClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
