import { TestBed } from '@angular/core/testing';

import { UserService } from './data.user.service';

describe('Data.UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
