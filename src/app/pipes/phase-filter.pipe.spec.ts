import { PhaseFilterPipe } from './phase-filter.pipe';
import { Project } from '../models/project';

describe('PhaseFilterPipe', () => {

  const string = 'Intake';
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new PhaseFilterPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new Project({currentPhase: { name: 'Intake' }})];
      expectedResponse = [new Project({currentPhase: { name: 'Intake' }})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new Project({currentPhase: { name: 'Intake' }}),
        new Project({currentPhase: { name: 'Intake' }}),
        new Project({currentPhase: { name: 'Intake' }}),
        new Project({currentPhase: { name: 'Intake' }})
      ];
      expectedResponse = [
        new Project({currentPhase: { name: 'Intake' }}),
        new Project({currentPhase: { name: 'Intake' }}),
        new Project({currentPhase: { name: 'Intake' }}),
        new Project({currentPhase: { name: 'Intake' }})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different currentPhase: { names', () => {
    beforeEach(() => {
      value = [
        new Project({currentPhase: { name: 'Intake' }}),
        new Project({currentPhase: { name: 'Under Construction' }}),
        new Project({currentPhase: { name: 'Intake' }}),
        new Project({currentPhase: { name: 'Under Construction' }})
      ];
      expectedResponse = [
        new Project({currentPhase: { name: 'Intake' }}),
        new Project({currentPhase: { name: 'Intake' }}),
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns Project with same currentPhase: { name value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].currentPhase.name))
        .toBe(JSON.stringify(expectedResponse[0].currentPhase.name));
      expect(JSON.stringify(pipe.transform(value, string)[1].currentPhase.name))
      .toBe(JSON.stringify(expectedResponse[1].currentPhase.name));
    });
  });
});
