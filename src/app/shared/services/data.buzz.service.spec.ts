import { TestBed } from '@angular/core/testing';
import { BuzzesService } from './data.buzzes.service'

describe('BuzzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuzzesService = TestBed.get(BuzzesService);
    expect(service).toBeTruthy();
  });
});
