import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpExpiredComponent } from './gp-expired.component';

describe('GpExpiredComponent', () => {
  let component: GpExpiredComponent;
  let fixture: ComponentFixture<GpExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
