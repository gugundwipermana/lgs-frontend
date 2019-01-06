import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueYtdComponent } from './revenue-ytd.component';

describe('RevenueYtdComponent', () => {
  let component: RevenueYtdComponent;
  let fixture: ComponentFixture<RevenueYtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueYtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueYtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
