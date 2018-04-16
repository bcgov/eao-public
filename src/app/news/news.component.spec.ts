import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { NewsComponent } from './news.component';
import { NewsService } from '../services/news.service';
import { News } from '../models/news';

import { Api } from '../services/api';
import { OrderByPipe } from '../order-by.pipe';
import { NewsTypeFilterPipe } from '../news-type-filter.pipe';
import { ProjectFilterPipe } from '../project-filter.pipe';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  // mock service
  const mockNewsService = {
    getAll: function() {
      return {
        subscribe: function(fn) {
          fn(Array<News>());
        }
      };
    }
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
          ProjectFilterPipe
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
      expect(mockNewsService.getAll()).toHaveBeenCalled;
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
    it('should set filter to undefined', () => {
      component.filter = 'filtertest';
      component.clearAllNewsFilters();
      expect(component.filter).toBeFalsy;
    });
    it('should set NewsTypeFilter to be undefined', () => {
      component.NewsTypeFilter = '';
      component.clearAllNewsFilters();
      expect(component.NewsTypeFilter).toBeFalsy;
    });
    it('should set filterType to be undefined', () => {
      component.filterType = 'test';
      component.clearAllNewsFilters();
      expect(component.filterType).toBeFalsy;
    });
  });
});
