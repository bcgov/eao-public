import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPageScrollModule, PageScrollConfig } from 'ngx-page-scroll';
import { AppComponent } from './app.component';
import { Api } from './services/api';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Api,
        PageScrollConfig
      ],
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpModule,
        NgxPageScrollModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('constructor', () => {
    describe('hostname and loginURL', () => {
      it('should set hostname to api.hostnameEPIC',
        inject(([Api]), api => {
        expect(component.hostname).toBe(api.hostnameEPIC);
      }));
      it('should set loginURL to this.hostname + \'/authentication/local/signin\'', () => {
        expect(component.loginURL).toBe(component.hostname + '/authentication/local/signin');
      });
    });
    describe('PageScrollConfig', () => {
      it('should set defaultScrollOffset to 50', () => {
        expect(PageScrollConfig.defaultScrollOffset).toBe(50);
      });
      it('should set ease to 1', () => {
        expect(PageScrollConfig.defaultEasingLogic.ease(0, 1, 2, 3)).toBe(1);
      });
      it('should set ease to 3', () => {
        expect(PageScrollConfig.defaultEasingLogic.ease(1, 1, 2, 1)).toBe(3);
      });
      it('should set ease to 1.0625', () => {
        expect(PageScrollConfig.defaultEasingLogic.ease(4, 1, 2, 16)).toBe(1.0625);
      });
      it('should set ease to 3', () => {
        expect(PageScrollConfig.defaultEasingLogic.ease(4, 1, 2, 1)).toBe(3);
      });
    });
  });
});
