import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlansComponent } from './view-plans.component';

describe('ViewPlansComponent', () => {
  let component: ViewPlansComponent;
  let fixture: ComponentFixture<ViewPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPlansComponent]
    });
    fixture = TestBed.createComponent(ViewPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
