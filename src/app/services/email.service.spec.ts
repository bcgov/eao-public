import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { EmailService } from './email.service';
import { Api } from './api';

import { Observable } from 'rxjs/Rx';

describe('EmailService', () => {
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
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        Api,
        EmailService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });
  describe('sendEmail(data)', () => {
    describe('given valid parameters', () => {
      it('should send the email', inject([EmailService, XHRBackend], (emailService, mockBackend) => {

        const mockResponse = '';
        const data = 'This is the most amazing test ever';

        mockBackEnd(mockResponse, mockBackend);

        emailService.sendEmail(data).subscribe(
          email => {
            expect(email).toBeTruthy();
          }
        );
      }));
    });
  });
});
