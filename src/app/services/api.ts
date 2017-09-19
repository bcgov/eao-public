import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Api {
  apiPath: string;

  constructor(private http: Http) {
    const { hostname } = window.location;
    switch (hostname) {
      case 'localhost':
        // Local
        this.apiPath = 'http://localhost:3000/api';
        break;

      case 'www.esm-master.pathfinder.gov.bc.ca':
        // Dev
        this.apiPath = 'http://esm-master.pathfinder.gov.bc.ca/api';
        break;

      case 'www.esm-test.pathfinder.gov.bc.ca':
      case 'eao-public-test-demo.pathfinder.gov.bc.ca':
        // Test
        this.apiPath = 'https://esm-test.pathfinder.gov.bc.ca/api';
        break;

      case 'www.esm-prod.pathfinder.gov.bc.ca':
      case 'www-public.esm-server.pathfinder.gov.bc.ca':
      default:
        // Prod
        this.apiPath = 'https://projects.eao.gov.bc.ca/api';
    };
  }

  get(apiRoute: string, options?: Object) {
    return this.http.get(`${this.apiPath}/${apiRoute}`, options || null);
  }


  put(apiRoute: string, body?: Object, options?: Object) {
    return this.http.put(`${this.apiPath}/${apiRoute}`, body || null, options || null);
  }
}
