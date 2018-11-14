import { TestBed } from '@angular/core/testing';

import { AuthUserService } from './data.auth-user.service';

describe('Data.AuthUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthUserService = TestBed.get(AuthUserService);
    expect(service).toBeTruthy();
  });
});
