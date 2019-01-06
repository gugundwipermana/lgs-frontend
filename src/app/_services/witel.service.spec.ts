import { TestBed, inject } from '@angular/core/testing';

import { WitelService } from './witel.service';

describe('WitelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WitelService]
    });
  });

  it('should be created', inject([WitelService], (service: WitelService) => {
    expect(service).toBeTruthy();
  }));
});
