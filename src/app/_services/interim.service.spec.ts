import { TestBed, inject } from '@angular/core/testing';

import { InterimService } from './interim.service';

describe('InterimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterimService]
    });
  });

  it('should be created', inject([InterimService], (service: InterimService) => {
    expect(service).toBeTruthy();
  }));
});
