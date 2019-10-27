import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpMappingCustomerComponent } from './gp-mapping-customer.component';

describe('GpMappingCustomerComponent', () => {
  let component: GpMappingCustomerComponent;
  let fixture: ComponentFixture<GpMappingCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpMappingCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpMappingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
