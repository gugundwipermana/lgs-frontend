import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpRevenueCurrentComponent } from './gp-revenue-current.component';

describe('GpRevenueCurrentComponent', () => {
  let component: GpRevenueCurrentComponent;
  let fixture: ComponentFixture<GpRevenueCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpRevenueCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpRevenueCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
