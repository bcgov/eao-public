import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

  constructor(private http: Http) { }
  getAll() {
    return this.http.get('http://esm-master.pathfinder.gov.bc.ca/api/recentactivity')
      .map((res: Response) => res.json());
  }
  comparePriority(a, b) {
    if (a.priority < b.priority) {
      return -1;
    }
    if (a.priority > b.priority) {
      return 1;
    }
    return 0;
  }
  compareDate(a, b) {
    if (a.dateAdded < b.dateAdded) {
      return -1;
    }
    if (a.dateAdded > b.dateAdded) {
      return 1;
    }
    return 0;
  }
  getRecentNews() {
    return this.http.get('http://esm-master.pathfinder.gov.bc.ca/api/recentactivity')
    .map(res => {
        // return res.json().slice(0, 4);
        const ret = res.json();
        // Get pinned items.
        let pinned = ret.filter(item => item.pinned === true);
        // Sort Priority
        pinned = pinned.sort(this.comparePriority);
        // Sort Date
        pinned = pinned.sort(this.compareDate);
        // Get non-pinned items.
        let nonPinned = ret.filter(item => item.pinned === false);
        // Sort Priority
        nonPinned = nonPinned.sort(this.comparePriority);
        // Sort Date
        nonPinned = nonPinned.sort(this.compareDate);

        return pinned.concat(nonPinned);
    });
  }
}
