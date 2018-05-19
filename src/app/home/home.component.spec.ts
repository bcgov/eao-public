import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { Home } from '../models/home';

import { NewsService } from '../services/news.service';
import { Api } from '../services/api';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // mock service
  const mockNewsService = {
    getRecentNews: jasmine.createSpy().and.returnValue({
      subscribe: function(fn) {
        fn(Array<Home>());
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
          HttpModule
        ],
        declarations: [HomeComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should call newsService.getRecentNews()', () => {
      expect(mockNewsService.getRecentNews).toHaveBeenCalled();
    });
    it('should return results data', () => {
      expect('component.results').toBeTruthy();
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
});
