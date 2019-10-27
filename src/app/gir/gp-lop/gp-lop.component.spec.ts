import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpLopComponent } from './gp-lop.component';

describe('GpLopComponent', () => {
  let component: GpLopComponent;
  let fixture: ComponentFixture<GpLopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpLopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
