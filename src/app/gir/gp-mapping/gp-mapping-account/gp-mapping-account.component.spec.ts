import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpMappingAccountComponent } from './gp-mapping-account.component';

describe('GpMappingAccountComponent', () => {
  let component: GpMappingAccountComponent;
  let fixture: ComponentFixture<GpMappingAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpMappingAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpMappingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
