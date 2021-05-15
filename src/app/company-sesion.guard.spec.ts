import { TestBed } from '@angular/core/testing';

import { CompanySesionGuard } from './company-sesion.guard';

describe('CompanySesionGuard', () => {
  let guard: CompanySesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompanySesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
