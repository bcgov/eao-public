import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProjectComponent } from './project.component';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

import { OrderByPipe } from '../pipes/order-by.pipe';
import { ProjectFilterPipe } from '../pipes/project-filter.pipe';
import { PhaseFilterPipe } from '../pipes/phase-filter.pipe';
import { FilterPCPPipe } from '../pipes/filter-pcp.pipe';
import { ProjectDecisionFilterPipe } from '../pipes/project-decision-filter.pipe';
import { ProjectTypeFilterPipe } from '../pipes/project-type-filter.pipe';
import { ProponentFilterPipe } from '../pipes/proponent-filter.pipe';
import { ObjectFilterPipe } from '../pipes/object-filter.pipe';
import { ProjectRegionFilterPipe } from '../pipes/project-region-filter.pipe';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  // mock service
  const mockProjectService = {
    getAll: jasmine.createSpy().and.returnValue({
      subscribe: function(fn) {
        fn(Array<Project>());
      }
    })
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: ProjectService, useValue: mockProjectService }
        ],
        imports: [RouterTestingModule, FormsModule, NgxPaginationModule],
        declarations: [
          ProjectComponent,
          OrderByPipe,
          ProjectFilterPipe,
          PhaseFilterPipe,
          FilterPCPPipe,
          ProjectDecisionFilterPipe,
          ProjectTypeFilterPipe,
          ProponentFilterPipe,
          ObjectFilterPipe,
          ProjectRegionFilterPipe
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component, 'getProponents').and.stub();
      component.ngOnInit();
    });

    it('should call projectService.getAll()', () => {
      expect(mockProjectService.getAll).toHaveBeenCalled();
    });

    it('should return results', () => {
      expect(component.results).toBeTruthy();
    });

    it('should call getProponents()', () => {
      expect(component.getProponents).toHaveBeenCalled();
    });
  });

  describe('getProponents(data)', () => {
    let data;

    describe('given empty data array', () => {
      beforeEach(() => {
        data = [{}];
        component.getProponents(data);
      });

      it('should return 1 item', () => {
        expect(data.length).toBe(1);
      });

      it('should set project.proponent.name to undefined', () => {
        expect(data[0].name).toBe(undefined);
      });

      it('should not add project.proponent.name to proponents', () => {
        expect(component.proponents.length).toBe(0);
      });
    });

    describe('given a non-empty data array', () => {
      beforeEach(() => {
        data = [{
          proponent: {
            name: 'test'
          }
        }];
        component.getProponents(data);
      });

      it('should return 1 item', () => {
        expect(data.length).toBe(1);
      });

      it('should add project.proponent.name to proponents', () => {
        expect(component.proponents[0].name).toBe('test');
      });
    });
  });

  describe('getRegions(projects', () => {
    let result: Array<String>;
    describe('given empty projects array', () => {
      beforeEach(() => {
        result = component.getRegions(Array<Project>());
      });
      it('should return an empty array', () => {
        expect(result.length).toBe(0);
      });
    });
    describe('given a non-empty projects array', () => {
      beforeEach(() => {
        const projects = [
          new Project({region: 'Peace'}),
          new Project({region: 'Lower Mainland'}),
          new Project({region: 'Peace'}),
          new Project({region: 'Skeena'}),
        ];
        result = component.getRegions(projects);
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

  describe('applyProponentFilter()', () => {
    it('should set propfilter to proponentListFilter', () => {
      component.proponentListFilter = '';
      component.applyProponentFilter();
      expect(component.propfilter).toBe('');
    });
  });

  describe('clearAllProjectFilters()', () => {
    beforeEach(() => {
      component.filter = 'filtertest';
      component.projectTypeFilter = 'great type';
      component.filterType = 'superfilter';
      component.projectDecisionFilter = 'awesome decision';
      component.filterDecision = 'filterD';
      component.proponentListFilter = 'proponenT';
      component.propfilter = 'test';
      component.phasefilter = 'phase epsylon';
      component.projectPhaseFilter = 'project gamma';
      component.filterPCP = 'pcp for p in p';
      component.projectRegionFilter = 'test region';
      component.config.currentPage = 100;
      component.clearAllProjectFilters();
    });

    it('should set filter to undefined', () => {
      expect(component.filter).toBeUndefined();
    });

    it('should set NewsTypeFilter to be undefined', () => {
      expect(component.projectTypeFilter).toBeUndefined();
    });

    it('should set filterType to be undefined', () => {
      expect(component.filterType).toBeUndefined();
    });

    it('should set projectDecisionFilter to be undefined', () => {
      expect(component.projectDecisionFilter).toBeUndefined();
    });

    it('should set filterDecision to be undefined', () => {
      expect(component.filterDecision).toBeUndefined();
    });

    it('should set proponentListFilter to be undefined', () => {
      expect(component.proponentListFilter).toBeUndefined();
    });

    it('should set propfilter to be undefined', () => {
      expect(component.propfilter).toBeUndefined();
    });

    it('should set phasefilter to be undefined', () => {
      expect(component.phasefilter).toBeUndefined();
    });

    it('should set projectPhaseFilter to be undefined', () => {
      expect(component.projectPhaseFilter).toBeUndefined();
    });

    it('should set filterPCP to be undefined', () => {
      expect(component.filterPCP).toBeUndefined();
    });

    it('should set projectRegionFilter to be undefined', () => {
      expect(component.projectRegionFilter).toBeUndefined();
    });

    it('should set the current page to 1', () => {
      expect(component.config.currentPage).toBe(1);
    });
  });
});
