import { ProjectFilterPipe } from './project-filter.pipe';
import { News } from './models/news';

describe('ProjectStatusFilterPipe', () => {

  const string = 'Test';
  let value: News[];
  let expectedResponse: News[];

  const pipe = new ProjectFilterPipe();

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
  describe('given a mix of different names', () => {
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
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given no project', () => {
    beforeEach(() => {
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
    });
    it('returns two items', () => {
      expect(pipe.transform(value, 'announcement').length).toBe(expectedResponse.length);
    });
  });
});
