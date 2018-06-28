import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MapConfigService } from '../core';
import { WidgetBuilder} from '../widgets/widget-builder';
import * as utils from '../support/map-utils';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit {
  webMapProperties: __esri.WebMapProperties;
  mapViewProperties: __esri.MapViewProperties;
  popupProperties: __esri.PopupTemplateProperties;
  geocoderProperties: any;
  map: __esri.Map;
  mapView: __esri.MapView;
  pointLayerTitle: string;
  pointLayer: __esri.FeatureLayer;

  @Input() animate = true;

  @HostBinding('class.full-screen') fullScreen = true;

  // private fields
  private selectedId: string;
  private sub: Subscription;

  constructor(
    private config: MapConfigService,
    private route: ActivatedRoute,
    private widgetBuilder: WidgetBuilder
  ) { }

  ngOnInit() {
    const props = this.config.get();
    this.pointLayerTitle = props.mainMap.pointLayerTitle;
    this.webMapProperties = props.mainMap.webmap;
    this.mapViewProperties = props.mainMap.mapView;
    this.popupProperties = props.mainMap.popup;
    this.geocoderProperties = props.mainMap.geocoder;
  }

  onMapInit(mapInfo: { map: __esri.Map, mapView: __esri.MapView }): void {
    const map = mapInfo.map;
    const view = mapInfo.mapView;
    const widgetBuilder = this.widgetBuilder;
    const popupProperties = this.popupProperties;
    const geocoder = this.geocoderProperties;

    // find the feature layer with `project` data.
    const layerTitle = this.pointLayerTitle;
    const featureLayer = <__esri.FeatureLayer>utils.findLayerByTitle(map, layerTitle);

    // store local references to map and view
    this.map = map;
    this.mapView = view;
    this.pointLayer = featureLayer;

    this.mapView.on('click', utils.onClickHandler(featureLayer, view, popupProperties));
    this.mapView.on('pointer-move', utils.onMouseoverHandler(featureLayer, view, popupProperties));

    // 1- wait for layers to load
    // 2- set map popup to match our custom styling
    // 3- create interactive map controls (e.g. zoom, search widgets)
    // 4- automatically show project popup on the map when coming from project details page
    utils.whenLayersReady([featureLayer])
      .then(() => utils.setPopupTemplate(featureLayer, popupProperties))
      .then(() => utils.addWidgets(view, widgetBuilder, { search: { featureLayer, geocoder } }))
      .then(() => {
        // grabbing route parameters (the Observable way)
        this.sub = this.route.paramMap.subscribe(
          (params: ParamMap) => this.onRouteChange(params),
          () => this.sub.unsubscribe(),
          () => this.sub.unsubscribe(),
        );
      });
  }

  private onRouteChange(params: ParamMap) {
    // fetch the project Id from URL/route params (if any)
    this.selectedId = params.get('project');

    // automatically show project popup on the map when coming from project details page
    if (this.selectedId && this.mapView && this.pointLayer) {
      this.navigateToProject(this.selectedId, this.mapView, this.pointLayer, this.animate);
    }
  }

  private navigateToProject(id: string, view: __esri.MapView, featureLayer: __esri.FeatureLayer, animate = this.animate) {
    let target: __esri.Graphic;
    return utils
      .findProjectById(featureLayer, id)
      .then((response: __esri.FeatureSet) => {
        target = response && response.features && response.features.length ? response.features[0] : null;
      })
      .then(() => utils.zoomToLocation(view, target, animate))
      .then(() => utils.showMapPopup(view, target));
  }
}
