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
  compare(a, b) {
    return (+(a.priority > b.priority) || +(a.dateAdded < b.dateAdded) - 1);
  }
  getRecentNews() {
    return this.http.get('http://esm-master.pathfinder.gov.bc.ca/api/recentactivity')
    .map(res => {
        // return res.json().slice(0, 4);
        const ret = res.json();
        // Get pinned items.
        let pinned = ret.filter(item => item.pinned === true);
        pinned = pinned.sort(this.compare);

        // Get non-pinned items.
        let nonPinned = ret.filter(item => item.pinned === false);
        nonPinned = nonPinned.sort(this.compare);

        return pinned.concat(nonPinned).slice(0, 4);
    });
  }
}
