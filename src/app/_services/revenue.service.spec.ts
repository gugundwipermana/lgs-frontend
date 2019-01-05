import { TestBed, inject } from '@angular/core/testing';

import { RevenueService } from './revenue.service';

describe('RevenueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevenueService]
    });
  });

  it('should be created', inject([RevenueService], (service: RevenueService) => {
    expect(service).toBeTruthy();
  }));
});
