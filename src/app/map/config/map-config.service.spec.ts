import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';

import { MapConfigService } from './map-config.service';
import { Api } from '../../services/api';

describe('MapConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        MapConfigService,
        Api
      ]
    });
  });

  it('should be created', inject([MapConfigService], (service: MapConfigService) => {
    expect(service).toBeTruthy();
  }));
});
