import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpCompleteComponent } from './gp-complete.component';

describe('GpCompleteComponent', () => {
  let component: GpCompleteComponent;
  let fixture: ComponentFixture<GpCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
