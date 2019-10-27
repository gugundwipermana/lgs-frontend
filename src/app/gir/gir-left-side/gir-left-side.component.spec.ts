import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GirLeftSideComponent } from './gir-left-side.component';

describe('GirLeftSideComponent', () => {
  let component: GirLeftSideComponent;
  let fixture: ComponentFixture<GirLeftSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirLeftSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
