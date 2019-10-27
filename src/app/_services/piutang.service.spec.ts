import { TestBed, inject } from '@angular/core/testing';

import { PiutangService } from './piutang.service';

describe('PiutangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiutangService]
    });
  });

  it('should be created', inject([PiutangService], (service: PiutangService) => {
    expect(service).toBeTruthy();
  }));
});
