import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }
  getAll() {
    return this.http.get('https://projects.eao.gov.bc.ca/api/project')
      .map((res: Response) => res.json());
  }
  getCommentPeriodProjects() {
      // MBL TODO:Inefficient - we should inject openCommentPeriod into the above call/other calls.
      return this.http.get('https://projects.eao.gov.bc.ca/api/projects/published')
      .map((res: Response) => res.json());
  }
}
