import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { GirComponent } from './gir.component';
import { GirHeaderComponent } from './gir-header/gir-header.component';
import { GirLeftSideComponent } from './gir-left-side/gir-left-side.component';
import { GirFooterComponent } from './gir-footer/gir-footer.component';
import { GirControlSidebarComponent } from './gir-control-sidebar/gir-control-sidebar.component';

describe('GirComponent', () => {
  let component: GirComponent;
  let fixture: ComponentFixture<GirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule 
      ],
      declarations: [ 
        GirComponent,
        GirHeaderComponent,
        GirLeftSideComponent,
        GirFooterComponent,
        GirControlSidebarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
