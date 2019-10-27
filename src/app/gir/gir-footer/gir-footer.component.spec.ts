import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GirFooterComponent } from './gir-footer.component';

describe('GirFooterComponent', () => {
  let component: GirFooterComponent;
  let fixture: ComponentFixture<GirFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
