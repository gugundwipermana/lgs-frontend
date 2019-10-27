import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GirHeaderComponent } from './gir-header.component';

describe('GirHeaderComponent', () => {
  let component: GirHeaderComponent;
  let fixture: ComponentFixture<GirHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
