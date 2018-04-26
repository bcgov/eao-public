import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { CommentPeriodComponent } from '../comment-period.component';
import { SubmitCommentModalComponent } from './submit-comment-modal';
import { PCPInfoModalComponent } from './../pcp-info-modal/pcp-info-modal';
import { SubmitCommentProgressModalComponent } from './../submit-comment-progress-modal/submit-comment-progress-modal';

import { OrderByPipe } from '../../order-by.pipe';
import { ObjectFilterPipe } from '../../object-filter.pipe';

import { Api } from '../../services/api';
import { CommentPeriodService } from '../../services/comment-period.service';

describe('SubmitCommentModalComponent', () => {
  let component: SubmitCommentModalComponent;
  let fixture: ComponentFixture<SubmitCommentModalComponent>;

  beforeEach(async(() => {
    // stub activated route
    TestBed.configureTestingModule({
      providers: [
        Api,
        CommentPeriodService,
        CommentPeriodComponent
      ],
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule,
        NgxPaginationModule
      ],
      declarations: [
        SubmitCommentModalComponent,
        PCPInfoModalComponent,
        SubmitCommentProgressModalComponent,
        OrderByPipe,
        ObjectFilterPipe
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should create a comment object', () => {
      expect(component.comment).toBeTruthy();
    });
  });
  describe('validateFields(form)', () => {
    it('should set valid to false when author is empty', () => {
      const form = {
        author: '',
        location: '',
        comment: ''
      };
      component.validateFields(form);

      expect(component.valid).toBe(false);
    });
    it('should set valid to false when location is empty', () => {
      const form = {
        author: 'aa',
        location: '',
        comment: ''
      };
      component.validateFields(form);

      expect(component.valid).toBe(false);
    });
    it('should set valid to false when comment is empty', () => {
      const form = {
        author: 'aa',
        location: 'aa',
        comment: ''
      };
      component.validateFields(form);

      expect(component.valid).toBe(false);
    });
    it('should set valid to true when all validation passes', () => {
      const form = {
        author: 'aa',
        location: 'aa',
        comment: 'a'
      };
      component.valid = true;
      component.validateFields(form);

      expect(component.valid).toBe(true);
    });
  });
});
