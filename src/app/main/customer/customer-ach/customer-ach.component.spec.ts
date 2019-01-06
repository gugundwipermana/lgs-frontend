import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAchComponent } from './customer-ach.component';

describe('CustomerAchComponent', () => {
  let component: CustomerAchComponent;
  let fixture: ComponentFixture<CustomerAchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
