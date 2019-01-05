import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingCustomerComponent } from './mapping-customer.component';

describe('MappingCustomerComponent', () => {
  let component: MappingCustomerComponent;
  let fixture: ComponentFixture<MappingCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
