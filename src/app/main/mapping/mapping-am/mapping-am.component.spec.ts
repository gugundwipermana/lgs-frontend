import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingAmComponent } from './mapping-am.component';

describe('MappingAmComponent', () => {
  let component: MappingAmComponent;
  let fixture: ComponentFixture<MappingAmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingAmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingAmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
