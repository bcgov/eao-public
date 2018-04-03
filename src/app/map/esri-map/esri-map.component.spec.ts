import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EsriLoaderModule } from 'angular-esri-loader';
import { ElementRef } from '@angular/core';

import { EsriMapComponent } from './esri-map.component';
import { MapLoaderService } from '../map-loader.service';

describe('EsriMapComponent', () => {
  let component: EsriMapComponent;
  let fixture: ComponentFixture<EsriMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        EsriLoaderModule
      ],
      declarations: [
        EsriMapComponent
      ],
      providers: [
        MapLoaderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsriMapComponent);
    component = fixture.componentInstance;
    component.mapProperties = {};
    component.webMapProperties = {};
    component.mapViewProperties = {};
    component.mapEl = new ElementRef('div');
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
