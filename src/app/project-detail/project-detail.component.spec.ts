import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
  let project: Project;
  let ActivatedRouteStub;

  beforeEach(
    async(() => {
      // stub activated route
      ActivatedRouteStub = {
        data: {
          subscribe: (fn: (value) => void) => fn({
              project: {
                'recent_activities': [
                  {
                    'dateAdded': '2017-12-14T17:00:00.000Z'
                  }
                ]
              },
          })
        }
      };
      TestBed.configureTestingModule({
        providers: [
          Api,
          { provide: ActivatedRoute, useValue: ActivatedRouteStub },
        ],
        imports: [
          FormsModule,
          NgxPaginationModule,
          MapModule,
          HttpModule,
          RouterTestingModule
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
    project = new Project();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
