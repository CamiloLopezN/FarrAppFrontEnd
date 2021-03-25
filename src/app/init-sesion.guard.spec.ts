import { TestBed } from '@angular/core/testing';

import { InitSesionGuard} from './guards/init-sesion.guard';

describe('InitSesionGuard', () => {
  let guard: InitSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InitSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
