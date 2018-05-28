import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import * as jQuery from 'jquery';

@Injectable()
export class Api {
  apiPath: string;
  hostnameEPIC: string;
  env: 'local' | 'dev' | 'test' | 'prod';

  constructor(private http: Http) {
    const host = this.getHostName(window.location.hostname);
    this.hostnameEPIC = host.hostnameEPIC;
    this.env = host.env;
    this.apiPath = this.getApiPath(this.hostnameEPIC);
  }

  getHostName(hostname: string) {
    let hostnameEPIC: string;
    let env: 'local' | 'dev' | 'test' | 'prod';
    switch (hostname) {
      case 'localhost':
        // Local
        hostnameEPIC = 'http://localhost:3000';
        env = 'local';
        break;

      case 'www-esm-master.pathfinder.gov.bc.ca':
        // Dev
        hostnameEPIC = 'https://esm-master.pathfinder.gov.bc.ca';
        env = 'dev';
        break;

      case 'www.test.projects.eao.gov.bc.ca':
        // Test
        hostnameEPIC = 'https://test.projects.eao.gov.bc.ca';
        env = 'test';
        break;

      case 'www.projects.eao.gov.bc.ca':
      default:
        // Prod
        hostnameEPIC = 'https://projects.eao.gov.bc.ca';
        env = 'prod';
    }
    return { hostnameEPIC, env };
  }

  getApiPath(hostnameEPIC) {
    return `${hostnameEPIC}/api`;
  }

  getProjectByCode(projectCode: string) {
    return this.get(`project/public/${projectCode}`);
  }

  getAllProjects() {
    return this.get('projects/public');
  }

  getPCPByCode(code: string) {
    return this.get(`commentperiod/for/public/${code}`);
  }

  getDocumentById(id: string) {
    return this.get(`document/${id}`);
  }

  getCommentsByPCPCode(pcpCode: string) {
    return this.get(`comments/period/${pcpCode}/all`);
  }

  getValuedComponentsByCode(vcsCodes: any[]) {
    return this.put(`vclist`, vcsCodes);
  }

  submitDocument(projectId: number, form: FormData, options: Object) {
    return this.post(`commentdocument/${projectId}/upload`, form, options);
  }

  submitComment(comment, options) {
    return this.post(`comment`, comment, options);
  }

  get(apiRoute: string, options?: Object) {
    return this.http.get(`${this.apiPath}/${apiRoute}`, options || null);
  }

  put(apiRoute: string, body?: Object, options?: Object) {
    return this.http.put(`${this.apiPath}/${apiRoute}`, body || null, options || null);
  }

  post(apiRoute: string, body?: FormData, options?: Object) {
    return this.http.post(`${this.apiPath}/${apiRoute}`, body || null, options || null);
  }
}
