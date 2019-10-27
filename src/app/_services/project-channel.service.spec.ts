import { TestBed, inject } from '@angular/core/testing';

import { ProjectChannelService } from './project-channel.service';

describe('ProjectChannelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectChannelService]
    });
  });

  it('should be created', inject([ProjectChannelService], (service: ProjectChannelService) => {
    expect(service).toBeTruthy();
  }));
});
