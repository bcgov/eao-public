import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Api {
  apiPath: string;
  hostnameEPIC: string;
  env: 'local' | 'dev' | 'test' | 'prod';

  constructor(private http: Http) {
    const { hostname } = window.location;
    switch (hostname) {
      case 'localhost':
        // Local
        this.hostnameEPIC = 'http://localhost:3000';
        this.env = 'local';
        break;

      case 'www-esm-master.pathfinder.gov.bc.ca':
        // Dev
        this.hostnameEPIC = 'https://esm-master.pathfinder.gov.bc.ca';
        this.env = 'dev';
        break;

      case 'www.test.projects.eao.gov.bc.ca':
        // Test
        this.hostnameEPIC = 'https://test.projects.eao.gov.bc.ca';
        this.env = 'test';
        break;

      case 'www.projects.eao.gov.bc.ca':
      default:
        // Prod
        this.hostnameEPIC = 'https://projects.eao.gov.bc.ca';
        this.env = 'prod';
    };

    this.apiPath = `${ this.hostnameEPIC }/api`;
  }

  getProjectByCode(projectCode: string) {
    return this.get(`project/bycode/${ projectCode }`);
  }

  get(apiRoute: string, options?: Object) {
    return this.http.get(`${this.apiPath}/${apiRoute}`, options || null);
  }


  put(apiRoute: string, body?: Object, options?: Object) {
    return this.http.put(`${this.apiPath}/${apiRoute}`, body || null, options || null);
  }
}
