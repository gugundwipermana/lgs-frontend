import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpMappingAmComponent } from './gp-mapping-am.component';

describe('GpMappingAmComponent', () => {
  let component: GpMappingAmComponent;
  let fixture: ComponentFixture<GpMappingAmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpMappingAmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpMappingAmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
