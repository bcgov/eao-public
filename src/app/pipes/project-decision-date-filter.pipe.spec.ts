import { ProjectDecisionDateFilterPipe } from './project-decision-date-filter.pipe';
import { Project } from '../models/project';

describe('ProjectDecisionDateFilterPipe', () => {
  const string = '1990';
  let value: Array<Project>;
  let expectedResponse: Array<Project>;
  const pipe = new ProjectDecisionDateFilterPipe();

  describe('given a valid array', () => {
    describe('of unique items', () => {
      it('returns 1 item', () => {
        value = [new Project({ decisionDate: '1990' })];
        expectedResponse = pipe.transform(value, string);
        expect(expectedResponse.length).toBe(1);
      });

      it('returns n items that are the same', () => {
        value = [
          new Project({ decisionDate: '1990' }),
          new Project({ decisionDate: '1990' }),
          new Project({ decisionDate: '1990' }),
          new Project({ decisionDate: '1990' })
        ];
        expectedResponse = pipe.transform(value, string);
        expect(expectedResponse.length).toBe(4);
      });
    });
    describe('of non-unique items', () => {
      beforeEach(() => {
        value = [
          new Project({ decisionDate: '1990' }),
          new Project({ decisionDate: '1991' }),
          new Project({ decisionDate: '1990' }),
          new Project({ decisionDate: '1991' })
        ];
        expectedResponse = pipe.transform(value, string);
      });

      it('returns 2 items', () => {
        expect(expectedResponse.length).toBe(2);
      });

      it('that have the same region value as the value passed in', () => {
        expect(JSON.stringify(pipe.transform(value, string)[0].decisionDate)).toBe(
          JSON.stringify(expectedResponse[0].decisionDate)
        );
        expect(JSON.stringify(pipe.transform(value, string)[1].decisionDate)).toBe(
          JSON.stringify(expectedResponse[1].decisionDate)
        );
      });
    });
  });
});
