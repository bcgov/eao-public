import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class EmailService {

  constructor(private http: Http) { }
	
	sendEmail(data) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let url = 'https://projects.eao.gov.bc.ca/api/feedback';

		return this.http.put(url, JSON.stringify(data), { headers: headers });
	}
}
