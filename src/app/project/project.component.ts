import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { Proponent } from '../models/proponent';
import { ProjectService } from '../services/project.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  results: Array<Project>;
  projectsPCP: Array<Project>;
  public loading: boolean;
  public showFilters: boolean;
  public filter = '';
  public propfilter = '';
  public proponentListFilter: '';
  public projectTypeFilter: '';
  public filterType: '';
  public projectStatusFilter: '';
  public filterStatus: '';
  public filterPCP: '';
  public proponents: Array<Proponent> = [];
  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor(private projectService: ProjectService, private _changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = true;
    this.projectService.getCommentPeriodProjects().subscribe(
      dataPCP => {
        this.projectService.getAll().subscribe(
          data => {
            this.results = data;
            this.insertProponents(data);
            this.insertPCP(dataPCP);
            this.loading = false;
            // Needed in development mode - not required in prod.
            this._changeDetectionRef.detectChanges();
          },
          error => console.log(error)
        );

        this.projectsPCP = dataPCP;
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }

  insertProponents(data) {
    for (let i = 0; i < data.length; i++) {
        this.proponents.indexOf(data[i].proponent.name) === -1
          ? this.proponents.push({name: data[i].proponent.name})
          : console.log('This item already exists');
    }
  }
  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }
  insertPCP(data) {
    for (let i = 0; i < data.length; i++) {
      const idx = this.findWithAttr(this.results, 'code', data[i].code);
      if (idx !== -1) {
        this.results[idx].openCommentPeriod = data[i].openCommentPeriod;
      }
    }
  }

  applyProponentFilter() {
    this.propfilter = this.proponentListFilter;
  }

  clearAllProjectFilters() {
    this.filter = undefined;
    this.projectTypeFilter = undefined;
    this.filterType = undefined;
    this.projectStatusFilter = undefined;
    this.filterStatus = undefined;
    this.proponentListFilter = undefined;
    this.propfilter = undefined;
    this.filterPCP = undefined;
  }
}
