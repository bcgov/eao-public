import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import { PaginationInstance } from 'ngx-pagination';
import { Api } from '../services/api';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  results: Array<News>;
  public loading: boolean;
  public showFilters: boolean;
  public projectFilter: boolean;
  public filter = '';
  public NewsTypeFilter: '';
  public isDesc: boolean;
  public column: string;
  public direction: number;
  public filterType = '';
  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1
  };
  hostname: String;

  constructor(private newsService: NewsService, private _changeDetectionRef: ChangeDetectorRef, private api: Api) { }

  ngOnInit() {
    this.loading = true;
    this.newsService.getAll().subscribe(
      data => {
        this.setDocumentUrl(data);
        this.results = data;
        this.loading = false;
        this.column = 'dateAdded';
        this.direction = -1;
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }

  setDocumentUrl(data) {
    // attach host to document url if it goes to esm-server
    const regex = /http(s)?:\/\/(www.)?/;
    data.forEach(activity => {
      if (!activity.documentUrl) {
        return ;
      }
      if (!regex.test(activity.documentUrl)) {
        activity.documentUrl = `${this.api.hostnameEPIC }${ activity.documentUrl }`;
      }
    });
  }

  sort (property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  clearAllNewsFilters() {
    this.filter = undefined;
    this.NewsTypeFilter = undefined;
    this.filterType = undefined;
  }

  readmore(item): void {
    item.readmore = !item.readmore;
  }
}
