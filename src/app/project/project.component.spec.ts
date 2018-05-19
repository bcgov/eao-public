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
          ObjectFilterPipe
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
    it('should set filter to undefined', () => {
      component.filter = 'filtertest';
      component.clearAllProjectFilters();
      expect(component.filter).toBeFalsy();
    });

    it('should set NewsTypeFilter to be undefined', () => {
      component.projectTypeFilter = '';
      component.clearAllProjectFilters();
      expect(component.projectTypeFilter).toBeFalsy();
    });

    it('should set filterType to be undefined', () => {
      component.filterType = '';
      component.clearAllProjectFilters();
      expect(component.filterType).toBeFalsy();
    });

    it('should set projectDecisionFilter to be undefined', () => {
      component.projectDecisionFilter = '';
      component.clearAllProjectFilters();
      expect(component.projectDecisionFilter).toBeFalsy();
    });

    it('should set filterDecision to be undefined', () => {
      component.filterDecision = '';
      component.clearAllProjectFilters();
      expect(component.filterDecision).toBeFalsy();
    });

    it('should set proponentListFilter to be undefined', () => {
      component.proponentListFilter = '';
      component.clearAllProjectFilters();
      expect(component.proponentListFilter).toBeFalsy();
    });

    it('should set propfilter to be undefined', () => {
      component.propfilter = 'test';
      component.clearAllProjectFilters();
      expect(component.propfilter).toBeFalsy();
    });

    it('should set phasefilter to be undefined', () => {
      component.phasefilter = '';
      component.clearAllProjectFilters();
      expect(component.phasefilter).toBeFalsy();
    });

    it('should set projectPhaseFilter to be undefined', () => {
      component.projectPhaseFilter = '';
      component.clearAllProjectFilters();
      expect(component.projectPhaseFilter).toBeFalsy();
    });

    it('should set filterPCP to be undefined', () => {
      component.filterPCP = '';
      component.clearAllProjectFilters();
      expect(component.filterPCP).toBeFalsy();
    });
  });
});
