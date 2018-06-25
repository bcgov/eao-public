import { Injectable } from '@angular/core';

import { Api } from 'app/services/api';
import { GeocoderSettings } from '../widgets/support/geocoder';
import { ILoadScriptOptions } from 'esri-loader';

// Default ArcGIS options:
//   --> the specific version of the API that is to be used
//   --> suppress "deprecation" warnings in the console
//       https://www.__esri.com/arcgis-blog/products/js-api-arcgis/mapping/making-better-promises/
const arcgisDefaults: ILoadScriptOptions = {
  url: 'https://js.arcgis.com/4.6/',
  dojoConfig: {
    has: {
      'esri-promise-compatibility': 1,
      'esri-promise-compatibility-deprecation-warnings': 0
    }
  }
};

const webmaps = {
  dev: 'a39ebfecf4a84daf926dcd7f2ce000a8',
  test: 'a39ebfecf4a84daf926dcd7f2ce000a8',
  train: 'a39ebfecf4a84daf926dcd7f2ce000a8',
  prod: 'a39ebfecf4a84daf926dcd7f2ce000a8'
};

export interface MapConfig {
  arcgis?: ILoadScriptOptions;
  mainMap?: {
    webmap?: __esri.WebMapProperties,
    mapView?: __esri.MapViewProperties,
    popup?: __esri.PopupTemplateProperties,
    mouseover?: __esri.PopupTemplateProperties,
    geocoder?: GeocoderSettings;
  };
}

@Injectable()
export class MapConfigService {
  // cache map configuration object for improved performance
  private cache: MapConfig = null;

  constructor(private api: Api) { }

  public get(): MapConfig {
    // return cached value
    if (this.cache) {
      return { ...this.cache };
    } else {
      // create and cache value
      const config: MapConfig = this._create();
      this.cache = config;

      // return a copy so callers cannot alter the default configuration
      return { ...this.cache };
    }
  }

  private _create(): MapConfig {
    const loadScriptOptions = arcgisDefaults;
    const webmapId = this.webmapForEnv(this.api.env);
    const geocoderOptions = this.geocoderDefaults();

    // return configuration object
    return {
      arcgis: loadScriptOptions,
      mainMap: {
        webmap: {
          portalItem: { id: webmapId }
        },
        mapView: {
          constraints: {
            minZoom: 4,  // EPIC-1209 prevent user from zooming too far out
            rotationEnabled: false  // EPIC-1239 disable map rotation
          },
          ui: {
            components: ['attribution']
          }
        },
        popup: this.defaultPopupTemplate,
        mouseover: this.defaultMouseoverTemplate,
        geocoder: geocoderOptions
      }
    };
  }

  get defaultPopupTemplate(): __esri.PopupTemplateProperties {
    return {
      title: '{name}',
      content: `<div class="map-popup-content">
              <ul class="map-popup-meta">
                <li>
                  <span class="meta-name">Type:</span>
                  <span class="meta-value">{type}</span>
                </li>
              </ul>
              <div class="map-popup-desc" *ngIf="description">{description}</div>
              <div class="map-popup-btns">
                <a class="btn btn-sm slide-r-btn inverted" title="View additional information about {name}" 
                  href="${this.projectUrl('{code}')}">
                  <span>Project Info</span><i class="material-icons">arrow_forward</i>
                </a>
              <div>
            </div>`
    };
  }

  get defaultMouseoverTemplate(): __esri.PopupTemplateProperties {
    return {
      title: '{name}',
      content: `<div class="map-mouseover-hidden-description-content"></div>`
    };
  }

  private projectUrl(code: string): string {
    return `/p/${code}`;
  }

  private webmapForEnv(env: 'local' | 'dev' | 'test' | 'prod'): string {
    switch (env) {
      // local
      case 'local':
        return webmaps.dev;

      // dev
      case 'dev':
        return webmaps.dev;

      // test
      case 'test':
        return webmaps.test;

      // prod
      case 'prod':
      default:
        return webmaps.prod;
    }
  }

  private geocoderDefaults(): any {
    return {
      type: 'databc',  // One of: [databc, arcgis]
      url: `${this.api.apiPath}/geocoder`
    };
  }
}
