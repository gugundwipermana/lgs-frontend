import { TestBed, inject } from '@angular/core/testing';

import { TregService } from './treg.service';

describe('TregService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TregService]
    });
  });

  it('should be created', inject([TregService], (service: TregService) => {
    expect(service).toBeTruthy();
  }));
});
