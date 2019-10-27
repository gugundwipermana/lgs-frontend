import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpProjectChannelComponent } from './gp-project-channel.component';

describe('GpProjectChannelComponent', () => {
  let component: GpProjectChannelComponent;
  let fixture: ComponentFixture<GpProjectChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpProjectChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpProjectChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
