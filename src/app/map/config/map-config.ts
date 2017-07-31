import { InjectionToken } from '@angular/core';

import { MapConfig } from './map-config.interface';

const webmaps = {
  dev: '63e8128ae559429dbc7b045e8a6ba771',
  test: '63e8128ae559429dbc7b045e8a6ba771',
  train: '63e8128ae559429dbc7b045e8a6ba771',
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

export const defaultPopupTemplate = {
  title: '{name}',
  content: `<div class="map-popup-content">
    <span><strong>Type:</strong> {type}</span>
    <div class="popup-detail-container">{description}</div>
    <div class="popup-btn-container">
      <a class="btn slide-r-btn inverted" href="${projectUrl('{code}')}">
        <span>Go to Project Details</span><i class="material-icons">arrow_forward</i>
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
    mapView: {},
    popup: defaultPopupTemplate
  }
};

// make this configuration object available for injection
// https://angular.io/guide/dependency-injection#injectiontoken
export let MAP_CONFIG_TOKEN = new InjectionToken<MapConfig>('map.config');
