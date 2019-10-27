import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GirFilterComponent } from './gir-filter.component';

describe('GirFilterComponent', () => {
  let component: GirFilterComponent;
  let fixture: ComponentFixture<GirFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
