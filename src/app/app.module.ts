import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentPeriodModule } from './comment-period/comment-period.module';
import { ComplianceOversightComponent } from './compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './contact/contact.component';
import { ContactSuccess } from './contact/contact.success';
import { HomeComponent } from './home/home.component';
import { LegislationComponent } from './legislation/legislation.component';
import { MapModule } from './map/map.module';
import { NewsComponent } from './news/news.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProcessComponent } from './process/process.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';
import { ProjectService } from './services/project.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ComplianceOversightComponent,
    ContactComponent,
    ContactSuccess,
    HomeComponent,
    LegislationComponent,
    NewsComponent,
    NotFoundComponent,
    ProcessComponent,
    ProjectComponent,
    ProjectDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommentPeriodModule,
    FormsModule,
    HttpModule,
    Ng2PageScrollModule.forRoot(),
    NgbModule,
    NgxPaginationModule,
    MapModule,
    SharedModule
  ],
  providers: [NewsComponent, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
