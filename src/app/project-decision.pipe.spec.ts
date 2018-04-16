import { ProjectDecisionFilterPipe } from './project-decision-filter.pipe';
import { Project } from './models/project';

describe('ProjectDecisionPipe', () => {

  const string = 'Certificate Issued';
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new ProjectDecisionFilterPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new Project({eacDecision: 'Certificate Issued'})];
      expectedResponse = [new Project({eacDecision: 'Certificate Issued'})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new Project({eacDecision: 'Certificate Issued'}),
        new Project({eacDecision: 'Certificate Issued'}),
        new Project({eacDecision: 'Certificate Issued'}),
        new Project({eacDecision: 'Certificate Issued'})
      ];
      expectedResponse = [
        new Project({eacDecision: 'Certificate Issued'}),
        new Project({eacDecision: 'Certificate Issued'}),
        new Project({eacDecision: 'Certificate Issued'}),
        new Project({eacDecision: 'Certificate Issued'})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different eacDecisions', () => {
    beforeEach(() => {
      value = [
        new Project({eacDecision: 'Certificate Issued'}),
        new Project({eacDecision: 'Pre-EA Act Approval'}),
        new Project({eacDecision: 'Certificate Issued'}),
        new Project({eacDecision: 'Pre-EA Act Approval'})
      ];
      expectedResponse = [
        new Project({eacDecision: 'Certificate Issued'}),
        new Project({eacDecision: 'Certificate Issued'}),
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns Project with same eacDecision value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].eacDecision))
        .toBe(JSON.stringify(expectedResponse[0].eacDecision));
      expect(JSON.stringify(pipe.transform(value, string)[1].eacDecision))
      .toBe(JSON.stringify(expectedResponse[1].eacDecision));
    });
  });
});
