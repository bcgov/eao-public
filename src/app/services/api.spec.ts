import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';

import { Api } from './api';

describe('Api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        Api
      ]
    });
  });

  it('should be created', inject([Api], (service: Api) => {
    expect(service).toBeTruthy();
  }));
});
