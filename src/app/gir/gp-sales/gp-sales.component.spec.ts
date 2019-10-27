import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpSalesComponent } from './gp-sales.component';

describe('GpSalesComponent', () => {
  let component: GpSalesComponent;
  let fixture: ComponentFixture<GpSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
