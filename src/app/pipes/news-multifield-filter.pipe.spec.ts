import { NewsMultifieldFilterPipe } from './news-multifield-filter.pipe';
import { News } from '../models/news';

describe('NewsHeadlineFilterPipe', () => {

  const string = 'Test';
  let value: News[];
  let expectedResponse: News[];

  const pipe = new NewsMultifieldFilterPipe();

  describe('given no filter string', () => {
    it('returns items in same order as given', () => {
      value = [new News()];
      expectedResponse = [new News()];

      expect(pipe.transform(value, null).length).toBe(expectedResponse.length);
    });
    it('returns items in same order as given', () => {
      value = [
        new News(),
        new News(),
        new News(),
        new News()
      ];
      expectedResponse = [
        new News(),
        new News(),
        new News(),
        new News()
      ];

      expect(pipe.transform(value, null).length).toBe(expectedResponse.length);
    });
  });
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
  describe('given a valid project name response', () => {
    it('returns 1 item', () => {
      value = [new News({project: {name: 'Test'}})];
      expectedResponse = [new News({project: {name: 'Test'}})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Test'}})
      ];
      expectedResponse = [
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Test'}})
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
  describe('given a mix of different project names', () => {
    beforeEach(() => {
      value = [
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Different Test'}}),
        new News({project: {name: 'New'}}),
        new News({project: {name: 'Test'}})
      ];
      expectedResponse = [
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Different Test'}}),
        new News({project: {name: 'Test'}}),
      ];
    });
    it('returns three items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different headline and project names', () => {
    beforeEach(() => {
      value = [
        new News({headline: 'Test'}),
        new News({headline: 'Industrial'}),
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Different Test'}}),
        new News({headline: 'Test'}),
        new News({headline: 'Industrial'}),
        new News({project: {name: 'New'}, headline: 'Industrial'}),
        new News({project: {name: 'New'}}),
        new News({project: {name: 'NewTest'}, headline: 'Industrial'}),
        new News({project: {name: 'New'}, headline: 'Industrial Test 2'}),
        new News({project: {name: 'New Test 3'}, headline: 'Industrial Test 2'}),
        new News({project: {name: 'Test'}})
      ];
      expectedResponse = [
        new News({headline: 'Test'}),
        new News({project: {name: 'Test'}}),
        new News({project: {name: 'Different Test'}}),
        new News({headline: 'Test'}),
        new News({project: {name: 'NewTest'}, headline: 'Industrial'}),
        new News({project: {name: 'New'}, headline: 'Industrial Test 2'}),
        new News({project: {name: 'New Test 3'}, headline: 'Industrial Test 2'}),
        new News({project: {name: 'Test'}}),
      ];
    });
    it('returns eight items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns News with same headline value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].headline))
        .toBe(JSON.stringify(expectedResponse[0].headline));
      expect(JSON.stringify(pipe.transform(value, string)[3].headline))
      .toBe(JSON.stringify(expectedResponse[3].headline));
    });
  });
});
