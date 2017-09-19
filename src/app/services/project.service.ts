import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

@Injectable()
export class ProjectService {

  constructor(private api: Api) { }
  getAll() {
    return this.api.get('project')
      .map((res: Response) => res.json());
  }
  getCommentPeriodProjects() {
      // MBL TODO:Inefficient - we should inject openCommentPeriod into the above call/other calls.
      return this.api.get('projects/published')
      .map((res: Response) => res.json());
  }
}
