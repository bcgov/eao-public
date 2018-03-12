import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommentPeriodService } from '../services/comment-period.service';
import { CommentPeriod } from '../models/commentperiod';

@Injectable()
export class CommentPeriodResolver implements Resolve<CommentPeriod> {
  constructor(private commentPeriodService: CommentPeriodService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CommentPeriod | Observable<CommentPeriod> | Promise<CommentPeriod> {
    const id = route.paramMap.get('id');
    const code = route.paramMap.get('code');
    return this.commentPeriodService.getByCode(id, code);
  }
}
