import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GirDashboard1Component } from './gir-dashboard1.component';

describe('GirDashboard1Component', () => {
  let component: GirDashboard1Component;
  let fixture: ComponentFixture<GirDashboard1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirDashboard1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirDashboard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
