import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GirContentComponent } from './gir-content.component';

describe('GirContentComponent', () => {
  let component: GirContentComponent;
  let fixture: ComponentFixture<GirContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
