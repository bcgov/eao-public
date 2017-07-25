import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class EmailService {

  constructor(private http: Http) { }

  sendEmail(data) {
    const url = 'https://projects.eao.gov.bc.ca/api/feedback';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(url, JSON.stringify(data), { headers: headers });
  }
}
