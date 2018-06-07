import { ProponentFilterPipe } from './proponent-filter.pipe';
import { Project } from '../models/project';
import { Proponent } from '../models/proponent';

describe('ProponentFilterPipe', () => {
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new ProponentFilterPipe();

  describe('given valid proponents', () => {
    it('returns 1 item', () => {
      value = [new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) })];
      expectedResponse = [new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) })];

      const result = pipe.transform(value, 'KGHM Ajax Mining Incorporated');
      expect(result.length).toBe(expectedResponse.length);
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

      const result = pipe.transform(value, 'KGHM Ajax Mining Incorporated');
      expect(result.length).toBe(expectedResponse.length);
    });

    describe('given a mix of different proponent names', () => {
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
        const result = pipe.transform(value, 'KGHM Ajax Mining Incorporated');
        expect(result.length).toBe(expectedResponse.length);
      });

      it('returns Project with same proponent name matches the filer value', () => {
        const result = pipe.transform(value, 'KGHM Ajax Mining Incorporated');
        expect(JSON.stringify(result[0].proponent.name)).toBe(JSON.stringify(expectedResponse[0].proponent.name));
        expect(JSON.stringify(result[1].proponent.name)).toBe(JSON.stringify(expectedResponse[1].proponent.name));
      });
    });
  });

  describe('given invalid proponents', () => {
    beforeEach(() => {
      value = [
        new Project({ proponent: undefined }),
        new Project({ proponent: new Proponent({ name: null }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: null }),
        new Project({ proponent: new Proponent({}) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) })
      ];
      expectedResponse = [
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) }),
        new Project({ proponent: new Proponent({ name: 'KGHM Ajax Mining Incorporated' }) })
      ];
    });

    describe('when a proponent or proponent name is null or undefined', () => {
      let result;
      beforeEach(() => {
        result = pipe.transform(value, 'KGHM Ajax Mining Incorporated');
      });

      it('returns two items', () => {
        result = pipe.transform(value, 'KGHM Ajax Mining Incorporated');
        expect(result.length).toBe(expectedResponse.length);
      });

      it('returns Projects with proponents whose name matches the filter value', () => {
        expect(JSON.stringify(result[0].proponent.name)).toBe(JSON.stringify(expectedResponse[0].proponent.name));
        expect(JSON.stringify(result[1].proponent.name)).toBe(JSON.stringify(expectedResponse[1].proponent.name));
      });
    });
  });
});
