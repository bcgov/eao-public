import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EsriLoaderService } from 'angular-esri-loader';

import { MAP_CONFIG_TOKEN, DEFAULT_MAP_CONFIG, MapConfig } from '../config';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss'],
  providers: [
    { provide: MAP_CONFIG_TOKEN, useValue: DEFAULT_MAP_CONFIG }
  ]
})
export class MainMapComponent implements OnInit {
  webMapProperties: __esri.WebMapProperties;
  mapViewProperties: __esri.MapViewProperties;
  popupProperties: __esri.PopupProperties;
  map: __esri.Map;
  mapView: __esri.MapView;
  search: __esri.Search;
  zoom: __esri.Zoom;

  @HostBinding('class.full-screen') fullScreen = true;

  constructor(
    @Inject(MAP_CONFIG_TOKEN) private config: MapConfig,
    private route: ActivatedRoute,
    private esriLoader: EsriLoaderService
  ) { }

  ngOnInit() {
    this.webMapProperties = this.config.mainMap.webmap;
    this.mapViewProperties = this.config.mainMap.mapView;
    this.popupProperties = this.config.mainMap.popup;
  }

  onMapInit(mapInfo: { map: __esri.Map, mapView: __esri.MapView }): void {
    const args = {
      ...mapInfo,
      popupProperties: this.popupProperties,
      featureLayer: <__esri.FeatureLayer>null,
      search: <__esri.Search>null,
      zoom: <__esri.Zoom>null
    };

    Promise.resolve(args)
      // store local references to map and view
      .then(obj => {
        this.map = obj.map;
        this.mapView = obj.mapView;
        return obj;
      })
      // create zoom widget instance
      .then(obj => {
        const { mapView } = obj;
        return this.createZoomWidget(mapView)
          .then(zoom => this.zoom = obj.zoom = zoom)
          .then(() => obj);
      })
      // find the feature layer with `project` data
      .then(obj => {
        const { map } = obj;  // es6 destructuring
        obj.featureLayer = this.findFeatureLayer(map);
        return obj;
      })
      // set map popup to match app styling
      .then(obj => {
        const { featureLayer, popupProperties } = obj;
        return this.setPopupTemplateForLayer(featureLayer, popupProperties)
          .then(() => obj);
      })
      // create search widget instance, then add it to the map
      .then(obj => {
        const { mapView, featureLayer } = obj;
        return this.createSearchWidget(mapView, featureLayer)
          .then(search => this.search = obj.search = search)
          .then(() => obj);
      })
      // position the interactive widgets (i.e. zoom, search) on the map
      .then(obj => {
        const { mapView, search, zoom } = obj;
        mapView.ui.add(zoom, 'bottom-right');
        mapView.ui.add(search, 'top-left');
      });
  }

  private findFeatureLayer(map: __esri.Map): __esri.FeatureLayer {
    return map.layers.find((lyr: __esri.Layer) => lyr.type === 'feature');
  }

  private setPopupTemplateForLayer(featureLayer: __esri.FeatureLayer, popupTemplate: __esri.PopupTemplateProperties): Promise<void> {
    return new Promise((resolve, reject) => {
      // the `esri/layers/FeatureLayer` instance is promise-based...
      // call the .then() method to execute code once the layer is ready
      return featureLayer.then(
        (fl: __esri.FeatureLayer) => {
          if (popupTemplate) {
            fl.popupTemplate.title = <string>popupTemplate.title;
            fl.popupTemplate.content = <string>popupTemplate.content;
          }
        })
        .then(() => resolve())
        .otherwise(reject);
    });
  }

  private createSearchWidget(view: __esri.MapView, featureLayer: __esri.FeatureLayer): Promise<__esri.Search> {
    return this.esriLoader.loadModules(['esri/widgets/Search']).then(([Search]: [__esri.SearchConstructor]) => {
      const search = new Search({
        view: view,
        sources: [
          {
            featureLayer: featureLayer,
            displayField: 'name',
            searchFields: ['name', 'description'],  // the names of fields in the feature layer to search
            outFields: ['*'],
            autoNavigate: true,
            resultGraphicEnabled: false,  // whether to show a graphic on the map for the selected source using the `resultSymbol`
            withinViewEnabled: false,  // whether to constrain the search results to the view's extent
            zoomScale: 500000,
            suggestionsEnabled: true,
            minSuggestCharacters: 1,  // minimum number of characters required before querying for a suggestion
            maxSuggestions: 6,
            placeholder: 'Find EA projects'
          }
        ]
      });
      return search;
    });
  }

  private createZoomWidget(view: __esri.MapView): Promise<__esri.Zoom> {
    return this.esriLoader.loadModules(['esri/widgets/Zoom'])
      .then(([Zoom]: [__esri.ZoomConstructor]) => new Zoom({ view: view }));
  }
}
