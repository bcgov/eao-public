import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { CommentPeriodComponent } from './comment-period.component';

import { OrderByPipe } from '../order-by.pipe';
import { ObjectFilterPipe } from '../object-filter.pipe';

import { Api } from '../services/api';

describe('CommentPeriodComponent', () => {
  let component: CommentPeriodComponent;
  let fixture: ComponentFixture<CommentPeriodComponent>;
  let ActivatedRouteStub;

  beforeEach(async(() => {
    // stub activated route
    ActivatedRouteStub = {
      data: {
        subscribe: (fn: (value) => void) => fn({
            commentPeriod: {
              'comments': [
                {
                  'dateAdded': '2017-12-14T17:00:00.000Z',
                  'documents': [],
                  'vcs': []
                }
              ],
              'openHouses': [],
              'isPublished': true,
              'project': {
                'name': 'Ajax Mine'
              }
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
        HttpModule,
        RouterTestingModule
      ],
      declarations: [
        CommentPeriodComponent,
        OrderByPipe,
        ObjectFilterPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
