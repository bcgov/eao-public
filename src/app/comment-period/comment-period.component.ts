import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentPeriod } from '../models/commentperiod';
import { Subscription } from 'rxjs/Subscription';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-comment-period',
  templateUrl: './comment-period.component.html',
  styleUrls: ['./comment-period.component.scss']
})
export class CommentPeriodComponent implements OnInit {
  commentPeriod: CommentPeriod;
  public loading: boolean;
  public isDesc: boolean;
  public column: string;
  public direction: number;

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1
  };

  private sub: Subscription;

  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.sub = this.route.data.subscribe(
      (data: { commentPeriod: CommentPeriod }) => {
        this.commentPeriod = data.commentPeriod;

        this.column = 'dateAdded';
        this.direction = -1;
      },
      error => console.log(error)
    );
  }
  sort (property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  readmore(item): void {
    item.readmore = !item.readmore;
  }
}
