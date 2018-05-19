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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
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
    describe('loggedIn cookie undefined', () => {
      it('should set loggedIn to be false', () => {
        component.ngOnInit();
        expect(component.loggedIn).toBe('false');
      });
    });

    describe('loggedIn cookie defined', () => {
      it('should set loggedIn to be false', () => {
        const cookieService: CookieService = TestBed.get(CookieService);
        cookieService.set('loggedIn', 'false');
        component.ngOnInit();
        expect(component.loggedIn).toBe('false');
      });
    });
  });

  describe('removeCookie()', () => {
    let cookieService: CookieService;

    beforeEach(() => {
      cookieService = TestBed.get(CookieService);
      cookieService.set('loggedIn', 'true');

      component.removeCookie();
    });

    it('should set the loggedIn cookie to be false', () => {
      expect(cookieService.get('loggedIn')).toBe('false');
    });

    it('should set loggedIn to be false', () => {
      expect(component.loggedIn).toBe('false');
    });

    it('should set logout to be true', () => {
      expect(component.logout).toBe(true);
    });
  });
});
