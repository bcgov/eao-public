import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';

import { Api } from './api';

@Injectable()
export class EmailService {

  constructor(private api: Api) { }

  sendEmail(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.api.put('feedback', JSON.stringify(data), { headers: headers });
  }
}
