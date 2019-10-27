import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpUserComponent } from './gp-user.component';

describe('GpUserComponent', () => {
  let component: GpUserComponent;
  let fixture: ComponentFixture<GpUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
