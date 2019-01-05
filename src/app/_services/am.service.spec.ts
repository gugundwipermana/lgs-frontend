import { TestBed, inject } from '@angular/core/testing';

import { AmService } from './am.service';

describe('AmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmService]
    });
  });

  it('should be created', inject([AmService], (service: AmService) => {
    expect(service).toBeTruthy();
  }));
});
