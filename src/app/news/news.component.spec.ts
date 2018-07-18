import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { NewsComponent } from './news.component';
import { NewsService } from '../services/news.service';
import { News } from '../models/news';

import { Api } from '../services/api';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { NewsTypeFilterPipe } from '../pipes/news-type-filter.pipe';
import { NewsMultifieldFilterPipe } from '../pipes/news-multifield-filter.pipe';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  // mock service
  const mockNewsService = {
    getAll: jasmine.createSpy().and.returnValue({
      subscribe: function(fn) {
        fn(Array<News>());
      }
    })
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [
          Api,
          { provide: NewsService, useValue: mockNewsService }
        ],
        imports: [
          RouterTestingModule,
          FormsModule,
          NgxPaginationModule,
          HttpModule
        ],
        declarations: [
          NewsComponent,
          OrderByPipe,
          NewsTypeFilterPipe,
          NewsMultifieldFilterPipe
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    it('should call newsService.getAll()', () => {
      expect(mockNewsService.getAll).toHaveBeenCalled();
    });

    it('should return a result', () => {
      expect(JSON.stringify(component.results)).toBe(JSON.stringify(Array<News>()));
    });

    it('should set column to dateAdded', () => {
      expect(component.column).toBe('dateAdded');
    });

    it('should set direction to -1', () => {
      expect(component.direction).toBe(-1);
    });
  });

  describe('comment readmore property', () => {
    beforeEach(() => {
      component.results.push(new News({
        content: 'Hello World!'
      }));
    });

    describe('on load', () => {
      it('should initially be undefined', () => {
        expect(Object.keys(component.results[0]).includes('readmore')).toBeFalsy();
      });
    });

    describe('after expanding a comment', () => {
      it('should be defined', () => {
        component.readmore(component.results[0]);
        expect(Object.keys(component.results[0]).includes('readmore')).toBeTruthy();
      });
    });
  });
  describe('sort(property)', () => {
    let property;

    beforeEach(() => {
      property = 'dateAdded';
    });

    describe('given isDesc is true', () => {
      beforeEach(() => {
        component.isDesc = true;
        component.sort(property);
      });

      it('should set isDesc to false', () => {
        expect(component.isDesc).toBeFalsy();
      });

      it('should set direction to -1', () => {
        expect(component.direction).toBe(-1);
      });
    });
    describe('given isDesc is false', () => {
      beforeEach(() => {
        component.isDesc = false;
        component.sort(property);
      });

      it('should set isDesc to true', () => {
        expect(component.isDesc).toBeTruthy();
      });

      it('should set direction to 1', () => {
        expect(component.direction).toBe(1);
      });
    });

    describe('given property', () => {
      it('should assign property to column', () => {
        component.sort(property);
        expect(component.column).toBe(property);
      });
    });
  });

  describe('clearAllNewsFilters()', () => {
    beforeEach(() => {
      component.filter = 'filtertest';
      component.NewsTypeFilter = 'public comment period';
      component.filterType = 'test';
      component.config.currentPage = 100;
      component.clearAllNewsFilters();
    });

    it('should set filter to undefined', () => {
      expect(component.filter).toBeUndefined();
    });

    it('should set NewsTypeFilter to be undefined', () => {
      expect(component.NewsTypeFilter).toBeUndefined();
    });

    it('should set filterType to be undefined', () => {
      expect(component.filterType).toBeUndefined();
    });

    it('should set the current page to 1', () => {
      expect(component.config.currentPage).toBe(1);
    });
  });

  describe('setDocumentUrl', () => {
    it('should set results.documentUrl to \'\' when given no document url', () => {
      const data = [
        {
          documentUrl: ''
        }
      ];
      component.setDocumentUrl(data);
      expect(data[0].documentUrl).toBe('');
    });

    it('should not change results.documentUrl when given a www url', () => {
      const data = [
        {
          documentUrl: 'http://www.test.com'
        }
      ];
      component.setDocumentUrl(data);
      expect(data[0].documentUrl).toBe('http://www.test.com');
    });

    it('should set results.documentUrl to \'http://localhost:3000/blarg\' when given an esm-server document', () => {
      const data = [
        {
          documentUrl: '/blarg'
        }
      ];
      component.setDocumentUrl(data);
      expect(data[0].documentUrl).toBe('http://localhost:3000/blarg');
    });
  });

  describe('getDisplayedElementCountMessage', () => {
    beforeEach(() => {
      component.results = [
        new News({ headline: 'Big mine', project: { name: 'Tree Mine' }, type: 'news' }),
        new News({ headline: 'Medium', project: { name: 'Rock Mine'}, type: 'public comment period' }),
        new News({ headline: 'Bigger mine', project: { name: 'Glass Mine'}, type: 'public comment period' }),
        new News({ headline: 'Small', project: { name: 'Dust Mine'}, type: 'news' })
      ];
    });

    it('returns all the data if no filter is set', () => {
      const result = component.getDisplayedElementCountMessage(1);
      expect(result).toBe('Viewing <strong>1-4</strong> of <strong>4</strong> Results');
      expect(component.filteredResults).toBe(4);
    });

    it('only returns news items if the news filter is set', () => {
      component.filterType = 'news';
      const result = component.getDisplayedElementCountMessage(1);
      expect(result).toBe('Viewing <strong>1-2</strong> of <strong>2</strong> Results');
      expect(component.filteredResults).toBe(2);
    });

    it('only returns public comment period items if the relevant filter is set', () => {
      component.filterType = 'public comment period';
      const result = component.getDisplayedElementCountMessage(1);
      expect(result).toBe('Viewing <strong>1-2</strong> of <strong>2</strong> Results');
      expect(component.filteredResults).toBe(2);
    });

    it('only returns items matching the freeform filter if the relevant filter is set', () => {
      component.filter = 'medium';
      const result = component.getDisplayedElementCountMessage(1);
      expect(result).toBe('Viewing <strong>1-1</strong> of <strong>1</strong> Results');
      expect(component.filteredResults).toBe(1);
    });

    it('only returns items matching both the freeform and type filters when filters are set', () => {
      component.filterType = 'news';
      component.filter = 'mine';
      const result = component.getDisplayedElementCountMessage(1);
      expect(result).toBe('Viewing <strong>1-2</strong> of <strong>2</strong> Results');
      expect(component.filteredResults).toBe(2);
    });

    it('flexes correctly based on the number of items per page', () => {
      component.config.itemsPerPage = 3;
      const result = component.getDisplayedElementCountMessage(2);
      expect(result).toBe('Viewing <strong>4-4</strong> of <strong>4</strong> Results');
      expect(component.filteredResults).toBe(4);
    });

    it('returns an empty message if there are no items in the list', () => {
      component.results = [];
      const result = component.getDisplayedElementCountMessage(1);
      expect(result).toBe('');
      expect(component.filteredResults).toBe(0);
    });

    it('returns the correct message if no items match the filter(s)', () => {
      component.filterType = 'dskijfb';
      component.filter = 'ubdnmbsdk';
      const result = component.getDisplayedElementCountMessage(1);
      expect(result).toBe('');
      expect(component.filteredResults).toBe(0);
    });
  });
});
