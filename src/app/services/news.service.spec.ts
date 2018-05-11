import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { NewsService } from './news.service';
import { Api } from './api';

import { Observable } from 'rxjs/Rx';

describe('NewsService', () => {
  let newsItem: any;

  // Object factory
  function createNewsItem(headline: string, pinned: boolean, priority: number, dateAdded: string) {
    return newsItem = {
      'headline': headline,
      'pinned': pinned,
      'priority': priority,
      'dateAdded': dateAdded
    };
  }

  function mockBackEnd(mockResponse: any[], mockBackend: any) {
    // Subscribe to opened http connections
    mockBackend.connections.subscribe((connection) => {
      // Have connection send a response
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        Api,
        NewsService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getRecentNews()', () => {
    let mockResponse: any;
    let expectedResponse: any;

    describe('given a valid response', () => {
      it('returns zero items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockResponse = [];

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(news.length).toBe(0);
          }
        );
      }));

      it('returns two items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockResponse = [
          createNewsItem('Test1', true, 1, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test2', true, 2, '2018-01-14 17:00:00.000Z')
        ];

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(news.length).toBe(2);
          }
        );
      }));

      it('returns four items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockResponse = [
          createNewsItem('Test1', true, 1, '2018-01-15 23:53:13.318Z'),
          createNewsItem('Test2', true, 2, '2017-09-06 16:00:00.000Z'),
          createNewsItem('Test3', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test4', true, 4, '2018-01-14 17:00:00.000Z')
        ];

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(news.length).toBe(4);
          }
        );
      }));

      it('returns four items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockResponse = [
          createNewsItem('Test1', true, 1, '2018-01-15 23:53:13.318Z'),
          createNewsItem('Test2', true, 2, '2017-09-06 16:00:00.000Z'),
          createNewsItem('Test3', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test4', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test5', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test6', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test7', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test8', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test9', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test10', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test11', true, 4, '2018-01-14 17:00:00.000Z')
        ];

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(news.length).toBe(4);
          }
        );
      }));
    });

    describe('given a response with 3 pinned and 1 unpinned items', () => {
      beforeEach(() => {
        mockResponse = [
          createNewsItem('Test1', true, 1, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test2', false, 2, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test3', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test4', true, 4, '2018-01-14 17:00:00.000Z')
        ];

        expectedResponse = [
          createNewsItem('Test1', true, 1, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test3', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test4', true, 4, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test2', false, 2, '2018-01-14 17:00:00.000Z')
        ];
      });

      it('returns four items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(news.length).toBe(expectedResponse.length);
          }
        );
      }));

      it('returns the 3 pinned items first',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news)[0]).toBe(JSON.stringify(expectedResponse)[0]);
            expect(JSON.stringify(news)[1]).toBe(JSON.stringify(expectedResponse)[1]);
            expect(JSON.stringify(news)[2]).toBe(JSON.stringify(expectedResponse)[2]);
          }
        );
      }));

      it('returns the unpinned item last',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news)[3]).toBe(JSON.stringify(expectedResponse)[3]);
          }
        );
      }));

      it('returns items ordered by most recent date',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news)).toBe(JSON.stringify(expectedResponse));
          }
        );
      }));
    });

    describe('given a response with 4 pinned and 1 unpinned items', () => {
      beforeEach(() => {
        mockResponse = [
          createNewsItem('Test1', true, 1, '2018-01-16 17:00:00.000Z'),
          createNewsItem('Test2', false, 2, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test3', true, 3, '2018-01-15 17:00:00.000Z'),
          createNewsItem('Test4', true, 4, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test5', true, 4, '2018-01-13 17:00:00.000Z')
        ];

        expectedResponse = [
          createNewsItem('Test1', true, 1, '2018-01-16 17:00:00.000Z'),
          createNewsItem('Test3', true, 3, '2018-01-15 17:00:00.000Z'),
          createNewsItem('Test4', true, 4, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test5', true, 4, '2018-01-13 17:00:00.000Z')
        ];
      });

      it('returns the 4 items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(news.length).toBe(expectedResponse.length);
          }
        );
      }));

      it('returns the pinned items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news[0].pinned)).toBe(JSON.stringify(expectedResponse[0].pinned));
            expect(JSON.stringify(news[1].pinned)).toBe(JSON.stringify(expectedResponse[1].pinned));
            expect(JSON.stringify(news[2].pinned)).toBe(JSON.stringify(expectedResponse[2].pinned));
            expect(JSON.stringify(news[3].pinned)).toBe(JSON.stringify(expectedResponse[3].pinned));
          }
        );
      }));

      it('returns items ordered by priority',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news[0].priority)).toBe(JSON.stringify(expectedResponse[0].priority));
            expect(JSON.stringify(news[1].priority)).toBe(JSON.stringify(expectedResponse[1].priority));
            expect(JSON.stringify(news[2].priority)).toBe(JSON.stringify(expectedResponse[2].priority));
            expect(JSON.stringify(news[3].priority)).toBe(JSON.stringify(expectedResponse[3].priority));
          }
        );
      }));

      it('returns items of same priority ordered by most recent date',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news[2].dateAdded)).toBe(JSON.stringify(expectedResponse[2].dateAdded));
            expect(JSON.stringify(news[3].dateAdded)).toBe(JSON.stringify(expectedResponse[3].dateAdded));
          }
        );
      }));
    });

    describe('given a response with pinned and unpinned items of varying priorities', () => {
      beforeEach(() => {
        mockResponse = [
          createNewsItem('Test1', false, 1, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test2', false, 1, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test3', false, 1, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test4', false, 1, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test5', true, 1, '2018-01-12 17:00:00.000Z'),
          createNewsItem('Test6', true, 2, '2018-01-13 17:00:00.000Z'),
          createNewsItem('Test7', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test8', true, 4, '2018-01-15 17:00:00.000Z')
        ];

        expectedResponse = [
          createNewsItem('Test5', true, 1, '2018-01-12 17:00:00.000Z'),
          createNewsItem('Test6', true, 2, '2018-01-13 17:00:00.000Z'),
          createNewsItem('Test7', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test8', true, 4, '2018-01-15 17:00:00.000Z')
        ];
      });

      it('returns 4 items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(news.length).toBe(expectedResponse.length);
          }
        );
      }));

      it('returns pinned items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news[0].pinned)).toBe(JSON.stringify(expectedResponse[0].pinned));
            expect(JSON.stringify(news[1].pinned)).toBe(JSON.stringify(expectedResponse[1].pinned));
            expect(JSON.stringify(news[2].pinned)).toBe(JSON.stringify(expectedResponse[2].pinned));
            expect(JSON.stringify(news[3].pinned)).toBe(JSON.stringify(expectedResponse[3].pinned));
          }
        );
      }));

      it('orders by priority',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news[0].priority)).toBe(JSON.stringify(expectedResponse[0].priority));
            expect(JSON.stringify(news[1].priority)).toBe(JSON.stringify(expectedResponse[1].priority));
            expect(JSON.stringify(news[2].priority)).toBe(JSON.stringify(expectedResponse[2].priority));
            expect(JSON.stringify(news[3].priority)).toBe(JSON.stringify(expectedResponse[3].priority));
          }
        );
      }));
    });

    describe('given a response with only pinned items of the same priority', () => {
      beforeEach(() => {
        mockResponse = [
          createNewsItem('Test1', true, 1, '2018-01-14 13:00:00.000Z'),
          createNewsItem('Test2', true, 1, '2018-01-13 13:00:00.001Z'),
          createNewsItem('Test3', true, 1, '2018-01-12 14:00:00.000Z'),
          createNewsItem('Test4', true, 1, '2018-01-12 11:00:00.000Z'),
          createNewsItem('Test5', true, 1, '2018-01-13 13:00:00.000Z'),
          createNewsItem('Test6', true, 1, '2018-01-14 18:00:00.000Z'),
          createNewsItem('Test7', true, 1, '2018-01-14 18:00:00.001Z'),
        ];

        expectedResponse = [
          createNewsItem('Test7', true, 1, '2018-01-14 18:00:00.001Z'),
          createNewsItem('Test6', true, 1, '2018-01-14 18:00:00.000Z'),
          createNewsItem('Test1', true, 1, '2018-01-14 13:00:00.000Z'),
          createNewsItem('Test2', true, 1, '2018-01-13 13:00:00.001Z')
        ];
      });

      it('returns 4 items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(news.length).toBe(expectedResponse.length);
          }
        );
      }));

      it('sorts by most recent date',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news[0].dateAdded)).toBe(JSON.stringify(expectedResponse[0].dateAdded));
            expect(JSON.stringify(news[1].dateAdded)).toBe(JSON.stringify(expectedResponse[1].dateAdded));
            expect(JSON.stringify(news[2].dateAdded)).toBe(JSON.stringify(expectedResponse[2].dateAdded));
            expect(JSON.stringify(news[3].dateAdded)).toBe(JSON.stringify(expectedResponse[3].dateAdded));
          }
        );
      }));
    });

    describe('given a response with no pinned items', () => {
      beforeEach(() => {
        mockResponse = [
          createNewsItem('Test1', false, 1, '2018-01-12 12:00:00.000Z'),
          createNewsItem('Test2', false, 4, '2018-01-16 17:00:00.000Z'),
          createNewsItem('Test3', false, 3, '2018-01-17 17:00:00.000Z'),
          createNewsItem('Test4', false, 2, '2018-01-18 17:00:00.000Z'),
          createNewsItem('Test5', false, 1, '2018-01-13 17:00:00.000Z'),
          createNewsItem('Test6', false, 1, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test7', false, 1, '2018-01-14 18:00:00.000Z'),
        ];

        expectedResponse = [
          createNewsItem('Test4', false, 2, '2018-01-18 17:00:00.000Z'),
          createNewsItem('Test3', false, 3, '2018-01-17 17:00:00.000Z'),
          createNewsItem('Test2', false, 4, '2018-01-16 17:00:00.000Z'),
          createNewsItem('Test7', false, 1, '2018-01-14 18:00:00.000Z')
        ];
      });

      it('returns 4 items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(news.length).toBe(expectedResponse.length);
          }
        );
      }));

      it('sorts by most recent date',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getRecentNews().subscribe(
          news => {
            expect(JSON.stringify(news[0].dateAdded)).toBe(JSON.stringify(expectedResponse[0].dateAdded));
            expect(JSON.stringify(news[1].dateAdded)).toBe(JSON.stringify(expectedResponse[1].dateAdded));
            expect(JSON.stringify(news[2].dateAdded)).toBe(JSON.stringify(expectedResponse[2].dateAdded));
            expect(JSON.stringify(news[3].dateAdded)).toBe(JSON.stringify(expectedResponse[3].dateAdded));
          }
        );
      }));
    });
  });

  describe('getByProjectCode()', () => {
    it('returns all the news item for the project',
      inject([NewsService, XHRBackend], (newsService, mockBackend) => {

      const mockResponse = [
        createNewsItem('Test1', true, 1, '2018-01-15 23:53:13.318Z'),
        createNewsItem('Test2', true, 2, '2017-09-06 16:00:00.000Z'),
        createNewsItem('Test3', true, 3, '2018-01-14 17:00:00.000Z'),
        createNewsItem('Test4', true, 4, '2018-01-14 17:00:00.000Z')
      ];

      mockBackEnd(mockResponse, mockBackend);

      // Service call
      newsService.getRecentNews().subscribe(
        news => {
          expect(news.length).toBe(4);
        }
      );
    }));
  });

  describe('getAll()', () => {
    describe('given a valid response', () => {
      it('returns 0 items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        const mockResponse = [];

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getAll().subscribe(
          news => {
            expect(news.length).toBe(0);
          }
        );
      }));

      it('returns n items',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        const mockResponse = [
          createNewsItem('Test1', true, 1, '2018-01-15 23:53:13.318Z'),
          createNewsItem('Test2', true, 2, '2017-09-06 16:00:00.000Z'),
          createNewsItem('Test3', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test4', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test5', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test6', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test7', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test8', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test9', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test10', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test11', true, 4, '2018-01-14 17:00:00.000Z')
        ];

        mockBackEnd(mockResponse, mockBackend);

        // Service call
        newsService.getAll().subscribe(
          news => {
            expect(news.length).toBe(11);
          }
        );
      }));

      it('orders by most recent date',
        inject([NewsService, XHRBackend], (newsService, mockBackend) => {

        const mockResponse = [
          createNewsItem('Test1', false, 1, '2018-01-15 23:53:13.318Z'),
          createNewsItem('Test2', true, 2, '2017-09-06 16:00:00.000Z'),
          createNewsItem('Test3', false, 3, '2018-10-14 17:00:00.000Z'),
          createNewsItem('Test4', true, 3, '2018-05-14 17:00:00.000Z'),
          createNewsItem('Test5', false, 3, '2018-02-14 17:00:00.000Z'),
          createNewsItem('Test6', true, 3, '2018-07-14 17:00:00.000Z'),
          createNewsItem('Test7', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test8', true, 3, '2018-09-14 17:00:00.000Z'),
          createNewsItem('Test9', false, 3, '2018-02-14 17:00:00.000Z'),
          createNewsItem('Test10', true, 3, '2018-04-14 17:00:00.000Z'),
          createNewsItem('Test11', true, 4, '2018-01-14 17:00:00.000Z')
        ];

        mockBackEnd(mockResponse, mockBackend);

        const expectedResponse = [
          createNewsItem('Test3', false, 3, '2018-10-14 17:00:00.000Z'),
          createNewsItem('Test8', true, 3, '2018-09-14 17:00:00.000Z'),
          createNewsItem('Test6', true, 3, '2018-07-14 17:00:00.000Z'),
          createNewsItem('Test4', true, 3, '2018-05-14 17:00:00.000Z'),
          createNewsItem('Test10', true, 3, '2018-04-14 17:00:00.000Z'),
          createNewsItem('Test5', false, 3, '2018-02-14 17:00:00.000Z'),
          createNewsItem('Test9', false, 3, '2018-02-14 17:00:00.000Z'),
          createNewsItem('Test1', false, 1, '2018-01-15 23:53:13.318Z'),
          createNewsItem('Test7', true, 3, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test11', true, 4, '2018-01-14 17:00:00.000Z'),
          createNewsItem('Test2', true, 2, '2017-09-06 16:00:00.000Z')
        ];

        // Service call
        newsService.getAll().subscribe(
          news => {
            expect(JSON.stringify(news[0].dateAdded)).toBe(JSON.stringify(expectedResponse[0].dateAdded));
            expect(JSON.stringify(news[1].dateAdded)).toBe(JSON.stringify(expectedResponse[1].dateAdded));
            expect(JSON.stringify(news[2].dateAdded)).toBe(JSON.stringify(expectedResponse[2].dateAdded));
            expect(JSON.stringify(news[3].dateAdded)).toBe(JSON.stringify(expectedResponse[3].dateAdded));
            expect(JSON.stringify(news[4].dateAdded)).toBe(JSON.stringify(expectedResponse[4].dateAdded));
            expect(JSON.stringify(news[5].dateAdded)).toBe(JSON.stringify(expectedResponse[5].dateAdded));
            expect(JSON.stringify(news[6].dateAdded)).toBe(JSON.stringify(expectedResponse[6].dateAdded));
            expect(JSON.stringify(news[7].dateAdded)).toBe(JSON.stringify(expectedResponse[7].dateAdded));
            expect(JSON.stringify(news[8].dateAdded)).toBe(JSON.stringify(expectedResponse[8].dateAdded));
            expect(JSON.stringify(news[9].dateAdded)).toBe(JSON.stringify(expectedResponse[9].dateAdded));
            expect(JSON.stringify(news[10].dateAdded)).toBe(JSON.stringify(expectedResponse[10].dateAdded));
          }
        );
      }));
    });
  });

  describe('compareDateAdded()', () => {
    it('returns 0 when a and b are null',
        inject([NewsService], (newsService) => {

      const mockResponse = [
        createNewsItem('Test1', false, 3, ''),
        createNewsItem('Test2', true, 3, ''),
      ];

      const sorted = newsService.compareDateAdded(mockResponse[0], mockResponse[1]);
      expect(sorted).toBe(0);
    }));

    it('returns a is more recent than b when b is null',
      inject([NewsService], (newsService) => {

      const mockResponse = [
        createNewsItem('Test1', false, 3, '2018-10-14 18:00:00.000Z'),
        createNewsItem('Test2', true, 3, ''),
      ];

      const sorted = newsService.compareDateAdded(mockResponse[0], mockResponse[1]);
      expect(sorted).toBe(-1539540000000);
    }));

    it('returns b is more recent than a when a is null',
        inject([NewsService], (newsService) => {

      const mockResponse = [
        createNewsItem('Test1', false, 3, ''),
        createNewsItem('Test2', true, 3, '2018-10-14 18:00:00.000Z'),
      ];

      const sorted = newsService.compareDateAdded(mockResponse[0], mockResponse[1]);
      expect(sorted).toBe(1539540000000);
    }));

    it('returns a is more recent than b',
        inject([NewsService], (newsService) => {

      const mockResponse = [
        createNewsItem('Test1', false, 3, '2018-10-14 18:00:00.000Z'),
        createNewsItem('Test2', true, 3, '2018-09-14 17:00:00.000Z'),
      ];

      const sorted = newsService.compareDateAdded(mockResponse[0], mockResponse[1]);
      expect(sorted).toBe(-2595600000);
    }));

    it('returns b is more recent than a',
        inject([NewsService], (newsService) => {

      const mockResponse = [
        createNewsItem('Test1', true, 3, '2018-10-14 17:00:00.000Z'),
        createNewsItem('Test2', true, 3, '2018-09-14 18:00:00.000Z'),
      ];

      const sorted = newsService.compareDateAdded(mockResponse[0], mockResponse[1]);
      expect(sorted).toBe(-2588400000);
    }));
  });

  describe(('comparePinned()'), () => {
    describe(('given different priorities'), () => {
      it('returns a is a higher priority than b when a is null',
          inject([NewsService], (newsService) => {

        const mockResponse = [
          createNewsItem('Test1', true, null, '2018-10-14 17:00:00.000Z'),
          createNewsItem('Test2', true, 2, '2018-09-14 18:00:00.000Z'),
        ];

        const sorted = newsService.comparePinned(mockResponse[0], mockResponse[1]);
        expect(sorted).toBe(-2);
      }));

      it('returns b is a higher priority than a when b is null',
          inject([NewsService], (newsService) => {

        const mockResponse = [
          createNewsItem('Test1', true, 2, '2018-10-14 17:00:00.000Z'),
          createNewsItem('Test2', true, null, '2018-09-14 18:00:00.000Z'),
        ];

        const sorted = newsService.comparePinned(mockResponse[0], mockResponse[1]);
        expect(sorted).toBe(2);
      }));

      it('returns a is a higher priority than b',
          inject([NewsService], (newsService) => {

        const mockResponse = [
          createNewsItem('Test1', true, 1, '2018-10-14 17:00:00.000Z'),
          createNewsItem('Test2', true, 2, '2018-09-14 18:00:00.000Z'),
        ];

        const sorted = newsService.comparePinned(mockResponse[0], mockResponse[1]);
        expect(sorted).toBe(-1);
      }));

      it('returns b is a higher priority than a',
          inject([NewsService], (newsService) => {

        const mockResponse = [
          createNewsItem('Test1', true, 2, '2018-10-14 17:10:00.000Z'),
          createNewsItem('Test2', true, 1, '2018-09-14 18:20:00.000Z'),
        ];

        const sorted = newsService.comparePinned(mockResponse[0], mockResponse[1]);
        expect(sorted).toBe(1);
      }));
    });

    describe(('given the same priority'), () => {
      it('returns 0 when a and b are null',
          inject([NewsService], (newsService) => {

        const mockResponse = [
          createNewsItem('Test1', true, 1, ''),
          createNewsItem('Test2', true, 1, ''),
        ];

        const sorted = newsService.comparePinned(mockResponse[0], mockResponse[1]);
        expect(sorted).toBe(0);
      }));

      it('returns a is more recent than b when b are null',
          inject([NewsService], (newsService) => {

        const mockResponse = [
          createNewsItem('Test1', true, 1, '2018-10-14 18:00:00.000Z'),
          createNewsItem('Test2', true, 1, ''),
        ];

        const sorted = newsService.comparePinned(mockResponse[0], mockResponse[1]);
        expect(sorted).toBe(-1539540000000);
      }));

      it('returns b is more recent than a when a are null',
          inject([NewsService], (newsService) => {

        const mockResponse = [
          createNewsItem('Test1', true, 1, ''),
          createNewsItem('Test2', true, 1, '2018-10-14 18:00:00.000Z'),
        ];

        const sorted = newsService.comparePinned(mockResponse[0], mockResponse[1]);
        expect(sorted).toBe(1539540000000);
      }));

      it('returns a is more recent than b',
          inject([NewsService], (newsService) => {

        const mockResponse = [
          createNewsItem('Test1', true, 1, '2018-10-14 18:00:00.000Z'),
          createNewsItem('Test2', true, 1, '2018-10-14 17:00:00.000Z'),
        ];

        const sorted = newsService.comparePinned(mockResponse[0], mockResponse[1]);
        expect(sorted).toBe(-3600000);
      }));

      it('returns b is more recent than a',
          inject([NewsService], (newsService) => {

        const mockResponse = [
          createNewsItem('Test1', true, 1, '2018-10-14 17:10:00.000Z'),
          createNewsItem('Test2', true, 1, '2018-10-14 18:20:00.000Z'),
        ];

        const sorted = newsService.comparePinned(mockResponse[0], mockResponse[1]);
        expect(sorted).toBe(4200000);
      }));
    });
  });
});
