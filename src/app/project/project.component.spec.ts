import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ProjectComponent } from './project.component';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

import { OrderByPipe } from '../pipes/order-by.pipe';
import { PhaseFilterPipe } from '../pipes/phase-filter.pipe';
import { FilterPCPPipe } from '../pipes/filter-pcp.pipe';
import { ProjectDecisionFilterPipe } from '../pipes/project-decision-filter.pipe';
import { ProjectTypeFilterPipe } from '../pipes/project-type-filter.pipe';
import { ProponentFilterPipe } from '../pipes/proponent-filter.pipe';
import { ObjectFilterPipe } from '../pipes/object-filter.pipe';
import { Proponent } from '../models/proponent';
import { ProjectFilters } from './project-filters';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { HttpModule } from '@angular/http';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  const projectServiceSpy = {
    getAll: jasmine.createSpy().and.returnValue(Observable.of(Array<Project>()))
  };
  const params: Params = {};
  const activatedRouteStub = {
    params: Observable.of(params)
  };
  const routerSpy = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
        ChangeDetectorRef
      ],
      imports: [FormsModule, NgxPaginationModule, HttpModule, RouterTestingModule],
      declarations: [
        ProjectComponent,
        OrderByPipe,
        PhaseFilterPipe,
        FilterPCPPipe,
        ProjectDecisionFilterPipe,
        ProjectTypeFilterPipe,
        ProponentFilterPipe,
        ObjectFilterPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component, 'getDistinctSortedProponentNames').and.stub();
      component.ngOnInit();
    });

    it('should call projectService.getAll()', () => {
      expect(projectServiceSpy.getAll).toHaveBeenCalled();
    });

    it('should return results', () => {
      expect(component.results).toBeTruthy();
    });

    it('should call getDistinctSortedProponentNames()', () => {
      expect(component.getDistinctSortedProponentNames).toHaveBeenCalled();
    });
  });

  describe('getDistinctSortedProponentNames(projects)', () => {
    describe('given empty projects array', () => {
      let result: Array<String>;
      beforeEach(() => {
        result = component.getDistinctSortedProponentNames(Array<Project>());
      });

      it('should return an empty array', () => {
        expect(result.length).toBe(0);
      });
    });

    describe('given a non-empty projects array', () => {
      let result: Array<String>;
      beforeEach(() => {
        const projects = [
          new Project({ proponent: new Proponent({ name: 'ccc' }) }),
          new Project({ proponent: new Proponent({ name: 'aaa' }) }),
          new Project({ proponent: new Proponent({ name: 'bbb' }) }),
          new Project({ proponent: new Proponent({ name: 'ccc' }) })
        ];
        result = component.getDistinctSortedProponentNames(projects);
      });

      it('should return 3 items', () => {
        expect(result.length).toBe(3);
      });

      it('should sort the items', () => {
        expect(result[0]).toBe('aaa');
        expect(result[1]).toBe('bbb');
        expect(result[2]).toBe('ccc');
      });
    });
  });

  describe('sort(columnName)', () => {
    let columnName;
    beforeEach(() => {
      columnName = 'dateAdded';
    });

    describe('given sortDirection is 1', () => {
      beforeEach(() => {
        component.sortDirection = 1;
        component.sort(columnName);
      });

      it('should set sortDirection to -1', () => {
        expect(component.sortDirection).toBe(-1);
      });
    });

    describe('given sortDirection is -1', () => {
      beforeEach(() => {
        component.sortDirection = -1;
        component.sort(columnName);
      });

      it('should set sortDirection to 1', () => {
        expect(component.sortDirection).toBe(1);
      });
    });

    describe('given columnName', () => {
      it('should assign columnName to sortColumn', () => {
        component.sort('aNewColumn');
        expect(component.sortColumn).toBe('aNewColumn');
      });
    });
  });

  describe('applyProjectFilters()', () => {
    it('navigates to project page with saved filters', () => {
      component.savedFilters = new ProjectFilters({ keyword: 'some keyword', type: 'some type' });
      component.applyProjectFilters();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['project', component.savedFilters.getParams()]);
    });
  });

  describe('clear()', () => {
    beforeEach(() => {
      component.savedFilters = new ProjectFilters({ keyword: 'some keyword', type: 'some type' });
      component.appliedFilters = null;
      component.clearAllProjectFilters();
    });

    it('clears any saved filters', () => {
      expect(component.savedFilters.keyword).toBe('');
      expect(component.savedFilters.type).toBe('');
      expect(component.savedFilters.getParams()).toEqual({});
    });

    it('sets current page to 1', () => {
      expect(component.pagination.currentPage).toBe(1);
    });
  });

  describe('showAdvancedFilters()', () => {
    beforeEach(() => {
      component.appliedFilters = new ProjectFilters();
    });

    describe('with no filters set', () => {
      it('should return false', () => {
        expect(component.showAdvancedFilters()).toBe(false);
      });
    });

    describe('with only keyword filter set', () => {
      it('should return false', () => {
        component.appliedFilters.keyword = 'status';
        expect(component.showAdvancedFilters()).toBe(false);
      });
    });

    describe('with filters set', () => {
      describe('with commentPeriodStatus set', () => {
        it('should return true', () => {
          component.appliedFilters.commentPeriodStatus = 'status';
          expect(component.showAdvancedFilters()).toBe(true);
        });
      });

      describe('with proponent set', () => {
        it('should return true', () => {
          component.appliedFilters.proponent = 'status';
          expect(component.showAdvancedFilters()).toBe(true);
        });
      });

      describe('with type set', () => {
        it('should return true', () => {
          component.appliedFilters.type = 'status';
          expect(component.showAdvancedFilters()).toBe(true);
        });
      });

      describe('with phase set', () => {
        it('should return true', () => {
          component.appliedFilters.phase = 'status';
          expect(component.showAdvancedFilters()).toBe(true);
        });
      });

      describe('with decision set', () => {
        it('should return true', () => {
          component.appliedFilters.decision = 'status';
          expect(component.showAdvancedFilters()).toBe(true);
        });
      });
    });
  });
});
