import { TestBed, inject } from '@angular/core/testing';

import { LopService } from './lop.service';

describe('LopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LopService]
    });
  });

  it('should be created', inject([LopService], (service: LopService) => {
    expect(service).toBeTruthy();
  }));
});
