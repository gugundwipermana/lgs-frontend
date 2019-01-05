import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingAccountComponent } from './mapping-account.component';

describe('MappingAccountComponent', () => {
  let component: MappingAccountComponent;
  let fixture: ComponentFixture<MappingAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
