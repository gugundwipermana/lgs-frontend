import { TestBed, inject } from '@angular/core/testing';

import { ScnService } from './scn.service';

describe('ScnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScnService]
    });
  });

  it('should be created', inject([ScnService], (service: ScnService) => {
    expect(service).toBeTruthy();
  }));
});
