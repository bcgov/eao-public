import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../models/project';
import { Proponent } from '../models/proponent';
import { ProjectService } from '../services/project.service';
import { PaginationInstance } from 'ngx-pagination';
import { ProjectFilters } from './project-filters';
import 'rxjs/add/operator/mergeMap';

import { ObjectFilterPipe } from '../pipes/object-filter.pipe';
import { ProponentFilterPipe } from '../pipes/proponent-filter.pipe';
import { ProjectTypeFilterPipe } from '../pipes/project-type-filter.pipe';
import { ProjectDecisionFilterPipe } from '../pipes/project-decision-filter.pipe';
import { FilterPCPPipe } from '../pipes/filter-pcp.pipe';
import { PhaseFilterPipe } from '../pipes/phase-filter.pipe';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  results: Array<Project>;

  objectFilterPipe: ObjectFilterPipe;
  proponentFilter: ProponentFilterPipe;
  projectTypeFilter: ProjectTypeFilterPipe;
  projectDecisionFilter: ProjectDecisionFilterPipe;
  filterPCP: FilterPCPPipe;
  projectPhaseFilter: PhaseFilterPipe;

  public loading: boolean;
  public showFilters: boolean;
  public savedFilters: ProjectFilters; // The search filters chosen by the user
  public appliedFilters: ProjectFilters; // The search filters actually being applied to the results
  public distinctSortedProponentNames: Array<string>;
  public pagination: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 25,
    currentPage: 1
  };
  public sortColumn: string;
  public sortDirection: number;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private _changeDetectionRef: ChangeDetectorRef
  ) {
    this.objectFilterPipe = new ObjectFilterPipe();
    this.proponentFilter = new ProponentFilterPipe();
    this.projectTypeFilter = new ProjectTypeFilterPipe();
    this.projectDecisionFilter = new ProjectDecisionFilterPipe();
    this.filterPCP = new FilterPCPPipe();
    this.projectPhaseFilter = new PhaseFilterPipe();
  }

  ngOnInit() {
    this.loading = true;

    this.route.params
      .mergeMap((params: Params) => {
        this.savedFilters = new ProjectFilters(params);
        this.appliedFilters = new ProjectFilters(params);
        this.showFilters = this.showAdvancedFilters();
        return this.projectService.getAll();
      })
      .subscribe(
        data => {
          this.results = data;
          this.distinctSortedProponentNames = this.getDistinctSortedProponentNames(this.results);
          this.loading = false;
          // Needed in development mode - not required in prod.
          this._changeDetectionRef.detectChanges();
        },
        error => console.log(error)
      );
  }

  /**
   * Returns an array of distinct, sorted proponent names.
   * @param {Array<Project>} projects array of Projects.
   * @returns {Array<string>} an array of distinct, sorted proponent names.
   * @memberof ProjectComponent
   */
  getDistinctSortedProponentNames(projects: Array<Project>): Array<string> {
    const names: Array<string> = [];
    projects.forEach(project => {
      if (project.proponent && project.proponent.name) {
        names.push(project.proponent.name);
      }
    });
    return Array.from(new Set(names)).sort();
  }

  /**
   * Sorts the page data by the specified column.
   * @param {any} columnName the name of the column to sort by.
   * @memberof ProjectComponent
   */
  sort(columnName: string) {
    this.sortColumn = columnName;
    this.sortDirection = this.sortDirection === 1 ? -1 : 1;
  }

  /**
   * Applies the current filter selections and reloads the page.
   * @memberof ProjectComponent
   */
  applyProjectFilters() {
    this.router.navigate(['project', this.savedFilters.getParams()]);
  }

  /**
   * Resets all search filters to their unset defaults.
   * Resets the pagination page to 1.
   * @memberof ProjectComponent
   */
  clearAllProjectFilters() {
    this.savedFilters.clear();
    this.pagination.currentPage = 1;
  }

  /**
   * Checks the applied filters to determine if the advanced filters should be shown on initial page load.
   * @returns True if at least 1 advanced filter has been populated.  False otherwise.
   * @memberof ProjectComponent
   */
  showAdvancedFilters() {
    if (
      this.appliedFilters.commentPeriodStatus ||
      this.appliedFilters.proponent ||
      this.appliedFilters.type ||
      this.appliedFilters.phase ||
      this.appliedFilters.decision
    ) {
      return true;
    }
    return false;
  }

  /**
   * Return a formatted string containing a message about the numebr of items currently being viewed on the page.
   *
   * @param {any} pageNumber the current pagination page number.
   * @returns a formatted string.
   * @memberof ProjectComponent
   */
  getDisplayedElementCountMessage(projects: Array<Project>, pageNumber: number) {
    let message = '';
    let items = this.results;
    if (items.length > 0) {
      if (this.appliedFilters.keyword) {
        items = this.objectFilterPipe.transform(items, this.appliedFilters.keyword);
      }
      if (this.appliedFilters.keyword) {
        items = this.proponentFilter.transform(items, this.appliedFilters.proponent);
      }
      if (this.appliedFilters.keyword) {
        items = this.projectTypeFilter.transform(items, this.appliedFilters.type);
      }
      if (this.appliedFilters.keyword) {
        items = this.projectDecisionFilter.transform(items, this.appliedFilters.decision);
      }
      if (this.appliedFilters.keyword) {
        items = this.filterPCP.transform(items, this.appliedFilters.commentPeriodStatus);
      }
      if (this.appliedFilters.keyword) {
        items = this.projectPhaseFilter.transform(items, this.appliedFilters.phase);
      }
      const startRange = (pageNumber - 1) * this.pagination.itemsPerPage + (items.length === 0 ? 0 : 1);
      const endRange = Math.min(
        (pageNumber - 1) * this.pagination.itemsPerPage + this.pagination.itemsPerPage,
        items.length
      );
      message = `Viewing <strong>${startRange}-${endRange}</strong> of <strong>${items.length}</strong> Results`;
    }
    return message;
  }
}
