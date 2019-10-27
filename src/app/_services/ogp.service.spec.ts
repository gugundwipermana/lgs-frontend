import { TestBed, inject } from '@angular/core/testing';

import { OgpService } from './ogp.service';

describe('OgpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OgpService]
    });
  });

  it('should be created', inject([OgpService], (service: OgpService) => {
    expect(service).toBeTruthy();
  }));
});
