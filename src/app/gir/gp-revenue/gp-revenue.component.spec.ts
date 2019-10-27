import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpRevenueComponent } from './gp-revenue.component';

describe('GpRevenueComponent', () => {
  let component: GpRevenueComponent;
  let fixture: ComponentFixture<GpRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
