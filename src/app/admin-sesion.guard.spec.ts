import { TestBed } from '@angular/core/testing';

import {AdminSesionGuard} from './guards/admin-sesion.guard';

describe('AdminSesionGuard', () => {
  let guard: AdminSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
