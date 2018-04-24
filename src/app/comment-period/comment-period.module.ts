import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// components
import { CommentPeriodComponent } from './comment-period.component';
import { PCPInfoModalComponent } from './pcp-info-modal/pcp-info-modal';
import { SubmitCommentModalComponent } from './submit-comment-modal/submit-comment-modal';
import { SubmitCommentProgressModalComponent } from './submit-comment-progress-modal/submit-comment-progress-modal';

// services
import { Api } from '../services/api';
import { CommentPeriodService } from '../services/comment-period.service';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule
  ],
  declarations: [
    CommentPeriodComponent,
    PCPInfoModalComponent,
    SubmitCommentModalComponent,
    SubmitCommentProgressModalComponent
  ],
  exports: [
    CommentPeriodComponent
  ],
  providers: [
    Api,
    CommentPeriodService
  ]
})
export class CommentPeriodModule { }
