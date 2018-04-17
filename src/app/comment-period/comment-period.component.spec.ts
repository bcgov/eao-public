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
  describe('ngOnInit()', () => {
    it('should return data for route.data', () => {
      expect(ActivatedRouteStub.data).toBeTruthy;
    });
    it('should return data for commentPeriod', () => {
      expect(component.commentPeriod).toBeTruthy;
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
});
