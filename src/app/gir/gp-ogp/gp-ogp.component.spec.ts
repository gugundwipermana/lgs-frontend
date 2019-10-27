import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpOgpComponent } from './gp-ogp.component';

describe('GpOgpComponent', () => {
  let component: GpOgpComponent;
  let fixture: ComponentFixture<GpOgpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpOgpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpOgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
