import { ProjectRegionFilterPipe } from './project-region-filter.pipe';
import { Project } from '../models/project';

describe('ProjectRegionPipe', () => {
  const string = 'Peace';
  let value: Array<Project>;
  let expectedResponse: Array<Project>;
  const pipe = new ProjectRegionFilterPipe();

  describe('given a valid array', () => {
    describe('of unique items', () => {
      it('returns 1 item', () => {
        value = [new Project({ region: 'Peace' })];
        expectedResponse = pipe.transform(value, string);
        expect(expectedResponse.length).toBe(1);
      });

      it('returns n items that are the same', () => {
        value = [
          new Project({ region: 'Peace' }),
          new Project({ region: 'Peace' }),
          new Project({ region: 'Peace' }),
          new Project({ region: 'Peace' })
        ];
        expectedResponse = pipe.transform(value, string);
        expect(expectedResponse.length).toBe(4);
      });
    });
    describe('of non-unique items', () => {
      beforeEach(() => {
        value = [
          new Project({ region: 'Peace' }),
          new Project({ region: 'Lower Mainland' }),
          new Project({ region: 'Peace' }),
          new Project({ region: 'Lower Mainland' })
        ];
        expectedResponse = pipe.transform(value, string);
      });

      it('returns 2 items', () => {
        expect(expectedResponse.length).toBe(2);
      });

      it('that have the same region value as the value passed in', () => {
        expect(JSON.stringify(pipe.transform(value, string)[0].region)).toBe(
          JSON.stringify(expectedResponse[0].region)
        );
        expect(JSON.stringify(pipe.transform(value, string)[1].region)).toBe(
          JSON.stringify(expectedResponse[1].region)
        );
      });
    });
  });
});
