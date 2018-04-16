import { RecentActivityFilterPipe } from './recent-activity-filter.pipe';
import { RecentActivities } from './models/recentactivities';

describe('RecentActivityFilterPipe', () => {

  const string = 'Test';
  let value: RecentActivities[];
  let expectedResponse: RecentActivities[];

  const pipe = new RecentActivityFilterPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new RecentActivities({headline: 'Test'})];
      expectedResponse = [new RecentActivities({headline: 'Test'})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new RecentActivities({headline: 'Test'}),
        new RecentActivities({headline: 'Test'}),
        new RecentActivities({headline: 'Test'}),
        new RecentActivities({headline: 'Test'})
      ];
      expectedResponse = [
        new RecentActivities({headline: 'Test'}),
        new RecentActivities({headline: 'Test'}),
        new RecentActivities({headline: 'Test'}),
        new RecentActivities({headline: 'Test'})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different headlines', () => {
    beforeEach(() => {
      value = [
        new RecentActivities({headline: 'Test'}),
        new RecentActivities({headline: 'Industrial'}),
        new RecentActivities({headline: 'Test'}),
        new RecentActivities({headline: 'Industrial'})
      ];
      expectedResponse = [
        new RecentActivities({headline: 'Test'}),
        new RecentActivities({headline: 'Test'}),
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns RecentActivities with same headline value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].headline))
        .toBe(JSON.stringify(expectedResponse[0].headline));
      expect(JSON.stringify(pipe.transform(value, string)[1].headline))
      .toBe(JSON.stringify(expectedResponse[1].headline));
    });
  });
});
