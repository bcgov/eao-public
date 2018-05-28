import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectFilters } from './project-filters';

import * as _ from 'lodash';

describe('ProjectComponent', () => {
  describe('constructor', () => {
    let projectFilter;
    beforeEach(() => {
      projectFilter = new ProjectFilters({
        keyword: '1',
        commentPeriodStatus: '2',
        proponent: undefined,
        type: null,
        // decision: '5'
        phase: ''
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
  });

  describe('getParams()', () => {
    let params;
    beforeEach(() => {
      const projectFilter = new ProjectFilters({
        keyword: '1',
        commentPeriodStatus: '2',
        proponent: undefined,
        type: null,
        // decision: '5'
        phase: ''
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
  });

  describe('clear()', () => {
    let projectFilter;
    beforeEach(() => {
      projectFilter = new ProjectFilters({
        keyword: null,
        commentPeriodStatus: undefined,
        proponent: '3',
        type: '4',
        decision: '5',
        phase: '6'
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

    it('should set phase to be empty string', () => {
      expect(projectFilter.phase).toBe('');
    });

    it('should set decision to be empty string', () => {
      expect(projectFilter.decision).toBe('');
    });
  });
});
