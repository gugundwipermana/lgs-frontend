import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GirControlSidebarComponent } from './gir-control-sidebar.component';

describe('GirControlSidebarComponent', () => {
  let component: GirControlSidebarComponent;
  let fixture: ComponentFixture<GirControlSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirControlSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
