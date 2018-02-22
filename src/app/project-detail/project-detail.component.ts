import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project';
import { Subscription } from 'rxjs/Subscription';
import { PaginationInstance } from 'ngx-pagination';

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
    itemsPerPage: 10,
    currentPage: 1
  };

  private sub: Subscription;

  constructor(private _changeDetectionRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.sub = this.route.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;
        this.loading = false;

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
}
