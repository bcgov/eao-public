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

import { Api } from './api';
import { ValuedComponent } from '../models/vcs';

@Injectable()
export class CommentPeriodService {
  pcp: CommentPeriod;

  constructor(private api: Api) { }

  // return a public comment period object
  getByCode(id: string, code: string): Observable<CommentPeriod> {
  // Grab the project data first
    return this.api.getPCPByCode(id)
      .map((res: Response) => res.json())
      .map((pcp: any) => {
        if (!pcp) {
          return Observable.throw(new Error('PCP not found'));
        }
        this.pcp = new CommentPeriod(pcp);
        this.pcp.relatedDocuments.forEach((document, index ) => {
          document = new Document(document);
          this.processDocuments(this.pcp.relatedDocuments, document, index);
        });
        this.setStatus(new Date(this.pcp.dateStarted), new Date(this.pcp.dateCompleted));
        return this.pcp;
      })
      // get public comment period's comments and create array of all valued components
      .switchMap(() => this.getCommentsByPCP(id))
      // get all valued components per comment
      .switchMap(() => this.getCommentVcs())
      // get what project the public comment period is associated with
      .switchMap(() => this.getProjectByCode(code))
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
