import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpMappingAmDetailComponent } from './gp-mapping-am-detail.component';

describe('GpMappingAmDetailComponent', () => {
  let component: GpMappingAmDetailComponent;
  let fixture: ComponentFixture<GpMappingAmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpMappingAmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpMappingAmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
