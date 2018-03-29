import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';

import { WidgetBuilder } from './widget-builder';
import { MapConfigService } from '../config/map-config.service';
import { Api } from '../../services/api';
import { MapModule } from '../map.module';

describe('MapWidgetFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        MapModule
      ],
      providers: [
        WidgetBuilder,
        MapConfigService,
        Api
      ]
    });
  });

  it('should be created', inject([WidgetBuilder], (service: WidgetBuilder) => {
    expect(service).toBeTruthy();
  }));
});
