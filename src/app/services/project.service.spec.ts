import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ProjectService } from './project.service';
import { Api } from './api';

import { Observable } from 'rxjs/Rx';

describe('ProjectService', () => {
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

  it('should be created', inject([ProjectService, XHRBackend], (projectService, mockBackend) => {
    expect(projectService).toBeTruthy();
  }));
});
