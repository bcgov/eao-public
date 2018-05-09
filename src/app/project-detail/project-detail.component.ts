import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../models/project';
import { Subscription } from 'rxjs/Subscription';
import { PaginationInstance } from 'ngx-pagination';
import { Api } from '../services/api';
import { NewsTypeFilterPipe } from '../pipes/news-type-filter.pipe';
import { NewsHeadlineFilterPipe } from '../pipes/news-headline-filter.pipe';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  public loading: boolean;
  public isDesc: boolean;
  public column: string;
  public direction: number;
  public showFilters: boolean;
  public projectFilter: boolean;
  public filter = '';
  public NewsTypeFilter: '';
  public filterType = '';

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 25,
    currentPage: 1
  };

  private sub: Subscription;
  NewsTypeFilterPipe: NewsTypeFilterPipe;
  NewsHeadlineFilterPipe: NewsHeadlineFilterPipe;

  constructor(private api: Api, private _changeDetectionRef: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {
    this.NewsTypeFilterPipe = new NewsTypeFilterPipe();
    this.NewsHeadlineFilterPipe = new NewsHeadlineFilterPipe();
  }

  ngOnInit() {
    this.loading = true;
    this.sub = this.route.data.subscribe(
      (data: { project: Project }) => {
        this.project = new Project(data.project);
        this.loading = false;
        // attach host to document url if it goes to esm-server
        this.setDocumentUrl(this.project);

        if (!this.project.proponent) {
          this.project.proponent = { name: '' };
        }
        this.column = 'dateAdded';
        this.direction = -1;
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }

  setDocumentUrl(project) {
    const regex = /http(s)?:\/\/(www.)?/;
    project.recent_activities.forEach(activity => {
      if (!activity.documentUrl) {
        return ;
      }
      if (!regex.test(activity.documentUrl)) {
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
    let items = this.project.recent_activities;
    if (items.length > 0) {
      if (this.filter) {
        items = this.NewsHeadlineFilterPipe.transform(items, this.filter);
      }
      if (this.filterType) {
        items = this.NewsTypeFilterPipe.transform(items, this.filterType);
      }
      const startRange = ((pageNumber - 1) * this.config.itemsPerPage) + 1;
      const endRange = Math.min(((pageNumber - 1) * this.config.itemsPerPage) + this.config.itemsPerPage, items.length);
      message = `Viewing ${startRange}-${endRange} of ${items.length} Results`;
    }
    return message;
  }
}
