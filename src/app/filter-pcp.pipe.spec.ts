import { FilterPCPPipe } from './filter-pcp.pipe';
import { Project } from './models/project';

describe('FilterPCPPipe', () => {

  const string = 'Pending';
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new FilterPCPPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new Project({openCommentPeriod: 'Pending'})];
      expectedResponse = [new Project({openCommentPeriod: 'Pending'})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new Project({openCommentPeriod: 'Pending'}),
        new Project({openCommentPeriod: 'Pending'}),
        new Project({openCommentPeriod: 'Pending'}),
        new Project({openCommentPeriod: 'Pending'})
      ];
      expectedResponse = [
        new Project({openCommentPeriod: 'Pending'}),
        new Project({openCommentPeriod: 'Pending'}),
        new Project({openCommentPeriod: 'Pending'}),
        new Project({openCommentPeriod: 'Pending'})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of pending, open, and closed comment periods', () => {
    beforeEach(() => {
      value = [
        new Project({openCommentPeriod: 'Pending'}),
        new Project({openCommentPeriod: 'Open'}),
        new Project({openCommentPeriod: 'Pending'}),
        new Project({openCommentPeriod: 'Close'})
      ];
      expectedResponse = [
        new Project({openCommentPeriod: 'Pending'}),
        new Project({openCommentPeriod: 'Pending'}),
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns projects with same comment period value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].openCommentPeriod))
        .toBe(JSON.stringify(expectedResponse[0].openCommentPeriod));
      expect(JSON.stringify(pipe.transform(value, string)[1].openCommentPeriod))
      .toBe(JSON.stringify(expectedResponse[1].openCommentPeriod));
    });
  });
});
