import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../models/project';
import { News } from '../models/news';
import { ProjectService } from '../services/project.service';
import { NewsService } from '../services/news.service';
import { Subscription } from 'rxjs/Subscription';
import { PaginationInstance } from 'ngx-pagination';
import { Api } from '../services/api';
import { NewsTypeFilterPipe } from '../pipes/news-type-filter.pipe';
import { NewsHeadlineFilterPipe } from '../pipes/news-headline-filter.pipe';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  news: News[];
  public loading: boolean;
  public isDesc: boolean;
  public column: string;
  public direction: number;
  public showFilters: boolean;
  public projectFilter: boolean;
  public filter = '';
  public NewsTypeFilter = '';
  public filterType = '';
  public filteredResults: number;

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 25,
    currentPage: 1
  };

  private subscription: Subscription;
  NewsTypeFilterPipe: NewsTypeFilterPipe;
  NewsHeadlineFilterPipe: NewsHeadlineFilterPipe;

  constructor(private api: Api, private route: ActivatedRoute, private router: Router,
    private projectService: ProjectService, private newsService: NewsService) {
    this.NewsTypeFilterPipe = new NewsTypeFilterPipe();
    this.NewsHeadlineFilterPipe = new NewsHeadlineFilterPipe();
  }

  ngOnInit() {
    this.loading = true;
    const projectCode = this.route.snapshot.params.code;
    this.loading = true;

    // get project data
    this.projectService.getByCode(projectCode).mergeMap(
      (project: Project ) => {
        this.project = new Project(project);
        if (!this.project.proponent) {
          this.project.proponent = { name: '' };
        }
        this.column = 'dateAdded';
        this.direction = -1;
        // get news for the project
        return this.newsService.getByProjectCode(projectCode);
      }
    )
    .subscribe((data) => {
      this.news = data;
      this.setDocumentUrl(this.news);
      this.filteredResults = this.news.length;
      this.loading = false;
    });
  }

  setDocumentUrl(news) {
    const regex = /http(s)?:\/\/(www.)?/;
    news.forEach(activity => {
      if (!activity.documentUrl) {
        activity.documentUrl = '';
      } else if (!regex.test(activity.documentUrl)) {
        activity.documentUrl = `${this.api.hostnameEPIC }${ activity.documentUrl }`;
      }
    });
  }

  public getDocumentManagerUrl() {
    return `${this.api.hostnameEPIC}/p/${this.project.code}/docs`;
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

  gotoMap(): void {
    // pass along the id of the current project if available
    // so that the map component can show the popup for it.
    const projectId = this.project ? this.project.code : null;
    this.router.navigate(['/map', { project: projectId }]);
  }

  readmore(item): void {
    item.readmore = !item.readmore;
  }

  getDisplayedElementCountMessage(pageNumber) {
    let message = '';
    let items = this.news;
    if (this.filter) {
      items = this.NewsHeadlineFilterPipe.transform(items, this.filter);
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
