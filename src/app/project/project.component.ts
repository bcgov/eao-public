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
  public projectDecisionFilter: '';
  public filterDecision: '';
  public projectStatusFilter: '';
  public filterStatus: '';
  public filterPCP: '';
  public isDesc: boolean;
  public column: string;
  public direction: number;
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
      if (!data[i].proponent) {
        // In case a proponent object isn't set yet.
        data[i].proponent = {name: ''};
      }
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
  sort (property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  applyProponentFilter() {
    this.propfilter = this.proponentListFilter;
  }


  // Clear Filters
  clearProponentFilter() {
    this.proponentListFilter = undefined;
    this.propfilter = undefined;
  }

  clearPCPFilter() {
    this.filterPCP = undefined;
  }

  clearDecisionFilter() {
    this.projectDecisionFilter = undefined;
    this.filterDecision = undefined;
  }

  clearNameFilter() {
     this.filter = undefined;
  }

  clearTypeFilter() {
    this.projectTypeFilter = undefined;
    this.filterType = undefined;
  }

  clearAllProjectFilters() {
    this.clearDecisionFilter();
    this.clearNameFilter();
    this.clearPCPFilter();
    this.clearProponentFilter();
    this.clearTypeFilter();
  }
}
