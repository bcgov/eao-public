import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CommentPeriodService } from './comment-period.service';
import { CommentPeriod } from '../models/commentperiod';
import { Api } from './api';

import { Observable } from 'rxjs/Rx';

describe('CommentPeriodService', () => {
  let responseItem;
  let pcpid;
  let projcode;
  let docid;
  function createResponseItem(request: string, response: any) {
    responseItem = {
      request: request,
      response: response
    };
    return responseItem;
  }

  function valuedComponentsCodesFactory(iterations: number) {
    const vcsCodes = [];
    for (let i = 0; i < iterations; i++) {
      vcsCodes.push('vcsid' + i);
    }
    return vcsCodes;
  }

  function valuedComponentsObjectsFactory(iterations: number) {
    const vcsObjects = [];
    for (let i = 0; i < iterations; i++) {
      vcsObjects.push(
        {
          _id: 'vcsid' + i
        }
      );
    }
    return vcsObjects;
  }

  function commentDocFactory(id: string, internalOriginalName: string) {
    const docObject = {
      id: id,
      internalOriginalName: internalOriginalName
    };

    return docObject;
  }

  function documentCodesFactory(iterations: number) {
    const docCodes = [];
    for (let i = 0; i < iterations; i++) {
      docCodes.push('docid' + i);
    }
    return docCodes;
  }

  function projectFactory() {
    return {
      _id: projcode
    };
  }

  function commentFactory(vcsCodes?: any[], isPublished?: boolean, documents?: any[]) {
    return {
      valuedComponents: vcsCodes ? vcsCodes : [],
      isPublished: isPublished ? isPublished : true,
      documents: documents ? documents : [],
    };
  }

  function commentPeriodObjectFactory(docids?: any[], dateStarted?: Date, dateCompleted?: Date) {
    return {
      _id: pcpid ? pcpid : null,
      vcs: { filter: (x: () => {}) => {}, concat: y => y},
      comments: [],
      relatedDocuments: docids ? docids : [],
      dateStarted: dateStarted ? dateStarted : new Date(),
      dateCompleted: dateCompleted ? dateCompleted : new Date()
    };
  }

  function createMockResponses(pcpObj: any, commentsObj: any[], projectObj: any, vcsObjs: any[], docObj?: any) {
    return [
      createResponseItem('commentperiod/for/public/' + pcpid, pcpObj),
      createResponseItem('comments/period/' + pcpid + '/all', commentsObj),
      createResponseItem('project/public/' + projcode, projectObj),
      createResponseItem('vclist', vcsObjs),
      createResponseItem('document/' + docid, docObj)
    ];
  }

  function mockBackEnd(mockResponses: any[], mockBackend: any) {
    // Subscribe to opened http connections
    mockBackend.connections.subscribe((connection) => {
      mockResponses.forEach( item => {
        if ( connection.request.url.includes(item.request)) {
          // Have connection send a response
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(item.response)
          })));
        }
      });
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        Api,
        CommentPeriodService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });
  describe('getByCode(code, id)', () => {
    describe('given a valid response', () => {
      let mockResponses;

      it('returns an error',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        const pcpObj = null;
        const commentObjs = [commentFactory()];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getByCode().subscribe(
          () => {
            fail('expected error');
          },
          error => {
            expect(error).toEqual(Error('PCP not found'));
          }
        );
      }));
      it('returns an empty object',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        pcpid = '';
        projcode = '';
        const pcpObj = commentPeriodObjectFactory();
        const commentObjs = [commentFactory()];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getByCode().subscribe(
          commentPeriod => {
            expect(commentPeriod._id).toBe(null);
          }
        );
      }));
      it('returns the comment period corresponding to the id',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        pcpid = '1234';
        projcode = '';
        const pcpObj = commentPeriodObjectFactory();
        const commentObjs = [commentFactory()];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getByCode(pcpid, projcode).subscribe(
          commentPeriod => {
            expect(commentPeriod._id).toBe(pcpid);
          }
        );
      }));
      it('returns the project corresponding to the code',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        pcpid = '';
        projcode = '4321';
        const pcpObj = commentPeriodObjectFactory();
        const commentObjs = [commentFactory()];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getByCode(pcpid, projcode).subscribe(
          commentPeriod => {
            expect(commentPeriod.project._id).toBe(projcode);
          }
        );
      }));
      it('returns the comment period corresponding to the id and the project corresponding to the code',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        pcpid = '1234';
        projcode = '4321';
        const pcpObj = commentPeriodObjectFactory();
        const commentObjs = [commentFactory()];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getByCode(pcpid, projcode).subscribe(
          commentPeriod => {
            expect(commentPeriod._id).toBe(pcpid);
            expect(commentPeriod.project._id).toBe(projcode);
          }
        );
      }));
    });
  });
  describe('processDocuments(this.pcp.relatedDocuments, document, index)', () => {
    let mockResponses;
    let expectedResponse;

    beforeEach(() => {
      pcpid = '1234';
      projcode = '4321';
    });

    describe('given a valid response', () => {
      it('returns 0 documents',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        const relatedDocCodes = documentCodesFactory(0);
        const pcpObj = commentPeriodObjectFactory(relatedDocCodes);
        const commentObjs = [];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        expectedResponse = relatedDocCodes;

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getByCode(pcpid, projcode).subscribe(
          commentPeriod => {
            const relatedDocuments = commentPeriod.relatedDocuments;
            expect(relatedDocuments.length).toBe(expectedResponse.length);
          }
        );
      }));
      it('returns the expected number of documents',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        const relatedDocCodes = documentCodesFactory(3);
        const pcpObj = commentPeriodObjectFactory(relatedDocCodes);
        const commentObjs = [];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        expectedResponse = relatedDocCodes;

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getByCode(pcpid, projcode).subscribe(
          commentPeriod => {
            const relatedDocuments = commentPeriod.relatedDocuments;
            expect(relatedDocuments.length).toBe(expectedResponse.length);
          }
        );
      }));
    });
  });

  describe('setStatus(start, end)', () => {
    let mockResponses;
    let expectedResponse;

    beforeEach(() => {
      pcpid = '1234';
      projcode = '4321';
    });

    describe('given a valid response', () => {
      it('returns comment period status as pending',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        const startDate = new Date(new Date().setDate(new Date().getDate() + 2));
        const pcpObj = commentPeriodObjectFactory([], startDate);
        const commentObjs = [];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        expectedResponse = 'Pending';

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getByCode(pcpid, projcode).subscribe(
          commentPeriod => {
            const status = commentPeriod.status;
            expect(status).toBe(expectedResponse);
          }
        );
      }));
    });
  });

  describe('getCommentsAndDocuments(pcp)', () => {
    let mockResponses;
    let expectedResponse;

    beforeEach(() => {
      pcpid = '1234';
      projcode = '4321';
    });

    describe('given a valid response', () => {
      it('returns 0 comments',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        const pcpObj = commentPeriodObjectFactory();
        const commentObjs = [];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        expectedResponse = [];

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getCommentsAndDocuments(pcpObj).subscribe(
          commentPeriod => {
            const comments = commentPeriod.comments;
            expect(comments.length).toBe(expectedResponse.length);
          }
        );
      }));
      it('returns the expected number of comments',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        const pcpObj = commentPeriodObjectFactory();
        const commentObjs = [
          commentFactory(),
          commentFactory(),
          commentFactory()
        ];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        expectedResponse = commentObjs;

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getCommentsAndDocuments(pcpid, projcode).subscribe(
          commentPeriod => {
            const comments = commentPeriod.comments;
            expect(comments.length).toBe(expectedResponse.length);
          }
        );
      }));
      it('appends valued components only if the comment is published',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        const pcpObj = commentPeriodObjectFactory();
        const vcsCodesPublished = valuedComponentsCodesFactory(2);
        const vcsCodesUnpublished = valuedComponentsCodesFactory(3);
        const commentObjs = [
          commentFactory(vcsCodesUnpublished, false),
          commentFactory(vcsCodesPublished)
        ];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(2);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        expectedResponse = vcsCodesPublished;

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getCommentsAndDocuments(pcpid, projcode).subscribe(
          commentPeriod => {
            const vcs = commentPeriod.comments[1].vcs;
            expect(vcs.length).toBe(expectedResponse.length);
          }
        );
      }));
    });
    describe('given unpublished comments', () => {
      it('returns the expected number of comments',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        const pcpObj = commentPeriodObjectFactory();
        const commentObjs = [commentFactory([], false)];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        expectedResponse = commentObjs;

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getCommentsAndDocuments(pcpObj).subscribe(
          commentPeriod => {
            const comments = commentPeriod.comments;
            expect(comments.length).toBe(expectedResponse.length);
          }
        );
      }));
    });
    describe('given a comment with documents', () => {
      let pcpObj;

      beforeEach(() => {
        docid = '12345';
        const docObj = commentDocFactory(docid, 'test');
        pcpObj = commentPeriodObjectFactory();
        const commentObjs = [commentFactory([], false, [{
          id: docid
        }])];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs, docObj);

      });
      it('obtains the proper document name',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {
        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getCommentsAndDocuments(pcpObj).subscribe(
          commentPeriod => {
            const comments = commentPeriod.comments;
            expect(comments[0].documents[0].displayName).toBe('test');
          }
        );

      }));
      it('obtains the proper document link',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {
        mockBackEnd(mockResponses, mockBackend);

        const linkslice = '/api/document/' + docid + '/fetch';

        commentPeriodService.getCommentsAndDocuments(pcpObj).subscribe(
          commentPeriod => {
            const comments = commentPeriod.comments;
            expect(comments[0].documents[0].link).toContain(linkslice);
          }
        );

      }));
    });
  });
  describe('getCommentVcs()', () => {
    let mockResponses;
    let expectedResponse;

    describe('given a valid response', () => {
      let pcpObj;

      beforeEach(() => {
        pcpid = '1234';
        projcode = '4321';
        pcpObj = commentPeriodObjectFactory();
        const commentObjs = [commentFactory()];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(0);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        expectedResponse = [];
      });
      it('returns 0 valued components',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getCommentsAndDocuments(pcpObj).subscribe(
          commentPeriod => {
            const vcs = commentPeriod.comments[0].vcs;
            expect(vcs.length).toBe(expectedResponse.length);
          }
        );
      }));
      it('returns an empty array',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getCommentsAndDocuments(pcpObj).subscribe(
          commentPeriod => {
            const vcs = commentPeriod.comments[0].vcs;
            expect(JSON.stringify(vcs)).toBe(JSON.stringify(expectedResponse));
          }
        );
      }));
    });
    describe('given an array of valued components', () => {
      let pcpObj;
      beforeEach(() => {
        pcpid = '1234';
        projcode = '4321';
        pcpObj = commentPeriodObjectFactory();
        const vcsCodes = valuedComponentsCodesFactory(2);
        const commentObjs = [commentFactory(vcsCodes)];
        const projObj = projectFactory();
        const vcsObjs = valuedComponentsObjectsFactory(2);

        mockResponses = createMockResponses(pcpObj, commentObjs, projObj, vcsObjs);

        expectedResponse = vcsObjs;
      });
      it('returns the expected number of valued components',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getCommentsAndDocuments(pcpObj).subscribe(
          commentPeriod => {
            const vcs = commentPeriod.comments[0].vcs;
            expect(vcs.length).toBe(expectedResponse.length);
          }
        );
      }));
      it('returns the right valued componenets',
        inject([CommentPeriodService, XHRBackend], (commentPeriodService, mockBackend) => {

        mockBackEnd(mockResponses, mockBackend);

        commentPeriodService.getCommentsAndDocuments(pcpObj).subscribe(
          commentPeriod => {
            const vcs = commentPeriod.comments[0].vcs;
            expect(JSON.stringify(vcs[0]._id)).toBe(JSON.stringify(expectedResponse[0]._id));
            expect(JSON.stringify(vcs[1]._id)).toBe(JSON.stringify(expectedResponse[1]._id));
          }
        );
      }));
     });
   });
});
