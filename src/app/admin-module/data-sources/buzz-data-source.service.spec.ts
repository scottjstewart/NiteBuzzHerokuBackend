import { TestBed } from '@angular/core/testing';

import { BuzzDataSourceService } from './buzz-data-source.service';

describe('BuzzDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuzzDataSourceService = TestBed.get(BuzzDataSourceService);
    expect(service).toBeTruthy();
  });
});
