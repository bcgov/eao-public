import { TestBed, inject } from '@angular/core/testing';

import { EsriModuleProvider } from './esri-module-provider';

describe('EsriModuleProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsriModuleProvider]
    });
  });

  it('should be created', inject([EsriModuleProvider], (service: EsriModuleProvider) => {
    expect(service).toBeTruthy();
  }));
});
