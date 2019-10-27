import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpScnComponent } from './gp-scn.component';

describe('GpScnComponent', () => {
  let component: GpScnComponent;
  let fixture: ComponentFixture<GpScnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpScnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpScnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
