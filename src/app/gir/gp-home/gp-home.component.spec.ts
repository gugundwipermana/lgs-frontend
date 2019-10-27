import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpHomeComponent } from './gp-home.component';

describe('GpHomeComponent', () => {
  let component: GpHomeComponent;
  let fixture: ComponentFixture<GpHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
