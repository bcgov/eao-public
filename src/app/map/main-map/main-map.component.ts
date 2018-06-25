import { Component, HostBinding, Input, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MapConfigService } from '../core';
import { WidgetBuilder, ZoomWidgetProperties, SearchWidgetProperties } from '../widgets/widget-builder';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit {
  webMapProperties: __esri.WebMapProperties;
  mapViewProperties: __esri.MapViewProperties;
  popupProperties: __esri.PopupTemplateProperties;
  mouseoverProperties: __esri.PopupTemplateProperties;
  geocoderProperties: any;
  map: __esri.Map;
  mapView: __esri.MapView;
  search: __esri.Search;
  zoom: __esri.Zoom;

  @Input() animate = true;

  @HostBinding('class.full-screen') fullScreen = true;

  // private fields
  private selectedId: string;

  constructor(
    private config: MapConfigService,
    private route: ActivatedRoute,
    private widgetBuilder: WidgetBuilder
  ) { }

  ngOnInit() {
    const props = this.config.get();
    this.webMapProperties = props.mainMap.webmap;
    this.mapViewProperties = props.mainMap.mapView;
    this.popupProperties = props.mainMap.popup;
    this.mouseoverProperties = props.mainMap.mouseover;
    this.geocoderProperties = props.mainMap.geocoder;
  }

  onMapInit(mapInfo: { map: __esri.Map, mapView: __esri.MapView }): void {
    const args = {
      ...mapInfo,
      popupProperties: this.popupProperties,
      mouseoverProperties: this.mouseoverProperties,
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
        return this.widgetBuilder.createWidget('zoom', { view: obj.mapView })
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
        return this.setPopupTemplateForLayer(featureLayer, this.mapView, popupProperties)
          .then(() => obj);
      })
      // set map mouseovers to match app styling
      .then(obj => {
        const { featureLayer, mouseoverProperties, popupProperties } = obj;
        return this.setMouseoversForMapview(featureLayer, this.mapView, mouseoverProperties, popupProperties)
          .then(() => obj);
      })
      // create search widget instance, then add it to the map
      .then(obj => {
        const props: SearchWidgetProperties = {
          view: obj.mapView,
          featureLayer: obj.featureLayer,
          geocoder: this.geocoderProperties
        };
        return this.widgetBuilder.createWidget('search', props)
          .then(search => this.search = obj.search = search)
          .then(() => obj);
      })
      // position the interactive widgets (i.e. zoom, search) on the map
      .then(obj => {
        const { mapView, search, zoom } = obj;
        mapView.ui.add(zoom, 'bottom-right');
        mapView.ui.add(search, 'top-left');
        return obj;
      })
      // automatically show project popup on the map when coming from project details page
      .then(obj => {
        this.route.paramMap.subscribe((params: ParamMap) => {
          const { featureLayer, mapView } = obj;  // es6 destructuring
          let targetMine: __esri.Graphic;

          // fetch the project Id from URL/route params (if any)
          this.selectedId = params.get('project');

          if (this.selectedId) {
            this.queryMapLayer(featureLayer, this.selectedId)
              .then((response: __esri.FeatureSet) => {
                targetMine = response && response.features && response.features.length ? response.features[0] : null;
              })
              .then(() => this.zoomToMine(mapView, targetMine, this.animate))
              .then(() => this.showMapPopup(mapView, targetMine));
          }
        });
      });
  }

  private findFeatureLayer(map: __esri.Map): __esri.FeatureLayer {
    // need to cast the layer as FeatureLayer to make TypeScript happy
    return map.layers.find(lyr => lyr.type === 'feature') as __esri.FeatureLayer;
  }

  private setPopupTemplateForLayer(featureLayer: __esri.FeatureLayer, mapView: __esri.MapView,
    popupTemplate: __esri.PopupTemplateProperties): Promise<void> {
      const self = this;
      return new Promise<void>((resolve, reject) => {
      // the `esri/layers/FeatureLayer` instance is promise-based...
      // call the .when() method to execute code once the layer is ready
      return mapView.when(
        (mv: __esri.MapView) => {
          // we need the mapview to access the mouseover event, which is now called pointer-move in esri 4.7
          mv.whenLayerView(featureLayer).then(function(lv) {
            mv.on('click', self.onClickHandler(featureLayer, mv, popupTemplate));
          });
        })
        .then(() => resolve())
        .catch(reject) &&
        featureLayer.when(
        (fl: __esri.FeatureLayer) => {

          if (popupTemplate) {
            fl.popupTemplate.title = popupTemplate.title;
            fl.popupTemplate.content = popupTemplate.content;
          }
        })
        .then(() => resolve())
        .catch(reject);
    });
  }

  private setMouseoversForMapview(
    featureLayer: __esri.FeatureLayer, mapView: __esri.MapView,
     mouseoverTemplate: __esri.PopupTemplateProperties, popupTemplate: __esri.PopupTemplateProperties): Promise<void> {
    const self = this;
    return new Promise<void>((resolve, reject) => {
      // the `esri/MapView` instance is promise-based...
      // call the .when() method to execute code once the mapView is ready
      return mapView.when(
        (mv: __esri.MapView) => {
          // we need the mapview to access the mouseover event, which is now called pointer-move in esri 4.7
          mv.whenLayerView(featureLayer).then(function(lv) {
            mv.on('pointer-move', self.onMouseoverHandler(featureLayer, mv, mouseoverTemplate, popupTemplate));
          });
        })
        .then(() => resolve())
        .catch(reject);
    });
  }

  public onClickHandler(featureLayer: __esri.FeatureLayer, mapView: __esri.MapView,
    popupTemplate: __esri.PopupTemplateProperties) {
    const self = this;
    return function() {
      self.resetToPopupStyle(featureLayer, mapView, popupTemplate);
    };
  }

  public resetToPopupStyle(featureLayer: __esri.FeatureLayer, mapView: __esri.MapView,
   popupTemplate: __esri.PopupTemplateProperties) {
    if (null !== mapView.popup.title) {
      const currentPopupTitle = String(mapView.popup.title.toString());

      if (currentPopupTitle.includes('moTitle') || 0 === currentPopupTitle.length) {
        mapView.popup.close();
      }
    }
    if (popupTemplate) {
      featureLayer.popupTemplate.title = popupTemplate.title;
      featureLayer.popupTemplate.content = popupTemplate.content;
    }
    mapView.popup.dockOptions = {
      buttonEnabled: true
    };
  }

  public onMouseoverHandler(featureLayer: __esri.FeatureLayer, mapView: __esri.MapView,
   mouseoverTemplate: __esri.PopupTemplateProperties, popupTemplate: __esri.PopupTemplateProperties) {
    const self = this;
    return function(args) {
      self.resetToPopupStyle(featureLayer, mapView, popupTemplate);

      // only proceed if we're over the pin on the map
      mapView.hitTest(args).then(function(evt) {
        if (null !== evt.results[0].graphic) {
          // if there is an open popup, do nothing unless it's closed
          if ((null !== mapView.popup.visible) && (mapView.popup.visible)) {
            if (null !== mapView.popup.title) {
              const currentPopupTitle = String(mapView.popup.title.toString());
              if (!currentPopupTitle.includes('moTitle')) {
                if (0 === mapView.popup.title.length) {
                  mapView.popup.close();
                }
                return;
              }
            }
          }
          // set the look and feel for the popup we are using as a mouseover
          if (mouseoverTemplate) {
            featureLayer.popupTemplate.title = mouseoverTemplate.title;
            featureLayer.popupTemplate.content = mouseoverTemplate.content;
          }
          mapView.popup.dockOptions = {
            // Disable dock button
            buttonEnabled: false
          };
          mapView.popup.open({
            location: evt.results[0].mapPoint,
            title: '<div id="moTitle">' + evt.results[0].graphic.attributes.name + '</div>'
          });
        }
      });
    };
  }

  private queryMapLayer(featureLayer: __esri.FeatureLayer, projectId: string): Promise<__esri.FeatureSet> {
    return new Promise((resolve, reject) => {
      // construct a query object that matches the layer's current configuration
      const query = featureLayer.createQuery();
      query.where = `code = '${projectId}'`;

      // query the layer with the modified params object
      // then set the popup's features which will populate popup content and title
      return featureLayer.queryFeatures(query)
        .then(results => resolve(results))
        .catch(reject);
    });
  }

  private zoomToMine(view: __esri.MapView, targetMine: __esri.Graphic, animate: boolean = false): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const opts: __esri.MapViewGoToOptions = {
        animate: animate
      };

      // the `goTo` function returns a promise which resolves as soon as the new view has been set to the target.
      return view.goTo(
        {
          target: targetMine,
          zoom: 9
        }, opts)
        .then(() => resolve())
        .catch(reject);
    });
  }

  private showMapPopup(view: __esri.MapView, targetMine: __esri.Graphic): void {
    view.popup.open({
      features: [targetMine],
      updateLocationEnabled: true  // updates the location of popup based on selected feature's geometry
    });
  }
}
