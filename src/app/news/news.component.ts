import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import { PaginationInstance } from 'ngx-pagination';
import { Api } from '../services/api';
import { NewsTypeFilterPipe } from '../pipes/news-type-filter.pipe';
import { ProjectFilterPipe } from '../pipes/project-filter.pipe';

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
  public filterType = '';
  public NewsTypeFilter = '';
  public filteredResults: number;
  public isDesc: boolean;
  public column: string;
  public direction: number;
  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1
  };
  hostname: String;
  NewsTypeFilterPipe: NewsTypeFilterPipe;
  ProjectFilterPipe: ProjectFilterPipe;

  constructor(private newsService: NewsService, private _changeDetectionRef: ChangeDetectorRef, private api: Api) {
    this.NewsTypeFilterPipe = new NewsTypeFilterPipe();
    this.ProjectFilterPipe = new ProjectFilterPipe();
  }

  ngOnInit() {
    this.loading = true;
    this.newsService.getAll().subscribe(
      data => {
        this.setDocumentUrl(data);
        this.results = data;
        this.loading = false;
        this.filteredResults = this.results.length;
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
    this.config.currentPage = 1;
  }

  readmore(item): void {
    item.readmore = !item.readmore;
  }

  getDisplayedElementCountMessage(pageNumber) {
    let message = '';
    let items = this.results;
    if (this.filter) {
      items = this.ProjectFilterPipe.transform(items, this.filter);
    }
    if (this.filterType) {
      items = this.NewsTypeFilterPipe.transform(items, this.filterType);
    }
    if (items.length > 0) {
      const startRange = ((pageNumber - 1) * this.config.itemsPerPage) + (items.length === 0 ? 0 : 1);
      const endRange = Math.min(((pageNumber - 1) * this.config.itemsPerPage) + this.config.itemsPerPage, items.length);
      message = `Viewing <strong>${startRange}-${endRange}</strong> of <strong>${items.length}</strong> Results`;
    }
    this.filteredResults = items.length;
    return message;
  }
}
