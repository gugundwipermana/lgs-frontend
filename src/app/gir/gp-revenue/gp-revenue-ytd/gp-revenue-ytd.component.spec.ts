import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpRevenueYtdComponent } from './gp-revenue-ytd.component';

describe('GpRevenueYtdComponent', () => {
  let component: GpRevenueYtdComponent;
  let fixture: ComponentFixture<GpRevenueYtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpRevenueYtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpRevenueYtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
