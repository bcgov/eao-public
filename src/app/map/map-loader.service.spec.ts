import { TestBed, inject } from '@angular/core/testing';

import { MapLoaderService } from './map-loader.service';
import { EsriLoaderModule } from 'angular-esri-loader';

describe('MapLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EsriLoaderModule
      ],
      providers: [
        MapLoaderService
      ]
    });
  });

  it('should be created', inject([MapLoaderService], (service: MapLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
