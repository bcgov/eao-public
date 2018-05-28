import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Api } from './api';

@Injectable()
export class ProjectService {
  constructor(private api: Api) {}

  getAll(): Observable<Array<Project>> {
    return this.api.getAllProjects().map((res: Response) => res.json());
  }

  getByCode(code: string): Observable<Project> {
    return this.api.getProjectByCode(code).map((res: Response) => res.json());
  }
}
