import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { Proponent } from '../models/proponent';
import { CurrentPhase } from '../models/currentphase';
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
  public loading: boolean;
  public showFilters: boolean;
  public filter = '';
  public propfilter = '';
  public proponentListFilter: '';
  public phasefilter: '';
  public projectPhaseFilter: '';
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
    itemsPerPage: 25,
    currentPage: 1
  };

  constructor(private projectService: ProjectService, private _changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = true;
    this.projectService.getAll().subscribe(
      data => {
        this.results = data;
        this.getProponents(data);
        this.loading = false;
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }

  getProponents(projects) {
    const names = [];
    projects.forEach(project => {
      if (!project.proponent) {
        // In case a proponent object isn't set yet.
        project.proponent = { name: '' };
      } else if (project.proponent.name && names.indexOf(project.proponent.name) === -1) {
        // Keep unique list of names
        names.push(project.proponent.name);
        // Add to proponent list.
        this.proponents.push({ name: project.proponent.name });
      }
    });
  }

  sort (property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  applyProponentFilter() {
    this.propfilter = this.proponentListFilter;
  }

  clearAllProjectFilters() {
    this.filter = undefined;
    this.projectTypeFilter = undefined;
    this.filterType = undefined;
    this.projectDecisionFilter = undefined;
    this.filterDecision = undefined;
    this.proponentListFilter = undefined;
    this.propfilter = undefined;
    this.phasefilter = undefined;
    this.projectPhaseFilter = undefined;
    this.filterPCP = undefined;
  }
}
