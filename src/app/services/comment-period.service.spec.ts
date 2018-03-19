import { TestBed, inject } from '@angular/core/testing';

import { CommentPeriodService } from './comment-period.service';

describe('CommentPeriodComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentPeriodService]
    });
  });

  it('should be created', inject([CommentPeriodService], (service: CommentPeriodService) => {
    expect(service).toBeTruthy();
  }));
});
