import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EsriLoaderService } from 'angular-esri-loader';

import { MapConfigService } from '../config/map-config.service';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss'],
  providers: [
    MapConfigService
  ]
})
export class MainMapComponent implements OnInit {
  webMapProperties: __esri.WebMapProperties;
  mapViewProperties: __esri.MapViewProperties;
  popupProperties: __esri.PopupTemplateProperties;
  map: __esri.Map;
  mapView: __esri.MapView;
  search: __esri.Search;
  zoom: __esri.Zoom;

  @HostBinding('class.full-screen') fullScreen = true;

  constructor(
    private config: MapConfigService,
    private route: ActivatedRoute,
    private esriLoader: EsriLoaderService
  ) { }

  ngOnInit() {
    const props = this.config.get();
    this.webMapProperties = props.mainMap.webmap;
    this.mapViewProperties = props.mainMap.mapView;
    this.popupProperties = props.mainMap.popup;
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
    // need to cast the layer as FeatureLayer to make TypeScript happy
    return map.layers.find(lyr => lyr.type === 'feature') as __esri.FeatureLayer;
  }

  private setPopupTemplateForLayer(featureLayer: __esri.FeatureLayer, popupTemplate: __esri.PopupTemplateProperties): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // the `esri/layers/FeatureLayer` instance is promise-based...
      // call the .then() method to execute code once the layer is ready
      return featureLayer.then(
        (fl: __esri.FeatureLayer) => {
          if (popupTemplate) {
            fl.popupTemplate.title = popupTemplate.title;
            fl.popupTemplate.content = popupTemplate.content;
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
          <any>{
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
