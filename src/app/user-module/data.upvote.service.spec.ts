import { TestBed } from '@angular/core/testing';

import { Data.UpvoteService } from './data.upvote.service';

describe('Data.UpvoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Data.UpvoteService = TestBed.get(Data.UpvoteService);
    expect(service).toBeTruthy();
  });
});
