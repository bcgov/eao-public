import { ProponentFilterPipe } from './proponent-filter.pipe';
import { Project } from '../models/project';
import { Proponent } from '../models/proponent';

describe('ProponentFilterPipe', () => {
  const q = 'KGHM Ajax Mining Incorporated';
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new ProponentFilterPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) })];
      expectedResponse = [new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) })];

      expect(pipe.transform(value, q).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) })
      ];
      expectedResponse = [
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) })
      ];

      expect(pipe.transform(value, q).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different proponent: { names', () => {
    beforeEach(() => {
      value = [
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'Under Construction' }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'Under Construction' }) })
      ];
      expectedResponse = [
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) })
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, q).length).toBe(expectedResponse.length);
    });
    it('returns Project with same proponent: { name value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, q)[0].proponent.name)).toBe(
        JSON.stringify(expectedResponse[0].proponent.name)
      );
      expect(JSON.stringify(pipe.transform(value, q)[1].proponent.name)).toBe(
        JSON.stringify(expectedResponse[1].proponent.name)
      );
    });
  });
});
