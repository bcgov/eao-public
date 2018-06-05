import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageScrollConfig } from 'ng2-page-scroll';
import { Api } from './services/api';
import { EmailService } from './services/email.service';
import { NewsService } from './services/news.service';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProjectService, NewsService, EmailService]
})
export class AppComponent implements OnInit {
  loginURL: string;
  constructor(private _router: Router, private api: Api) {
    const isDevEnv = this.api.env === 'dev';
    this.loginURL = isDevEnv ? this.api.hostnameEPIC + '/authentication/local/signin' : this.api.hostnameEPIC + '/authentication/signin';

    PageScrollConfig.defaultScrollOffset = 50;
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) {
          return b;
        }
        if (t === d) {
          return b + c;
        }
        if ((t /= d / 2) < 1) {
          return c / 2 * Math.pow(2, 8 * (t - 1)) + b;
        }
        return c / 2 * (-Math.pow(2, -8 * --t) + 2) + b;
      }
    };
  }

  ngOnInit() {
    this._router.events.subscribe((url: any) => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
}
