import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Project } from '../models/project';
import { Proponent } from '../models/proponent';
import { FilterPCPPipe } from '../pipes/filter-pcp.pipe';
import { ObjectFilterPipe } from '../pipes/object-filter.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { PhaseFilterPipe } from '../pipes/phase-filter.pipe';
import { ProjectDecisionFilterPipe } from '../pipes/project-decision-filter.pipe';
import { ProjectRegionFilterPipe } from '../pipes/project-region-filter.pipe';
import { ProjectTypeFilterPipe } from '../pipes/project-type-filter.pipe';
import { ProponentFilterPipe } from '../pipes/proponent-filter.pipe';
import { ProjectService } from '../services/project.service';
import { ProjectFilters } from './project-filters';
import { ProjectComponent } from './project.component';

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
        ObjectFilterPipe,
        ProjectRegionFilterPipe
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

    describe('getDistinctSortedRegions(projects', () => {
      let result: Array<String>;

      describe('given empty projects array', () => {
        beforeEach(() => {
          result = component.getDistinctSortedRegions(Array<Project>());
        });

        it('should return an empty array', () => {
          expect(result.length).toBe(0);
        });
      });

      describe('given a non-empty projects array', () => {
        beforeEach(() => {
          const projects = [
            new Project({ region: 'Peace' }),
            new Project({ region: 'Lower Mainland' }),
            new Project({ region: 'Peace' }),
            new Project({ region: 'Skeena' })
          ];
          result = component.getDistinctSortedRegions(projects);
        });

        it('should return 3 items', () => {
          expect(result.length).toBe(3);
        });

        it('should sort the items', () => {
          expect(result[0]).toBe('Lower Mainland');
          expect(result[1]).toBe('Peace');
          expect(result[2]).toBe('Skeena');
        });
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

      describe('with decision set', () => {
        it('should return true', () => {
          component.appliedFilters.decision = 'status';
          expect(component.showAdvancedFilters()).toBe(true);
        });
      });

      describe('with phase set', () => {
        it('should return true', () => {
          component.appliedFilters.phase = 'status';
          expect(component.showAdvancedFilters()).toBe(true);
        });
      });

      describe('with region set', () => {
        it('should return true', () => {
          component.appliedFilters.region = 'status';
          expect(component.showAdvancedFilters()).toBe(true);
        });
      });
    });
  });

  describe('getDisplayedElementCountMessage(currentPage)', () => {
    describe('with no filters set', () => {
      beforeEach(() => {
        const p = new Project();
        component.results = new Array<Project>(p, p, p, p, p, p, p, p, p, p, p, p, p, p, p);
        component.appliedFilters = new ProjectFilters();
        component.pagination.itemsPerPage = 10;
      });

      it('returns the item count for all items on page 1', () => {
        const message = component.getDisplayedElementCountMessage(1);
        expect(message).toBe(`Viewing <strong>${1}-${10}</strong> of <strong>${15}</strong> Results`);
      });

      it('returns the item count for all items on page 2', () => {
        const message = component.getDisplayedElementCountMessage(2);
        expect(message).toBe(`Viewing <strong>${11}-${15}</strong> of <strong>${15}</strong> Results`);
      });
    });

    describe('with filters set', () => {
      beforeEach(() => {
        const projects = new Array<Project>(
          new Project({
            name: 'a',
            type: 't1',
            eacDecision: 'y',
            openCommentPeriod: 'open',
            region: 'r2',
            currentPhase: { name: 'p1' },
            proponent: { name: 'prop1' }
          }),
          new Project({
            name: 'ba',
            type: 't2',
            eacDecision: 'y',
            openCommentPeriod: 'open',
            region: 'r2',
            currentPhase: { name: 'p1' },
            proponent: { name: 'prop2' }
          }),
          new Project({
            name: 'c',
            type: 't1',
            eacDecision: 'y',
            openCommentPeriod: 'open',
            region: 'r2',
            currentPhase: { name: 'p1' },
            proponent: { name: 'prop3' }
          }),
          new Project({
            name: 'd',
            type: 't2',
            eacDecision: 'y',
            openCommentPeriod: 'open',
            region: 'r2',
            currentPhase: { name: 'p1' },
            proponent: { name: 'prop4' }
          }),
          new Project({
            name: 'ae',
            type: 't1',
            eacDecision: 'y',
            openCommentPeriod: 'open',
            region: 'r2',
            currentPhase: { name: 'p1' },
            proponent: { name: 'prop1' }
          }),
          new Project({
            name: 'bb',
            type: 't2',
            eacDecision: 'n',
            openCommentPeriod: 'open',
            region: 'r2',
            currentPhase: { name: 'p1' },
            proponent: { name: 'prop6' }
          }),
          new Project({
            name: 'ggah',
            type: 't1',
            eacDecision: 'n',
            openCommentPeriod: 'closed',
            region: 'r2',
            currentPhase: { name: 'p1' },
            proponent: { name: 'prop2' }
          }),
          new Project({
            name: 'h',
            type: 't2',
            eacDecision: 'n',
            openCommentPeriod: 'closed',
            region: 'r2',
            currentPhase: { name: 'p2' },
            proponent: { name: 'prop3' }
          })
        );
        component.results = projects;
        component.pagination.itemsPerPage = 3;
      });

      it('returns the item count for the results with matching keyword', () => {
        component.appliedFilters = new ProjectFilters({ keyword: 'a' });
        const message = component.getDisplayedElementCountMessage(1);
        expect(message).toBe(`Viewing <strong>${1}-${3}</strong> of <strong>${4}</strong> Results`);
      });

      it('returns the item count for the results with matching proponent', () => {
        component.appliedFilters = new ProjectFilters({ proponent: 'prop2' });
        const message = component.getDisplayedElementCountMessage(1);
        expect(message).toBe(`Viewing <strong>${1}-${2}</strong> of <strong>${2}</strong> Results`);
      });

      it('returns the item count for the results with matching type', () => {
        component.appliedFilters = new ProjectFilters({ type: 't1' });
        const message = component.getDisplayedElementCountMessage(1);
        expect(message).toBe(`Viewing <strong>${1}-${3}</strong> of <strong>${4}</strong> Results`);
      });

      it('returns the item count for the results with matching decision', () => {
        component.appliedFilters = new ProjectFilters({ decision: 'y' });
        const message = component.getDisplayedElementCountMessage(2);
        expect(message).toBe(`Viewing <strong>${4}-${5}</strong> of <strong>${5}</strong> Results`);
      });

      it('returns the item count for the results with matching commentPeriodStatus', () => {
        component.appliedFilters = new ProjectFilters({ commentPeriodStatus: 'open' });
        const message = component.getDisplayedElementCountMessage(2);
        expect(message).toBe(`Viewing <strong>${4}-${6}</strong> of <strong>${6}</strong> Results`);
      });

      it('returns the item count for the results with matching phase', () => {
        component.appliedFilters = new ProjectFilters({ phase: 'p1' });
        const message = component.getDisplayedElementCountMessage(3);
        expect(message).toBe(`Viewing <strong>${7}-${7}</strong> of <strong>${7}</strong> Results`);
      });

      it('returns the item count for the results with matching region', () => {
        component.appliedFilters = new ProjectFilters({ region: 'r2' });
        const message = component.getDisplayedElementCountMessage(3);
        expect(message).toBe(`Viewing <strong>${7}-${8}</strong> of <strong>${8}</strong> Results`);
      });

      it('returns the item count for the results with all matching filters', () => {
        component.appliedFilters = new ProjectFilters({
          keyword: 'a',
          proponent: 'prop2',
          type: 't1',
          decision: 'n',
          commentPeriodStatus: 'closed',
          phase: 'p1',
          region: 'r2'
        });
        const message = component.getDisplayedElementCountMessage(1);
        expect(message).toBe(`Viewing <strong>${1}-${1}</strong> of <strong>${1}</strong> Results`);
      });
    });
  });
});
