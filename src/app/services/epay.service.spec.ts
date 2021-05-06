import { TestBed } from '@angular/core/testing';

import { EpayService } from './epay.service';

describe('EpayService', () => {
  let service: EpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
