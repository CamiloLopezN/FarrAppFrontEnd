import { TestBed } from '@angular/core/testing';

import { SecurityClientService } from './security-client.service';

describe('SecurityClientService', () => {
  let service: SecurityClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
