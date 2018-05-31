import * as _ from 'lodash';
import { ProjectFilters } from './project-filters';

describe('ProjectFilter', () => {
  describe('constructor', () => {
    let projectFilter: ProjectFilters;
    beforeEach(() => {
      projectFilter = new ProjectFilters({
        keyword: '1',
        commentPeriodStatus: '2',
        proponent: undefined,
        type: null,
        // decision: '5'
        phase: '',
        region: '',
        showFilters: true
      });
    });

    it('should set keyword to 1', () => {
      expect(projectFilter.keyword).toBe('1');
    });

    it('should set commentPeriodStatus to 2', () => {
      expect(projectFilter.commentPeriodStatus).toBe('2');
    });

    it('should set proponent to empty string', () => {
      expect(projectFilter.proponent).toBe('');
    });

    it('should set decision to empty string', () => {
      expect(projectFilter.decision).toBe('');
    });

    it('should set phase to empty string', () => {
      expect(projectFilter.phase).toBe('');
    });

    it('should set region to empty string', () => {
      expect(projectFilter.region).toBe('');
    });

    it('should set showFilters to true', () => {
      expect(projectFilter.showFilters).toBe(true);
    });
  });

  describe('getParams()', () => {
    let params: Object;
    beforeEach(() => {
      const projectFilter = new ProjectFilters({
        keyword: '1',
        commentPeriodStatus: '2',
        proponent: undefined,
        type: null,
        // decision: '5'
        phase: '',
        region: '',
        showFilters: true
      });
      params = projectFilter.getParams();
    });

    describe('keyword', () => {
      it('should exist', () => {
        expect(_.has(params, 'keyword')).toBeTruthy();
      });

      it('should equal 1', () => {
        expect(params['keyword']).toBe('1');
      });
    });

    describe('commentPeriodStatus', () => {
      it('should exist', () => {
        expect(_.has(params, 'commentPeriodStatus')).toBeTruthy();
      });

      it('should equal 2', () => {
        expect(params['commentPeriodStatus']).toBe('2');
      });
    });

    describe('proponent', () => {
      it('should not exist', () => {
        expect(_.has(params, 'proponent')).toBeFalsy();
      });
    });

    describe('decision', () => {
      it('should not exist', () => {
        expect(_.has(params, 'decision')).toBeFalsy();
      });
    });

    describe('phase', () => {
      it('should not exist', () => {
        expect(_.has(params, 'phase')).toBeFalsy();
      });
    });

    describe('region', () => {
      it('should not exist', () => {
        expect(_.has(params, 'region')).toBeFalsy();
      });
    });

    describe('showFilters', () => {
      it('should exist', () => {
        expect(_.has(params, 'showFilters')).toBeTruthy();
      });

      it('should be true', () => {
        expect(params['showFilters']).toBe(true);
      });
    });
  });

  describe('clear()', () => {
    describe('resets filters', () => {
      let projectFilter: ProjectFilters;
      beforeEach(() => {
        projectFilter = new ProjectFilters({
          keyword: null,
          commentPeriodStatus: undefined,
          proponent: '3',
          type: '4',
          decision: '5',
          phase: '6',
          region: '',
          showFilters: true
        });
        projectFilter.clear();
      });

      it('should set keyword to empty string', () => {
        expect(projectFilter.keyword).toBe('');
      });

      it('should set type to be empty string', () => {
        expect(projectFilter.type).toBe('');
      });

      it('should set proponent to be empty string', () => {
        expect(projectFilter.proponent).toBe('');
      });

      it('should set type to be empty string', () => {
        expect(projectFilter.type).toBe('');
      });

      it('should set decision to be empty string', () => {
        expect(projectFilter.decision).toBe('');
      });

      it('should set phase to be empty string', () => {
        expect(projectFilter.phase).toBe('');
      });

      it('should set region to be empty string', () => {
        expect(projectFilter.region).toBe('');
      });
    });

    describe('does not reset showFilters', () => {
      it('showFilters should be true', () => {
        const projectFilter = new ProjectFilters({
          keyword: null,
          commentPeriodStatus: undefined,
          proponent: '3',
          type: '4',
          decision: '5',
          phase: '6',
          region: '',
          showFilters: true
        });
        projectFilter.clear();
        expect(projectFilter.showFilters).toBe(true);
      });

      it('showFilters should be false', () => {
        const projectFilter = new ProjectFilters({
          keyword: null,
          commentPeriodStatus: undefined,
          proponent: '3',
          type: '4',
          decision: '5',
          phase: '6',
          region: '',
          showFilters: false
        });
        projectFilter.clear();
        expect(projectFilter.showFilters).toBe(false);
      });
    });
  });
});
