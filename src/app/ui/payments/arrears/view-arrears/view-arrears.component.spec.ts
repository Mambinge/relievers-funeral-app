import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArrearsComponent } from './view-arrears.component';

describe('ViewArrearsComponent', () => {
  let component: ViewArrearsComponent;
  let fixture: ComponentFixture<ViewArrearsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewArrearsComponent]
    });
    fixture = TestBed.createComponent(ViewArrearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
