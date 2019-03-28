import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import { News } from '../models/news';
import { Project } from '../models/project';
import { Proponent } from '../models/proponent';
import { NewsHeadlineFilterPipe } from '../pipes/news-headline-filter.pipe';
import { NewsTypeFilterPipe } from '../pipes/news-type-filter.pipe';
import { Api } from '../services/api';
import { NewsService } from '../services/news.service';
import { ProjectService } from '../services/project.service';
import { CommentPeriod } from '../models/commentperiod';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project;
  news: News[];
  pcps: CommentPeriod[];
  activeCommentPeriod: CommentPeriod;
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
  public activeItems: number;
  private newsSubscription: Subscription;
  private pcpsSubscription: Subscription;

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 25,
    currentPage: 1
  };

  private subscription: Subscription;
  NewsTypeFilterPipe: NewsTypeFilterPipe;
  NewsHeadlineFilterPipe: NewsHeadlineFilterPipe;

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private newsService: NewsService
  ) {
    this.NewsTypeFilterPipe = new NewsTypeFilterPipe();
    this.NewsHeadlineFilterPipe = new NewsHeadlineFilterPipe();
  }

  ngOnInit() {
    this.loading = true;
    const projectCode = this.route.snapshot.params.code;
    this.loading = true;

    // get project data
    this.newsSubscription = this.projectService
      .getByCode(projectCode)
      .mergeMap((project: Project) => {
        this.project = new Project(project);
        if (!this.project.proponent) {
          this.project.proponent = new Proponent({ name: '' });
        }
        this.column = 'dateAdded';
        this.direction = -1;
        // get news for the project
        return this.newsService.getByProjectCode(projectCode);
      })
      .subscribe(data => {
        this.news = data;
        this.setDocumentUrl(this.news);
        this.filteredResults = this.news.length;
        this.loading = false;
      });

      this.pcpsSubscription = this.projectService
      .getByCode(projectCode)
      .mergeMap((project: Project) => {
        this.project = new Project(project);
        if (!this.project.proponent) {
          this.project.proponent = new Proponent({ name: '' });
        }
        this.column = 'dateAdded';
        this.direction = -1;
        return this.newsService.getByComments(this.project._id);
      })
      .subscribe(data => {
        this.pcps = data;
        this.setBanner(this.pcps);
        this.filteredResults = this.news.length;
        this.loading = false;
      });
  }

  setBanner(pcps) {
    // checks public pcps for a project, if 'open' or 'pending' exists make it active for banner item.
    // (Note: A banner appears for each active period. But there should never be more than one pcp 'active at a time for a project)
    pcps.forEach(item => {
      this.checkActiveDate(item);
      if (item.status === 'Open' || item.status === 'Pending') {
        this.activeCommentPeriod = item;
      }
    });
  }

  checkActiveDate(item) {
    const start = new Date(item.dateStarted);
    const end = new Date(item.dateCompleted);
    const curr = new Date();
    const weekAgo = new Date(start.getDate() - 7);
    // a public comment period is in a pending state when the date is a week before it opens
    if ( curr < start && curr >= weekAgo ) {
      item.status = 'Pending';
    } else if ( curr > end ) {
      item.status = 'Closed';
    } else {
      item.status = 'Open';
    }
  }

  public getPCPMangerUrl() {
    // Get the contentUrl for the active PCP
    return `/p/${this.project.code}/commentperiod/${this.activeCommentPeriod._id}`;
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

  public getDocumentManagerUrl() {
    return `${this.api.hostnameEPIC}/p/${this.project.code}/docs`;
  }

  sort(property) {
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
    // TODO: fix counting of non-visible items
    let message = '';
    let items = this.news;
    this.activeItems = 0;
    if (this.filter) {
      items = this.NewsHeadlineFilterPipe.transform(items, this.filter);
    }
    if (this.filterType) {
      items = this.NewsTypeFilterPipe.transform(items, this.filterType);
    }
    if (items.length > 0) {
      // checks for active pcps to only count visible to public pcps
      for (let i = 0; i < items.length; i++) {
        if ( (items[i] as any).active === true ) {
          this.activeItems++;
        }
      }
      const startRange = (pageNumber - 1) * this.config.itemsPerPage + (this.activeItems === 0 ? 0 : 1);
      const endRange = Math.min((pageNumber - 1) * this.config.itemsPerPage + this.config.itemsPerPage, this.activeItems);
      message = `Viewing <strong>${startRange}-${endRange}</strong> of <strong>${this.activeItems}</strong> Results`;
    }
    this.filteredResults = this.activeItems;
    return message;
  }

  ngOnDestroy() {
    // TODO: Look into using async instead for handling
    this.newsSubscription.unsubscribe();
    this.pcpsSubscription.unsubscribe();
  }
}
