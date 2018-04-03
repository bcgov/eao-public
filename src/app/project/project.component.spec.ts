import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProjectComponent } from './project.component';
import { ProjectService } from '../services/project.service';

import { OrderByPipe } from '../order-by.pipe';
import { ProjectFilterPipe } from '../project-filter.pipe';
import { PhaseFilterPipe } from '../phase-filter.pipe';
import { FilterPCPPipe } from '../filter-pcp.pipe';
import { ProjectDecisionFilterPipe } from '../project-decision-filter.pipe';
import { ProjectTypeFilterPipe } from '../project-type-filter.pipe';
import { ProponentFilterPipe } from '../proponent-filter.pipe';
import { ObjectFilterPipe } from '../object-filter.pipe';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  // mock service
  const mockProjectService = {
    getAll: () => {
      return { subscribe: () => {} };
    }
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

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
