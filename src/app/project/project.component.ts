import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import 'rxjs/add/operator/mergeMap';
import { Project } from '../models/project';
import { FilterPCPPipe } from '../pipes/filter-pcp.pipe';
import { ObjectFilterPipe } from '../pipes/object-filter.pipe';
import { PhaseFilterPipe } from '../pipes/phase-filter.pipe';
import { ProjectDecisionFilterPipe } from '../pipes/project-decision-filter.pipe';
import { ProjectRegionFilterPipe } from '../pipes/project-region-filter.pipe';
import { ProjectTypeFilterPipe } from '../pipes/project-type-filter.pipe';
import { ProponentFilterPipe } from '../pipes/proponent-filter.pipe';
import { ProjectService } from '../services/project.service';
import { StringHelper } from '../utils/string-helper';
import { ProjectFilters } from './project-filters';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectComponent implements OnInit {
  results: Array<Project>;

  objectFilter: ObjectFilterPipe;
  proponentFilter: ProponentFilterPipe;
  projectTypeFilter: ProjectTypeFilterPipe;
  projectDecisionFilter: ProjectDecisionFilterPipe;
  filterPCP: FilterPCPPipe;
  projectPhaseFilter: PhaseFilterPipe;
  projectRegionFilter: ProjectRegionFilterPipe;

  commentPeriodStatuses = [];
  projectTypes = [];
  EADecisions = [];
  projectPhases =[];
  dropdownSettings = {};

  public loading: boolean;
  public savedFilters: ProjectFilters; // The search filters chosen by the user
  public appliedFilters: ProjectFilters; // The search filters actually being applied to the results
  public distinctSortedProponentNames: Array<string>;
  public distinctSortedRegions: Array<string>;
  public pagination: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 25,
    currentPage: 1
  };
  public sortColumn: string;
  public sortDirection = 1;
  public itemsFound = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private _changeDetectionRef: ChangeDetectorRef
  ) {
    this.objectFilter = new ObjectFilterPipe();
    this.proponentFilter = new ProponentFilterPipe();
    this.projectTypeFilter = new ProjectTypeFilterPipe();
    this.projectDecisionFilter = new ProjectDecisionFilterPipe();
    this.filterPCP = new FilterPCPPipe();
    this.projectPhaseFilter = new PhaseFilterPipe();
    this.projectRegionFilter = new ProjectRegionFilterPipe();
  }

  ngOnInit() {
    this.loading = true;

    this.commentPeriodStatuses = [
      { item_id: 'Pending', item_text: 'Pending' },
      { item_id: 'Completed', item_text: 'Completed' },
      { item_id: 'Open', item_text: 'Open' }
    ];

    this.projectTypes = [
      { item_id: 'Energy-Electricity', item_text: 'Energy-Electricity' },
      { item_id: 'Energy-Petroleum & Natural Gas', item_text: 'Energy-Petroleum & Natural Gas' },
      { item_id: 'Food Processing', item_text: 'Food Processing' },
      { item_id: 'Industrial', item_text: 'Industrial' },
      { item_id: 'Mines', item_text: 'Mines' },
      { item_id: 'Other', item_text: 'Other' },
      { item_id: 'Tourist Destination Resorts', item_text: 'Tourist Destination Resorts' },
      { item_id: 'Transportation', item_text: 'Transportation' },
      { item_id: 'Waste Disposal', item_text: 'Waste Disposal' },
      { item_id: 'Water Management', item_text: 'Water Management' }
    ];

    this.EADecisions = [
      { item_id: 'In Progress', item_text: 'In Progress' },
      { item_id: 'Certificate Issued', item_text: 'Certificate Issued' },
      { item_id: 'Certificate Refused', item_text: 'Certificate Refused' },
      { item_id: 'Further Assessment Required', item_text: 'Further Assessment Required' },
      { item_id: 'Certificate Not Required', item_text: 'Certificate Not Required' },
      { item_id: 'Certificate Expired', item_text: 'Certificate Expired' },
      { item_id: 'Withdrawn', item_text: 'Withdrawn' },
      { item_id: 'Terminated', item_text: 'Terminated' },
      { item_id: 'Pre-EA Act Approval', item_text: 'Pre-EA Act Approval' },
      { item_id: 'Not Designated Reviewable', item_text: 'Not Designated Reviewable' }
    ];

    this.projectPhases = [
      { item_id: 'Intake', item_text: 'Intake' },
      { item_id: 'Determination', item_text: 'Determination' },
      { item_id: 'Scope', item_text: 'Scope' },
      { item_id: 'Evaluation', item_text: 'Evaluation' },
      { item_id: 'Review', item_text: 'Review' },
      { item_id: 'Decision', item_text: 'Decision' },
      { item_id: 'Post-Certification', item_text: 'Post-Certification' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: false
    };

    this.route.params
      .mergeMap((params: Params) => {
        this.savedFilters = new ProjectFilters(params);
        this.appliedFilters = new ProjectFilters(params);
        return this.projectService.getAll();
      })
      .subscribe(
        data => {
          this.results = data;
          this.distinctSortedProponentNames = this.getDistinctSortedProponentNames(this.results);
          this.distinctSortedRegions = this.getDistinctSortedRegions(this.results);
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
        names.push(StringHelper.toProperCase(project.proponent.name));
      }
    });
    return Array.from(new Set(names)).sort();
  }

  /**
   * Returns an array of distinct, sorted regions.
   * @param {Array<Project>} projects array of Projects.
   * @returns {Array<string>} an array of distinct, sorted regions.
   * @memberof ProjectComponent
   */
  getDistinctSortedRegions(projects: Array<Project>): Array<string> {
    const regions: Array<string> = [];
    projects.forEach(project => {
      if (project.region) {
        regions.push(StringHelper.toProperCase(project.region));
      }
    });
    return Array.from(new Set(regions)).sort();
  }

  /**
   * Sorts the page data by the specified column.
   * @param {any} columnName the name of the column to sort by.
   * @memberof ProjectComponent
   */
  sort(columnName: string) {
    this.sortColumn = columnName;
    this.sortDirection = this.sortDirection * -1;
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
   * Return a formatted string containing a message about the numebr of items currently being viewed on the page.
   *
   * @param {number} currentPage the current pagination page number.
   * @returns a formatted string.
   * @memberof ProjectComponent
   */
  getDisplayedElementCountMessage(currentPage: number) {
    let message = 'No results found';
    let items = this.results;
    if (items.length > 0) {
      if (this.appliedFilters.keyword) {
        items = this.objectFilter.transform(items, this.appliedFilters.keyword);
      }
      if (this.appliedFilters.proponent) {
        items = this.proponentFilter.transform(items, this.appliedFilters.proponent);
      }
      if (this.appliedFilters.type) {
        items = this.projectTypeFilter.transform(items, this.appliedFilters.type);
      }
      if (this.appliedFilters.decision) {
        items = this.projectDecisionFilter.transform(items, this.appliedFilters.decision);
      }
      if (this.appliedFilters.commentPeriodStatus) {
        items = this.filterPCP.transform(items, this.appliedFilters.commentPeriodStatus);
      }
      if (this.appliedFilters.phase) {
        items = this.projectPhaseFilter.transform(items, this.appliedFilters.phase);
      }
      if (this.appliedFilters.region) {
        items = this.projectRegionFilter.transform(items, this.appliedFilters.region);
      }
      const startRange = (currentPage - 1) * this.pagination.itemsPerPage + (items.length === 0 ? 0 : 1);
      const endRange = Math.min(
        (currentPage - 1) * this.pagination.itemsPerPage + this.pagination.itemsPerPage,
        items.length
      );
      this.itemsFound = items.length > 0;
      if (this.itemsFound) {
        message = `Viewing <strong>${startRange}-${endRange}</strong> of <strong>${items.length}</strong> Results`;
      }
    }
    return message;
  }
}
