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

  constructor(obj?: any) {
    this.keyword = (obj && obj.keyword) || '';
    this.commentPeriodStatus = (obj && obj.commentPeriodStatus) || '';
    this.proponent = (obj && obj.proponent) || '';
    this.type = (obj && obj.type) || '';
    this.decision = (obj && obj.decision) || '';
    this.phase = (obj && obj.phase) || '';
  }

  /**
   * Return an object containing only those filters whose values are non-null and non-empty.
   * @returns object of non-null, non-empty filters.
   * @memberof ProjectFilters
   */
  public getParams() {
    const params = {};

    if (this.keyword && this.keyword.length) {
      params['keyword'] = this.keyword;
    }
    if (this.commentPeriodStatus && this.commentPeriodStatus.length) {
      params['commentPeriodStatus'] = this.commentPeriodStatus;
    }
    if (this.proponent && this.proponent.length) {
      params['proponent'] = this.proponent;
    }
    if (this.type && this.type.length) {
      params['type'] = this.type;
    }
    if (this.decision && this.decision.length) {
      params['decision'] = this.decision;
    }
    if (this.phase && this.phase.length) {
      params['phase'] = this.phase;
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
  }
}
