import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueCurrentComponent } from './revenue-current.component';

describe('RevenueCurrentComponent', () => {
  let component: RevenueCurrentComponent;
  let fixture: ComponentFixture<RevenueCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
