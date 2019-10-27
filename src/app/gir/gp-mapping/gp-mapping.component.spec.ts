import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpMappingComponent } from './gp-mapping.component';

describe('GpMappingComponent', () => {
  let component: GpMappingComponent;
  let fixture: ComponentFixture<GpMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
