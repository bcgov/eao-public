import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ProjectService } from './project.service';
import { Api } from './api';

import { Observable } from 'rxjs/Rx';

describe('ProjectService', () => {
  let projectItem;

  function createProjectItem(projectCode: string) {
    return projectItem = {
      'code': projectCode
    };
  }

  function mockBackEnd(mockResponse: any[], mockBackend: any) {
    // Subscribe to opened http connections
    mockBackend.connections.subscribe((connection) => {
      // Have connection send a response
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        Api,
        ProjectService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });
  describe('getAll()', () => {
    describe('given a valid response', () => {
      let mockResponse;

      it('returns 0 items',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        mockResponse = [];

        mockBackEnd(mockResponse, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(0);
          }
        );
      }));
      it('returns 2 items',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        mockResponse = [
          createProjectItem('ajax-mine'),
          createProjectItem('aley-mine')
        ];

        mockBackEnd(mockResponse, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(2);
          }
        );
      }));
      it('returns n items',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        mockResponse = [
          createProjectItem('ajax-mine'),
          createProjectItem('ajax-mine'),
          createProjectItem('ajax-mine'),
          createProjectItem('ajax-mine'),
          createProjectItem('ajax-mine'),
          createProjectItem('ajax-mine'),
          createProjectItem('ajax-mine'),
          createProjectItem('ajax-mine'),
          createProjectItem('aley-mine')
        ];

        mockBackEnd(mockResponse, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(9);
          }
        );
      }));
    });
  });
  describe('getByCode(code)', () => {
    let mockResponse;
    let expectedResponse;
    describe('given no project code', () => {
      it('returns 0 items',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        mockResponse = [];

        mockBackEnd(mockResponse, mockBackend);

        projectService.getByCode('').subscribe(
          project => {
            expect(project.length).toBe(0);
          }
        );
      }));
    });
    describe('given a valid project code', () => {
      beforeEach(() => {
        mockResponse = [
          createProjectItem('ajax-mine')
        ];

        expectedResponse = [
          createProjectItem('ajax-mine')
        ];
      });
      it('returns 1 item',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        projectService.getByCode('ajax-mine').subscribe(
          project => {
            expect(project.length).toBe(1);
          }
        );
      }));
      it('returns a project with the same project code passed in',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        mockBackEnd(mockResponse, mockBackend);

        projectService.getByCode('ajax-mine').subscribe(
          project => {
            expect(project.length).toBe(1);
            expect(JSON.stringify(project[0].code)).toBe(JSON.stringify(expectedResponse[0].code));
          }
        );
      }));
    });
  });
});
