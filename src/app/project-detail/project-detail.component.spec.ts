import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { News } from '../models/news';
import { ProjectDetailComponent } from './project-detail.component';
import { Project } from '../models/project';

import { OrderByPipe } from '../pipes/order-by.pipe';
import { ProjectFilterPipe } from '../pipes/project-filter.pipe';
import { PhaseFilterPipe } from '../pipes/phase-filter.pipe';
import { FilterPCPPipe } from '../pipes/filter-pcp.pipe';
import { ProjectDecisionFilterPipe } from '../pipes/project-decision-filter.pipe';
import { ProjectTypeFilterPipe } from '../pipes/project-type-filter.pipe';
import { ProponentFilterPipe } from '../pipes/proponent-filter.pipe';
import { ObjectFilterPipe } from '../pipes/object-filter.pipe';
import { NewsTypeFilterPipe } from '../pipes/news-type-filter.pipe';
import { NewsHeadlineFilterPipe } from '../pipes/news-headline-filter.pipe';

import { MapModule } from '../map/map.module';
import { Api } from '../services/api';
import { ProjectService } from '../services/project.service';
import { NewsService } from '../services/news.service';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let ActivatedRouteStub;
  let router;

  beforeEach(
    async(() => {
      // stub activated route
      ActivatedRouteStub = {
        snapshot: { params: { code: 'a-mine' } }
      };
      router = {
        navigate: jasmine.createSpy('navigate')
      };

      TestBed.configureTestingModule({
        providers: [
          Api,
          { provide: ActivatedRoute, useValue: ActivatedRouteStub },
          { provide: Router, useValue: router},
          {
            provide: ProjectService,
            useValue: jasmine.createSpyObj('ProjectService', [
              'getByCode'
            ])
          },
          {
            provide: NewsService,
            useValue: jasmine.createSpyObj('NewsService', [
              'getByProjectCode'
            ])
          }
        ],
        imports: [
          FormsModule,
          NgxPaginationModule,
          MapModule,
          HttpModule
        ],
        declarations: [
          ProjectDetailComponent,
          OrderByPipe,
          ProjectFilterPipe,
          PhaseFilterPipe,
          FilterPCPPipe,
          ProjectDecisionFilterPipe,
          ProjectTypeFilterPipe,
          ProponentFilterPipe,
          ObjectFilterPipe,
          NewsTypeFilterPipe,
          NewsHeadlineFilterPipe
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;

    const projectService = TestBed.get(ProjectService);
    projectService.getByCode.and.returnValue(
      Observable.of(new Project())
    );

    const newsService = TestBed.get(NewsService);
    newsService.getByProjectCode.and.returnValue(
      Observable.of([
        new News({
          headline: 'Big mine' ,
          type: 'news',
          content : 'My news',
          dateAdded : '2017-12-14T17:00:00.000Z',
          documentUrl: ''
        }),
        new News({
          headline: 'Medium',
          type: 'public comment period',
          content : 'Your news',
          dateAdded : '2017-11-10T15:00:00.000Z',
          documentUrl: 'http://www.test.com'
        }),
        new News({
          headline: 'Bigger mine',
          type: 'public comment period',
          content : 'Greatest news',
          dateAdded : '2017-06-01T11:00:00.000Z',
          documentUrl: '/blarg'
        }),
        new News({
          headline: 'Small',
          type: 'news',
          content : 'Greatest news',
          dateAdded : '2017-06-01T11:00:00.000Z',
          documentUrl: '/blarg'
        })
      ])
    );

    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should return data for route.snapshot.params.code', () => {
      const activatedRoute = TestBed.get(ActivatedRoute);
      expect(activatedRoute.snapshot.params.code).toEqual('a-mine');
    });

    it('should return project data', () => {
      expect(component.project).toBeTruthy();
    });

    it('should return news data', () => {
      expect(component.news).toBeTruthy();
    });

    it('should set column to dateAdded', () => {
      expect(component.column).toBe('dateAdded');
    });

    it('should set direction to -1', () => {
      expect(component.direction).toBe(-1);
    });
  });

  describe('content readmore property', () => {
    let contentKeys;
    describe('on load', () => {
      it('should initially be undefined', () => {
        contentKeys = Object.keys(component.news[0]);
        expect(contentKeys.includes('readmore')).toBeFalsy();
      });
    });

    describe('after expanding a comment', () => {
      it('should be defined', () => {
        component.readmore(component.news[0]);
        contentKeys = Object.keys(component.news[0]);
        expect(contentKeys.includes('readmore')).toBeTruthy();
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
      component.NewsTypeFilter = 'news';
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

  describe('gotoMap()', () => {
    it('should navigate to /map when no project code given', () => {
      component.project = null;
      component.gotoMap();
      expect(router.navigate).toHaveBeenCalledWith(['/map', { project: null}]);
    });

    it('should navigate to /map given a project code', () => {
      component.project = new Project();
      component.project.code = 'test';
      component.gotoMap();
      expect(router.navigate).toHaveBeenCalledWith(['/map', { project: component.project.code}]);
    });
  });

  describe('setDocumentUrl', () => {
    beforeEach(() => {
      component.setDocumentUrl(component.news);
    });

    it('should set results.documentUrl to \'\' when no document url ', () => {
      expect(component.news[0].documentUrl).toBe('');
    });

    it('should not change results.documentUrl when given a www url', () => {
      expect(component.news[1].documentUrl).toBe('http://www.test.com');
    });

    it('should set results.documentUrl to \'http://localhost:3000/blarg\' when given an esm-server document ', () => {
      expect(component.news[2].documentUrl).toBe('http://localhost:3000/blarg');
    });
  });

  describe('getDisplayedElementCountMessage', () => {
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
      expect(result).toBe('Viewing <strong>1-1</strong> of <strong>1</strong> Results');
      expect(component.filteredResults).toBe(1);
    });

    it('flexes correctly based on the number of items per page', () => {
      component.config.itemsPerPage = 3;
      const result = component.getDisplayedElementCountMessage(2);
      expect(result).toBe('Viewing <strong>4-4</strong> of <strong>4</strong> Results');
      expect(component.filteredResults).toBe(4);
    });

    it('returns an empty message if there are no items in the list', () => {
      component.news = [];
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
