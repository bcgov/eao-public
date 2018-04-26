import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend, RequestMethod, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Api } from './api';

describe('Api', () => {

  function mockBackEnd(mockResponse: any, mockBackend: any) {
    // Subscribe to opened http connections
    mockBackend.connections.subscribe((connection) => {
      // Have connection send a response
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
  }

  beforeEach(() => {
    const window = {
      location: {
        hostname: 'www-esm-master.pathfinder.gov.bc.ca'
      }
    };

    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        Api,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getHostName()', () => {
    it('should return http://localhost:3000',
      inject([Api, XHRBackend], (api, mockBackend) => {

      expect(api.getHostName('localhost').hostnameEPIC).toBe('http://localhost:3000');
    }));

    it('should return https://esm-master.pathfinder.gov.bc.ca',
      inject([Api, XHRBackend], (api, mockBackend) => {

      expect(api.getHostName('www-esm-master.pathfinder.gov.bc.ca').hostnameEPIC).toBe('https://esm-master.pathfinder.gov.bc.ca');
    }));

    it('should return https://test.projects.eao.gov.bc.ca',
      inject([Api, XHRBackend], (api, mockBackend) => {

      expect(api.getHostName('www.test.projects.eao.gov.bc.ca').hostnameEPIC).toBe('https://test.projects.eao.gov.bc.ca');
    }));

    it('should return https://projects.eao.gov.bc.ca',
      inject([Api, XHRBackend], (api, mockBackend) => {

      expect(api.getHostName('www.projects.eao.gov.bc.ca').hostnameEPIC).toBe('https://projects.eao.gov.bc.ca');
    }));
  });

  describe('api calls', () => {
    describe('getProjectByCode(projectCode)', () => {
      let projectCode: string;

      beforeEach(() => {
        projectCode = 'ajax-mine';
      });
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.getProjectByCode(projectCode);
      }));
      it('should make a request to /project/public/${ projectCode }',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/project/public/ajax-mine');
        });

        api.getProjectByCode(projectCode);
      }));
      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getProjectByCode(projectCode).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });

    describe('getPCPByCode(code)', () => {
      let code: string;

      beforeEach(() => {
        code = '589a192c5658e1001d22a088';
      });
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.getPCPByCode(code);
      }));

      it('should make a request to /commentperiod/for/public/${ code }',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/commentperiod/for/public/589a192c5658e1001d22a088');
        });

        api.getPCPByCode(code);
      }));

      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getPCPByCode(code).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });

    describe('getDocumentById(id)', () => {
      let id: string;

      beforeEach(() => {
        id = '58868f2ce036fb0105767eaa';
      });
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.getDocumentById(id);
      }));

      it('should make a request to /document/${ id }',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/document/58868f2ce036fb0105767eaa');
        });

        api.getDocumentById(id);
      }));

      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getDocumentById(id).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });

    describe('getCommentsByPCPCode(code)', () => {
      let code: string;

      beforeEach(() => {
        code = '589a192c5658e1001d22a088';
      });
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.getCommentsByPCPCode(code);
      }));

      it('should make a request to /comments/period/${ pcpCode }/all',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/comments/period/589a192c5658e1001d22a088/all');
        });

        api.getCommentsByPCPCode(code);
      }));

      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getCommentsByPCPCode(code).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });

    describe('getValuedComponentsByCode(vcsCodes)', () => {
      let vcsCodes: string[];

      beforeEach(() => {
        vcsCodes = ['5899f8d09372a0001dc40409', '5899f8d19372a0001dc4040a'];
      });

      it('should make a PUT request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Put);
        });

        api.getValuedComponentsByCode(vcsCodes);
      }));

      it('should make a request to /vclist',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/vclist');
        });

        api.getValuedComponentsByCode(vcsCodes);
      }));

      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getValuedComponentsByCode(vcsCodes).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });

    describe('submitDocument(projectId, form, options)', () => {
      let projectId: number;
      let form: FormData;
      let options: RequestOptions;


      beforeEach(() => {
        projectId = 1234;
        form = new FormData();
        options = new RequestOptions();
      });

      it('should make a POST request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Post);
        });

        api.submitDocument(projectId, form, options);
      }));

      it('should make a request to /commentdocument/1234/upload',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/commentdocument/1234/upload');
        });

        api.submitDocument(projectId, form, options);
      }));

      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.submitDocument(projectId, form, options).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });

    describe('submitComment(comment, options)', () => {
      let comment: Object;
      let options: RequestOptions;


      beforeEach(() => {
        comment = {};
        options = new RequestOptions();
      });

      it('should make a POST request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Post);
        });

        api.submitComment(comment, options);
      }));

      it('should make a request to /comment',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/comment');
        });

        api.submitComment(comment, options);
      }));

      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.submitComment(comment, options).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });
  });
  describe('http calls', () => {
    describe('get(apiRoute, options?)', () => {
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.get(apiRoute);
      }));
      it('should make a request to the specified path',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/projects');
        });

        api.get(apiRoute);
      }));
    });
    describe('put(apiRoute, body?, options?)', () => {
      it('should make a PUT request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Put);
        });

        api.put(apiRoute);
      }));
      it('should make a request to the specified path',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/projects');
        });

        api.put(apiRoute);
      }));
    });
    describe('post(apiRoute, body?, options?)', () => {
      it('should make a PUT request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Post);
        });

        api.post(apiRoute);
      }));
      it('should make a request to the specified path',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.apiPath = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/projects');
        });

        api.post(apiRoute);
      }));
    });
  });
});
