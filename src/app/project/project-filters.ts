/**
 * An object to maintain the search filters used by the project component.
 * @export ProjectFilters
 * @class ProjectFilters
 */
export class ProjectFilters {
  public keyword: string;
  public commentPeriodStatus: string;
  public proponent: string;
  public type: string;
  public phase: string;
  public decision: string;
  public region: string;

  public showFilters: boolean;

  constructor(obj?: any) {
    this.keyword = (obj && obj.keyword) || '';
    this.commentPeriodStatus = (obj && obj.commentPeriodStatus) || '';
    this.proponent = (obj && obj.proponent) || '';
    this.type = (obj && obj.type) || '';
    this.decision = (obj && obj.decision) || '';
    this.phase = (obj && obj.phase) || '';
    this.region = (obj && obj.region) || '';
    this.showFilters = (obj && obj.showFilters) || false;
  }

  /**
   * Return an object containing only those filters whose values are non-null and non-empty.
   * @returns object of non-null, non-empty filters.
   * @memberof ProjectFilters
   */
  public getParams(): Object {
    const params = {};

    if (this.keyword) {
      params['keyword'] = this.keyword;
    }
    if (this.commentPeriodStatus) {
      params['commentPeriodStatus'] = this.commentPeriodStatus;
    }
    if (this.proponent) {
      params['proponent'] = this.proponent;
    }
    if (this.type) {
      params['type'] = this.type;
    }
    if (this.decision) {
      params['decision'] = this.decision;
    }
    if (this.phase) {
      params['phase'] = this.phase;
    }
    if (this.region) {
      params['region'] = this.region;
    }
    if (this.showFilters) {
      params['showFilters'] = this.showFilters;
    }

    return params;
  }

  /**
   * Resets all filters to their original default value: empty string.
   * @memberof ProjectFilters
   */
  clear() {
    this.keyword = '';
    this.commentPeriodStatus = '';
    this.proponent = '';
    this.type = '';
    this.decision = '';
    this.phase = '';
    this.region = '';
  }
}
