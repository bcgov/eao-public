import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

@Injectable()
export class ProjectService {

  constructor(private api: Api) { }
  getAll() {
    return this.api.get('projects/public')
      .map((res: Response) => res.json());
  }
}
