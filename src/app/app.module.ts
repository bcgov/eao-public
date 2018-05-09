import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommentPeriodModule } from './comment-period/comment-period.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { NewsComponent } from './news/news.component';
import { NewsTypeFilterPipe } from './pipes/news-type-filter.pipe';
import { ObjectFilterPipe } from './pipes/object-filter.pipe';
import { ProjectTypeFilterPipe } from './pipes/project-type-filter.pipe';
import { ProjectDecisionFilterPipe } from './pipes/project-decision-filter.pipe';
import { ProjectService } from './services/project.service';
import { LegislationComponent } from './legislation/legislation.component';
import { ProcessComponent } from './process/process.component';
import { ComplianceOversightComponent } from './compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './contact/contact.component';
import { ContactSuccess } from './contact/contact.success';
import { MapModule } from './map/map.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ProponentFilterPipe } from './pipes/proponent-filter.pipe';
import { PhaseFilterPipe } from './pipes/phase-filter.pipe';
import { FilterPCPPipe } from './pipes/filter-pcp.pipe';
import { ProjectFilterPipe } from './pipes/project-filter.pipe';
import { ProjectStatusFilterPipe } from './pipes/project-status-filter.pipe';
import { CookieService } from 'ngx-cookie-service';
import { ScrollDirective } from './directives/scroll.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { NewsHeadlineFilterPipe } from './pipes/news-headline-filter.pipe';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    NewsComponent,
    NewsTypeFilterPipe,
    ObjectFilterPipe,
    ProjectTypeFilterPipe,
    ProjectDecisionFilterPipe,
    LegislationComponent,
    ProcessComponent,
    ComplianceOversightComponent,
    ContactComponent,
    ContactSuccess,
    ProponentFilterPipe,
    PhaseFilterPipe,
    FilterPCPPipe,
    ProjectFilterPipe,
    ProjectStatusFilterPipe,
    ScrollDirective,
    NotFoundComponent,
    ProjectDetailComponent,
    NewsHeadlineFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CommentPeriodModule,
    AppRoutingModule,
    Ng2PageScrollModule.forRoot(),
    NgbModule,
    NgxPaginationModule,
    MapModule,
    SharedModule
  ],
  providers: [NewsComponent, CookieService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
