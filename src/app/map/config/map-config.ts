import { InjectionToken } from '@angular/core';

import { MapConfig } from './map-config.interface';

const webmaps = {
  dev: 'a39ebfecf4a84daf926dcd7f2ce000a8',
  test: 'a39ebfecf4a84daf926dcd7f2ce000a8',
  train: 'a39ebfecf4a84daf926dcd7f2ce000a8',
  prod: 'a39ebfecf4a84daf926dcd7f2ce000a8'
};

const webmapForEnv = (): string => {
  const { hostname } = window.location;
  switch (hostname) {
    // prod
    case 'projects.eao.gov.bc.ca':
      return webmaps.prod;

    // test
    case 'esm-test.pathfinder.gov.bc.ca':
    case 'test.projects.eao.gov.bc.ca':
      return webmaps.test;

    // train
    case 'train.projects.eao.gov.bc.ca':
      return webmaps.train;

    // dev (localhost OR esm-master.pathfinder.gov.bc.ca)
    default:
      return webmaps.dev;
  }
};

// strip "www." from current URL and append "/p/<code>/detail"
const projectUrl = (code: string): string => {
  const { protocol, host } = window.location;
  const hostSansWww = host.replace(/^www\./, '');

  // www.* = eao-public
  // .* = whatever the env is
  // for example:
  // www.projects.eao.gov.bc.ca    <-- eao-public
  // projects.eao.gov.bc.ca        <-- esm-server
  return `${protocol}//${hostSansWww}/p/${code}/detail`;
};

export const defaultPopupTemplate: __esri.PopupTemplateProperties = {
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
                <a class="btn btn-sm slide-r-btn" title="View additional information about {name}" href="${projectUrl('{code}')}">
                  <span>Project Info</span><i class="material-icons">arrow_forward</i>
                </a>
              <div>
            </div>`
};

// What if the dependency value isn't a class? Sometimes the thing you want to inject
// is a string, function, or object. Applications often define configuration objects
// with lots of small facts (like the title of the application or the address of a web API endpoint)
// but these configuration objects aren't always instances of a class.
// They can be object literals such as this one:
export const DEFAULT_MAP_CONFIG: MapConfig = {
  mainMap: {
    webmap: {
      portalItem: {
        id: webmapForEnv()
      }
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
    popup: defaultPopupTemplate
  }
};

// make this configuration object available for injection
// https://angular.io/guide/dependency-injection#injectiontoken
export let MAP_CONFIG_TOKEN = new InjectionToken<MapConfig>('map.config');
