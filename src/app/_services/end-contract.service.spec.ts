import { TestBed, inject } from '@angular/core/testing';

import { EndContractService } from './end-contract.service';

describe('EndContractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndContractService]
    });
  });

  it('should be created', inject([EndContractService], (service: EndContractService) => {
    expect(service).toBeTruthy();
  }));
});
