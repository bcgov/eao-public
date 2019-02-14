import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// pipes
import { FileSizePipe } from '../pipes/filesize.pipe';
import { FilterPCPPipe } from 'app/pipes/filter-pcp.pipe';
import { NewsHeadlineFilterPipe } from 'app/pipes/news-headline-filter.pipe';
import { NewsMultifieldFilterPipe } from 'app/pipes/news-multifield-filter.pipe';
import { NewsTypeFilterPipe } from 'app/pipes/news-type-filter.pipe';
import { ObjectFilterPipe } from 'app/pipes/object-filter.pipe';
import { OrderByPipe } from 'app/pipes/order-by.pipe';
import { ProjectDecisionFilterPipe } from 'app/pipes/project-decision-filter.pipe';
import { ProjectDecisionDateFilterPipe } from 'app/pipes/project-decision-date-filter.pipe';
import { ProjectFilterPipe } from 'app/pipes/project-filter.pipe';
import { ProjectRegionFilterPipe } from 'app/pipes/project-region-filter.pipe';
import { ProjectStatusFilterPipe } from 'app/pipes/project-status-filter.pipe';
import { ProjectTypeFilterPipe } from 'app/pipes/project-type-filter.pipe';
import { ProponentFilterPipe } from 'app/pipes/proponent-filter.pipe';

// directives
import { ScrollDirective } from '../directives/scroll.directive';
import { ProperCasePipe } from '../pipes/proper-case.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FileSizePipe,
    FilterPCPPipe,
    NewsHeadlineFilterPipe,
    NewsMultifieldFilterPipe,
    NewsTypeFilterPipe,
    ObjectFilterPipe,
    OrderByPipe,
    ProjectTypeFilterPipe,
    ProjectDecisionFilterPipe,
    ProjectDecisionDateFilterPipe,
    ProjectStatusFilterPipe,
    ProponentFilterPipe,
    ProjectFilterPipe,
    ProjectRegionFilterPipe,
    ProperCasePipe,
    ScrollDirective
  ],
  exports: [
    FileSizePipe,
    FilterPCPPipe,
    NewsHeadlineFilterPipe,
    NewsMultifieldFilterPipe,
    NewsTypeFilterPipe,
    ObjectFilterPipe,
    OrderByPipe,
    ProjectTypeFilterPipe,
    ProjectDecisionFilterPipe,
    ProjectDecisionDateFilterPipe,
    ProjectRegionFilterPipe,
    ProjectStatusFilterPipe,
    ProponentFilterPipe,
    ProjectFilterPipe,
    ProperCasePipe,
    ScrollDirective
  ]
})

export class SharedModule { }
