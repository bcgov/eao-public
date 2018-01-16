import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { NewsComponent } from './news/news.component';
import { NewsFilterPipe } from './news-filter.pipe';
import { NewsTypeFilterPipe } from './news-type-filter.pipe';
import { ObjectFilterPipe } from './object-filter.pipe';
import { ProjectTypeFilterPipe } from './project-type-filter.pipe';
import { ProjectDecisionFilterPipe } from './project-decision-filter.pipe';
import { LegislationComponent } from './legislation/legislation.component';
import { ProcessComponent } from './process/process.component';
import { ComplianceOversightComponent } from './compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './contact/contact.component';
import { ContactSuccess } from './contact/contact.success';
import { MapModule } from './map/map.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ProponentFilterPipe } from './proponent-filter.pipe';
import { FilterPCPPipe } from './filter-pcp.pipe';
import { ProjectFilterPipe } from './project-filter.pipe';
import { ProjectStatusFilterPipe } from './project-status-filter.pipe';
import { OrderByPipe } from './order-by.pipe';
import { CookieService } from 'ngx-cookie-service';
import { ScrollDirective } from './directives/scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    NewsComponent,
    NewsFilterPipe,
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
    FilterPCPPipe,
    ProjectFilterPipe,
    ProjectStatusFilterPipe,
    OrderByPipe,
    ScrollDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2PageScrollModule.forRoot(),
    NgbModule,
    NgxPaginationModule,
    MapModule
  ],
  providers: [NewsComponent, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
