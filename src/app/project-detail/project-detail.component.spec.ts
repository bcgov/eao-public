import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProjectDetailComponent } from './project-detail.component';
import { Project } from '../models/project';

import { OrderByPipe } from '../order-by.pipe';
import { ProjectFilterPipe } from '../project-filter.pipe';
import { PhaseFilterPipe } from '../phase-filter.pipe';
import { FilterPCPPipe } from '../filter-pcp.pipe';
import { ProjectDecisionFilterPipe } from '../project-decision-filter.pipe';
import { ProjectTypeFilterPipe } from '../project-type-filter.pipe';
import { ProponentFilterPipe } from '../proponent-filter.pipe';
import { ObjectFilterPipe } from '../object-filter.pipe';
import { NewsTypeFilterPipe } from '../news-type-filter.pipe';
import { RecentActivityFilterPipe } from '../recent-activity-filter.pipe';

import { MapModule } from '../map/map.module';
import { Api } from '../services/api';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let ActivatedRouteStub;
  let router;

  beforeEach(
    async(() => {
      // stub activated route
      ActivatedRouteStub = {
        data: {
          subscribe: (fn: (value) => void) => fn({
              project: {
                'recent_activities': [
                  {
                    'content': 'Hello World!',
                    'dateAdded': '2017-12-14T17:00:00.000Z'
                  }
                ]
              },
          })
        }
      };

      router = {
        navigate: jasmine.createSpy('navigate')
      };

      TestBed.configureTestingModule({
        providers: [
          Api,
          { provide: ActivatedRoute, useValue: ActivatedRouteStub },
          { provide: Router, useValue: router}
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
          RecentActivityFilterPipe
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should return data for route.data', () => {
      expect(ActivatedRouteStub.data).toBeTruthy;
    });

    it('should return project data', () => {
      expect(component.project).toBeTruthy;
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
        contentKeys = Object.keys(component.project.recent_activities[0]);
        expect(contentKeys.includes('readmore')).toBeFalsy;
      });
    });

    describe('after expanding a comment', () => {
      it('should be defined', () => {
        component.readmore(component.project.recent_activities[0]);
        contentKeys = Object.keys(component.project.recent_activities[0]);
        expect(contentKeys.includes('readmore')).toBeTruthy;
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
    it('should set results.documentUrl to \'\' when no document url ', () => {
      const data = {
        recent_activities: [
          {
            documentUrl: ''
          }
        ]
      };
      component.setDocumentUrl(data);
      expect(data.recent_activities[0].documentUrl).toBe('');
    });

    it('should not change results.documentUrl when given a www url', () => {
      const data = {
        recent_activities: [
          {
            documentUrl: 'http://www.test.com'
          }
        ]
      };
      component.setDocumentUrl(data);
      expect(data.recent_activities[0].documentUrl).toBe('http://www.test.com');
    });

    it('should set results.documentUrl to \'http://localhost:3000/blarg\' when given an esm-server document ', () => {
      const data = {
        recent_activities: [
          {
            documentUrl: '/blarg'
          }
        ]
      };
      component.setDocumentUrl(data);
      expect(data.recent_activities[0].documentUrl).toBe('http://localhost:3000/blarg');
    });
  });

  describe('getDocumentManagerUrl', () => {
    it('returns the correct document manager url for the project', () => {
      component.project = new Project();
      component.project.code = 'test';
      expect(component.getDocumentManagerUrl()).toBe('http://localhost:3000/p/test/docs');

    });
  });
});
