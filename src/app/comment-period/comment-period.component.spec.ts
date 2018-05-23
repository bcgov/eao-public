import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { CommentPeriodComponent } from './comment-period.component';
import { PCPInfoModalComponent } from './pcp-info-modal/pcp-info-modal';
import { SubmitCommentModalComponent } from './submit-comment-modal/submit-comment-modal';
import { SubmitCommentProgressModalComponent } from './submit-comment-progress-modal/submit-comment-progress-modal';

import { OrderByPipe } from '../pipes/order-by.pipe';
import { ObjectFilterPipe } from '../pipes/object-filter.pipe';
import { CommentPeriod } from '../models/commentperiod';
import { Comment } from '../models/comment';
import { Document } from '../models/document';
import { ValuedComponent } from '../models/vcs';
import { Project } from '../models/project';
import { CommentPeriodService } from '../services/comment-period.service';
import { FileSizePipe } from '../pipes/filesize.pipe';
import { Api } from '../services/api';

describe('CommentPeriodComponent', () => {
  let component: CommentPeriodComponent;
  let fixture: ComponentFixture<CommentPeriodComponent>;
  let ActivatedRouteStub;

  beforeEach(async(() => {
    // stub activated route
    ActivatedRouteStub = {
      snapshot: { params: { id: 1, code: 2 } }
    };
    TestBed.configureTestingModule({
      providers: [
        Api,
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
        {
          provide: CommentPeriodService,
          useValue: jasmine.createSpyObj('CommentPeriodService', [
            'getByCode',
            'getCommentsAndDocuments'
          ])
        }
      ],
      imports: [
        FormsModule,
        NgxPaginationModule,
        HttpModule,
        RouterTestingModule
      ],
      declarations: [
        CommentPeriodComponent,
        PCPInfoModalComponent,
        SubmitCommentModalComponent,
        SubmitCommentProgressModalComponent,
        FileSizePipe,
        OrderByPipe,
        ObjectFilterPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPeriodComponent);
    component = fixture.componentInstance;

    const commentPeriodService = TestBed.get(CommentPeriodService);
    commentPeriodService.getByCode.and.returnValue(
      Observable.of(new CommentPeriod())
    );
    commentPeriodService.getCommentsAndDocuments.and.returnValue(
      Observable.of(
        new CommentPeriod({
          comments: <Comment[]>[
            new Comment({
              comment: 'someComment',
              documents: ['someDocument'],
              vcs: <ValuedComponent[]>[new ValuedComponent()]
            })
          ],
          openHouses: ['openHouses'],
          project: new Project({ name: 'someProject' })
        })
      )
    );

    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    it('should set hostname to api.hostnameEPIC',
        inject(([Api]), api => {
        expect(component.hostname).toBe(api.hostnameEPIC);
      }));
    it('should return data for route.snapshot.params.id', () => {
      const activatedRoute = TestBed.get(ActivatedRoute);
      expect(activatedRoute.snapshot.params.id).toEqual(1);
    });

    it('should return data for route.snapshot.params.code', () => {
      const activatedRoute = TestBed.get(ActivatedRoute);
      expect(activatedRoute.snapshot.params.code).toEqual(2);
    });

    it('should return data for commentPeriod', () => {
      expect(component.commentPeriod).toBeTruthy();
      expect(component.commentPeriod.comments[0].comment).toEqual('someComment');
    });

    it('should set column to dateAdded', () => {
      expect(component.column).toBe('dateAdded');
    });

    it('should set direction to -1', () => {
      expect(component.direction).toBe(-1);
    });

    it('should set loading to false', () => {
      expect(component.loading).toBe(false);
    });
  });

  describe('comment readmore property', () => {
    let commentKeys;
    describe('on load', () => {
      it('should initially be undefined', () => {
        commentKeys = Object.keys(component.commentPeriod.comments[0]);
        expect(commentKeys.includes('readmore')).toBeFalsy();
      });
    });

    describe('after expanding a comment', () => {
      it('should be defined', () => {
        component.readmore(component.commentPeriod.comments[0]);
        commentKeys = Object.keys(component.commentPeriod.comments[0]);
        expect(commentKeys.includes('readmore')).toBeTruthy();
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

  describe('getDisplayedElementCountMessage', () => {
    beforeEach(() => {
      component.commentPeriod = new CommentPeriod();
      component.commentPeriod.comments = [
        new Comment(),
        new Comment(),
        new Comment(),
        new Comment()
      ];
    });

    it('returns all the data according to the pagination settings', () => {
      component.config.itemsPerPage = 2;
      const result = component.getDisplayedElementCountMessage(1);
      expect(result).toBe('Viewing <strong>1-2</strong> of <strong>4</strong> Comments');
    });

    it('flexes correctly based on the number of items per page', () => {
      component.config.itemsPerPage = 3;
      const result = component.getDisplayedElementCountMessage(2);
      expect(result).toBe('Viewing <strong>4-4</strong> of <strong>4</strong> Comments');
    });

    it('returns an empty message if there are no items in the list', () => {
      component.commentPeriod.comments = [];
      const result = component.getDisplayedElementCountMessage(1);
      expect(result).toBe('');
    });
  });

  describe('filterRejectedDocuments', () => {
    beforeEach(() => {
      component.commentPeriod = new CommentPeriod();
      component.commentPeriod.comments = [
        new Comment(),
        new Comment(),
        new Comment(),
        new Comment()
      ];

    });

    it('returns all documents if none are rejected', () => {
      component.commentPeriod.comments[0].documents = [
        new Document( {displayName: 'name1'} ),
        new Document( {displayName: 'name2'} ),
        new Document( {displayName: 'name3'} ),
        new Document( {displayName: 'name4'} ),
      ];
      const result = component.filterRejectedDocuments(component.commentPeriod.comments);
      expect(result[0].documents.length).toBe(4);
    });

    it('returns no documents if all are rejected', () => {
      component.commentPeriod.comments[0].documents = [
        new Document( ),
        new Document( ),
        new Document( ),
        new Document( ),
      ];
      const result = component.filterRejectedDocuments(component.commentPeriod.comments);
      expect(result[0].documents.length).toBe(0);
    });

    it('returns only publishable documents if some are rejected', () => {
      component.commentPeriod.comments[0].documents = [
        new Document( {displayName: 'name1'} ),
        new Document( {displayName: 'name2'} ),
        new Document( ),
        new Document( ),
      ];
      const result = component.filterRejectedDocuments(component.commentPeriod.comments);
      expect(result[0].documents.length).toBe(2);
    });

    it('returns all publishable documents for multiple sets of comments', () => {
      component.commentPeriod.comments[0].documents = [
        new Document( {displayName: 'name1'} ),
        new Document( {displayName: 'name2'} ),
        new Document( ),
        new Document( ),
      ];

      component.commentPeriod.comments[1].documents = [
        new Document( {displayName: 'name1'} ),
        new Document( {displayName: 'name2'} ),
        new Document( {displayName: 'name3'} ),
        new Document( {displayName: 'name4'} ),
      ];

      component.commentPeriod.comments[2].documents = [
        new Document( {displayName: 'name1'} ),
        new Document( ),
        new Document( ),
        new Document( ),
      ];

      component.commentPeriod.comments[3].documents = [
        new Document( ),
        new Document( ),
        new Document( ),
        new Document( ),
      ];
      const result = component.filterRejectedDocuments(component.commentPeriod.comments);
      expect(result[0].documents.length).toBe(2);
      expect(result[1].documents.length).toBe(4);
      expect(result[2].documents.length).toBe(1);
      expect(result[3].documents.length).toBe(0);
    });


  });
});
