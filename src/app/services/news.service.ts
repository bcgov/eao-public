import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Api } from './api';
import { News } from '../models/news';
import { CommentPeriod } from '../models/commentperiod';

@Injectable()
export class NewsService {

  constructor(private api: Api) { }
  getAll() {
    return this.api.get('query/recentactivity?active=true')
      .map(res => {
        return res.json().sort(this.compareDateAdded);
      });
  }

  compareDateAdded(a, b) {
    const aDate = a && a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
    const bDate = b && b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
    return bDate - aDate;
  }

  comparePinned(a, b) {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }

    const aDate = a && a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
    const bDate = b && b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
    return bDate - aDate;
  }

  getRecentNews() {
    return this.api.get('query/recentactivity?active=true')
    .map(res => {
        const ret = res.json();
        // Get pinned items.
        let pinned = ret.filter(item => item.pinned === true);
        pinned = pinned.sort(this.comparePinned);

        // Get non-pinned items.
        let nonPinned = ret.filter(item => item.pinned === false);
        nonPinned = nonPinned.sort(this.compareDateAdded);

        return pinned.concat(nonPinned).slice(0, 4);
    });
  }

  getByProjectCode(projectCode): Observable<News[]> {
    return this.api.get(`recentactivity/byproject/${projectCode}`)
      .map((res: Response) => res.json());
  }

  getByComments(projectID): Observable<CommentPeriod[]> {
    return this.api.get(`recentactivity/getPublishedCommentPeriodsForProject/${projectID}`)
      .map((res: Response) => res.json());
  }

}
