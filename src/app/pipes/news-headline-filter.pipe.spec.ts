import { NewsHeadlineFilterPipe } from './news-headline-filter.pipe';
import { News } from '../models/news';

describe('NewsHeadlineFilterPipe', () => {

  const string = 'Test';
  let value: News[];
  let expectedResponse: News[];

  const pipe = new NewsHeadlineFilterPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new News({headline: 'Test'})];
      expectedResponse = [new News({headline: 'Test'})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new News({headline: 'Test'}),
        new News({headline: 'Test'}),
        new News({headline: 'Test'}),
        new News({headline: 'Test'})
      ];
      expectedResponse = [
        new News({headline: 'Test'}),
        new News({headline: 'Test'}),
        new News({headline: 'Test'}),
        new News({headline: 'Test'})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different headlines', () => {
    beforeEach(() => {
      value = [
        new News({headline: 'Test'}),
        new News({headline: 'Industrial'}),
        new News({headline: 'Test'}),
        new News({headline: 'Industrial'})
      ];
      expectedResponse = [
        new News({headline: 'Test'}),
        new News({headline: 'Test'}),
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns News with same headline value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].headline))
        .toBe(JSON.stringify(expectedResponse[0].headline));
      expect(JSON.stringify(pipe.transform(value, string)[1].headline))
      .toBe(JSON.stringify(expectedResponse[1].headline));
    });
  });
});
