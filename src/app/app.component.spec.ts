import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, HttpModule } from '@angular/http';
import { Ng2PageScrollModule, PageScrollConfig } from 'ng2-page-scroll';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

import { Api } from './services/api';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let cookieStatus: string;

  const mockCookieService = {
    get: (cookie) => cookieStatus,
    set: (cookie, status) => null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: mockCookieService },
        Api,
        PageScrollConfig
      ],
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpModule,
        Ng2PageScrollModule.forRoot()
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

  describe('ngOnInit()', () => {
    it('should set loggedIn to be false', () => {
      cookieStatus = 'false';
      component.ngOnInit();
      expect(component.loggedIn).toBe('false');
    });
  });

  describe('removeCookie()', () => {
    it('should set loggedIn to be false', () => {

      component.removeCookie();
      expect(component.loggedIn).toBe('false');
    });

    it('should set logout to be true', () => {

      component.removeCookie();
      expect(component.logout).toBe(true);
    });
  });
});
