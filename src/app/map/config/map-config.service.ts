import { Injectable } from '@angular/core';

import { Api } from 'app/services/api';
import { GeocoderSettings } from '../widgets/support/geocoder';

const webmaps = {
  dev: 'a39ebfecf4a84daf926dcd7f2ce000a8',
  test: 'a39ebfecf4a84daf926dcd7f2ce000a8',
  train: 'a39ebfecf4a84daf926dcd7f2ce000a8',
  prod: 'a39ebfecf4a84daf926dcd7f2ce000a8'
};

export interface MapConfig {
  mainMap?: {
    webmap?: __esri.WebMapProperties,
    mapView?: __esri.MapViewProperties,
    popup?: __esri.PopupTemplateProperties,
    geocoder?: GeocoderSettings;
  };
}

@Injectable()
export class MapConfigService {

  constructor(private api: Api) { }

  public get(): MapConfig {
    const webmapId = this.webmapForEnv(this.api.env);
    return {
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
        geocoder: {
          type: 'databc',  // One of: [databc, arcgis]
        }
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
                <a class="btn btn-sm slide-r-btn" title="View additional information about {name}" href="${this.projectUrl('{code}')}">
                  <span>Project Info</span><i class="material-icons">arrow_forward</i>
                </a>
              <div>
            </div>`
    };
  }

  private projectUrl(code: string): string {
    return `${this.api.hostnameEPIC}/p/${code}/detail`;
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
}
