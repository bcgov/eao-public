import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CommentPeriod } from '../models/commentperiod';
import { Comment } from '../models/comment';
import { Document } from '../models/document';
import { Project } from '../models/project';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

import { Api } from './api';
import { ValuedComponent } from '../models/vcs';

@Injectable()
export class CommentPeriodService {
  pcp: CommentPeriod;
  comment: Object;

  constructor(private api: Api) { }

  // submit a comment
  submitComment(projectId: number, documents: Array<any>, comment: Object, options: Object): Observable<any> {
    this.comment = comment;

    // if no documents
    if (documents.length === 0) {
      return this.submitCommentNoDocument(projectId, options);
    // if document
    } else {
      return this.submitCommentWithDocuments(projectId, documents, options);
    }
  }

  // if no document attached
  submitCommentNoDocument(projectId, options) {
    return this.submitCommentDetails(options);
  }

  // if document attached
  submitCommentWithDocuments(projectId, documents, options) {
    // submit documents first
    return this.submitDocuments(projectId, documents, options)
      .map((docs: any) => {
        if (!docs) {
          return Observable.throw(new Error('Documents not submitted!'));
        }
        // attach document id's to comment in array
        this.comment['documents'] = [];
        docs.forEach(doc => {
          this.comment['documents'].push(doc._id);
        });
        return this.comment;
      })
      // submit comment details
      .switchMap(() => this.submitCommentDetails(options));
  }

  // submit comment details
  submitCommentDetails(options) {
    return this.api.submitComment(this.comment, options)
      .map((res: Response) => {
        return res.json();
      });
  }

  submitDocuments(projectId, documents, options) {
    const observablesArray = documents.map((document) => {
      return this.api.submitDocument(projectId, document, options)
        .map((res: Response) => {
          return res.json();
        });
    });
    return Observable.forkJoin(observablesArray);
  }

  // return a public comment period object
  getByCode(id: string, code: string): Observable<CommentPeriod> {
  // Grab the project data first
    return this.api.getPCPByCode(id)
      .map((res: Response) => res.json())
      .map((pcp: any) => {
        if (!pcp) {
          throw new Error('PCP not found');
        }
        this.pcp = new CommentPeriod(pcp);
        this.pcp.relatedDocuments.forEach((document, index ) => {
          document = new Document(document);
          this.processDocuments(this.pcp.relatedDocuments, document, index);
        });
        this.setStatus(new Date(this.pcp.dateStarted), new Date(this.pcp.dateCompleted));
        return this.pcp;
      })
      // get what project the public comment period is associated with
      .switchMap(() => this.getProjectByCode(code))
      .map(() => this.pcp);
  }

  // attach comments and documents to pcp object
  getCommentsAndDocuments(pcp: CommentPeriod) {
    this.pcp = pcp;
    return this.getCommentsByPCP(this.pcp._id)
      .switchMap(() => this.getCommentVcs())
      .map(() => this.pcp);
  }

  // get all comments associated with public comment period and map to comments attribute
  // return array of comment json objects
  private getCommentsByPCP(id) {
    return this.api.getCommentsByPCPCode(id)
      .map((res: Response) => res.json())
      .map((pcpComments) => {
        pcpComments.forEach((comment, index) => {
          if (comment.isPublished) {
            comment = new Comment(comment);
            this.pcp.vcs = this.pcp.vcs.concat(comment.vcs);
            this.pcp.comments.push(comment);
          }
          if (comment.documents.length > 0) {
            comment.documents.map((doc) => {
              return this.api.getDocumentById(doc.id)
                .map((res: Response) => res.json())
                .subscribe(( trueDoc ) => {
                  doc.displayName = trueDoc.internalOriginalName;
                  doc.link = this.api.hostnameEPIC + '/api/document/' + doc.id + '/fetch';
        });
            });
          }
        });
        this.pcp.vcs = this.pcp.vcs.filter((vc, index) => this.pcp.vcs.indexOf(vc) === index);
      });
  }

  // get all valued components associated with a comment and map it to vcs attribute
  // return array of valued components json objects
  private getCommentVcs() {
    return this.api.getValuedComponentsByCode(this.pcp.vcs)
      .map((res: Response) => res.json())
      .map((vcs) => {
        this.pcp.comments.forEach(comment => {
          this.pcp.vcs.filter(vc => {
            if (comment.vcs.indexOf(vc) !== -1) {
              vcs.filter(obj => {
                if (obj._id === vc) {
                  this.processVcs(comment.vcs, new ValuedComponent(obj), comment.vcs.indexOf(vc));
                }
              });
            }
          });
        });
      });
  }

  // get project associated to public comment period and map to project attribute
  // return project json object
  private getProjectByCode(code) {
    return this.api.getProjectByCode(code)
      .map((res: Response) => {
        this.pcp.project = new Project(res.json());
        return this.pcp;
      });
  }

  private processVcs(vcs: Array<ValuedComponent>, vc: ValuedComponent, index: number) {
    vcs.splice(index, 1, vc);
  }

  private processDocuments(documents: Array<Document>, document: Document, index: number) {
    documents.splice(index, 1, document);
  }

  private setStatus(start: Date, end: Date) {
    const curr = new Date();
    const weekAgo = new Date(start.getDate() - 7);
    // a public comment period is in a pending state when the date is a week before it opens
    if ( curr < start && curr >= weekAgo ) {
      this.pcp.status = 'Pending';
    } else if ( curr > end ) {
      this.pcp.status = 'Closed';
    } else {
      this.pcp.status = 'Open';
    }
  }
}
