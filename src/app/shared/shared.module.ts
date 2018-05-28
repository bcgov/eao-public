import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// pipes
import { FileSizePipe } from '../pipes/filesize.pipe';
import { OrderByPipe } from 'app/pipes/order-by.pipe';
import { NewsTypeFilterPipe } from 'app/pipes/news-type-filter.pipe';
import { ObjectFilterPipe } from 'app/pipes/object-filter.pipe';
import { ProjectTypeFilterPipe } from 'app/pipes/project-type-filter.pipe';
import { ProjectDecisionFilterPipe } from 'app/pipes/project-decision-filter.pipe';
import { ProponentFilterPipe } from 'app/pipes/proponent-filter.pipe';
import { PhaseFilterPipe } from 'app/pipes/phase-filter.pipe';
import { FilterPCPPipe } from 'app/pipes/filter-pcp.pipe';
import { ProjectFilterPipe } from 'app/pipes/project-filter.pipe';
import { ProjectStatusFilterPipe } from 'app/pipes/project-status-filter.pipe';
import { NewsHeadlineFilterPipe } from 'app/pipes/news-headline-filter.pipe';
import { ProjectRegionFilterPipe } from 'app/pipes/project-region-filter.pipe';

// directives
import { ScrollDirective } from '../directives/scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FileSizePipe,
    FilterPCPPipe,
    NewsHeadlineFilterPipe,
    NewsTypeFilterPipe,
    ObjectFilterPipe,
    OrderByPipe,
    PhaseFilterPipe,
    ProjectTypeFilterPipe,
    ProjectDecisionFilterPipe,
    ProjectStatusFilterPipe,
    ProponentFilterPipe,
    ProjectFilterPipe,
    ProjectRegionFilterPipe,
    ScrollDirective
  ],
  exports: [
    FileSizePipe,
    FilterPCPPipe,
    NewsHeadlineFilterPipe,
    NewsTypeFilterPipe,
    ObjectFilterPipe,
    OrderByPipe,
    PhaseFilterPipe,
    ProjectTypeFilterPipe,
    ProjectDecisionFilterPipe,
    ProjectRegionFilterPipe,
    ProjectStatusFilterPipe,
    ProponentFilterPipe,
    ProjectFilterPipe,
    ScrollDirective
  ]
})

export class SharedModule { }
