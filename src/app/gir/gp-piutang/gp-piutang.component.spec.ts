import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpPiutangComponent } from './gp-piutang.component';

describe('GpPiutangComponent', () => {
  let component: GpPiutangComponent;
  let fixture: ComponentFixture<GpPiutangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpPiutangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpPiutangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
