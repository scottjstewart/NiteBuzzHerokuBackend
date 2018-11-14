import { TestBed } from '@angular/core/testing';

import { UserDataSource } from './user-data-source.service';

describe('UserDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDataSource = TestBed.get(UserDataSource);
    expect(service).toBeTruthy();
  });
});
