import { TestBed } from '@angular/core/testing';

import { DataCommentService } from './data.comment.service';

describe('DataCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataCommentService = TestBed.get(DataCommentService);
    expect(service).toBeTruthy();
  });
});
