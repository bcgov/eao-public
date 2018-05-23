import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentPeriod } from '../models/commentperiod';
import { PaginationInstance } from 'ngx-pagination';
import { CommentPeriodService } from '../services/comment-period.service';
import 'rxjs/add/operator/mergeMap';

import { Api } from '../services/api';

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
  public hostname: string;
  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 25,
    currentPage: 1
  };

  constructor( private route: ActivatedRoute, private commentPeriodService: CommentPeriodService, private api: Api ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const code = this.route.snapshot.params.code;
    this.loading = true;
    this.hostname = this.api.hostnameEPIC;
    // get comment period and project meta data
    this.commentPeriodService.getByCode(id, code).mergeMap(
        (commentPeriod: CommentPeriod ) => {
          this.commentPeriod = commentPeriod;
          this.column = 'dateAdded';
          this.direction = -1;
          // get comments and documents for comment period
          return this.commentPeriodService.getCommentsAndDocuments(this.commentPeriod);
        }
      )
      // attach comments and documents to comment period
      .subscribe((data) => {
        this.commentPeriod = data;
        data.comments = this.filterRejectedDocuments(data.comments);
        this.loading = false;
      });
  }

  filterRejectedDocuments(comments) {
    for (const comment of comments){
      comment.documents = comment.documents.filter((item) => {
        return item.displayName;
      });
    }
    return comments;
  }

  sort (property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  triggerSubmitComment() {
    const step1 = document.getElementById('step1');
    step1.classList.remove('hidden');
  };

  readmore(item): void {
    item.readmore = !item.readmore;
  }

  getDisplayedElementCountMessage(pageNumber) {
    let message = '';
    const items = this.commentPeriod.comments;
    if (items.length > 0) {
      const startRange = ((pageNumber - 1) * this.config.itemsPerPage) + (items.length === 0 ? 0 : 1);
      const endRange = Math.min(((pageNumber - 1) * this.config.itemsPerPage) + this.config.itemsPerPage, items.length);
      message = `Viewing <strong>${startRange}-${endRange}</strong> of <strong>${items.length}</strong> Comments`;
    }
    return message;
  }
}
