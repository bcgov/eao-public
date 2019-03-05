import { Component, OnInit } from '@angular/core';
import { Home } from '../models/home';
import { NewsService } from '../services/news.service';
import { Api } from '../services/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  results: Array<Home>;
  hostname: string;
  constructor(private newsService: NewsService, private api: Api) { }

  ngOnInit() {
    this.newsService.getRecentNews().subscribe(
      data => {
        this.setDocumentUrl(data);
        this.results = data;
      },
      error => console.log(error)
    );
  }

  setDocumentUrl(data) {
    const regex = /http(s)?:\/\/(www.)?/;
    data.forEach(activity => {
      if (!activity.documentUrl) {
        return ;
      }
      if (!regex.test(activity.documentUrl)) {
        activity.documentUrl = `${this.api.hostnameEPIC }${ activity.documentUrl }`;
      }
      const tail = activity.documentUrl.split('/').slice(-2);
      if (tail[1] === 'fetch') {
        const id = tail[0];
        this.newsService.getDocument(id).subscribe(
          doc => {
          const safeName = doc[0].documentFileName.replace(/ /g, '_');
          activity.documentUrl = `${activity.documentUrl}/${safeName}`;
          }
        );
      }
    });
  }
}
