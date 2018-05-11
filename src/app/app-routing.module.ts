import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplianceOversightComponent } from 'app/compliance-oversight/compliance-oversight.component';
import { ContactComponent } from 'app/contact/contact.component';
import { ContactSuccess } from 'app/contact/contact.success';
import { HomeComponent } from 'app/home/home.component';
import { LegislationComponent } from 'app/legislation/legislation.component';
import { ProcessComponent } from 'app/process/process.component';
import { ProjectComponent } from 'app/project/project.component';
import { ProjectDetailComponent } from 'app/project-detail/project-detail.component';
import { CommentPeriodComponent } from 'app/comment-period/comment-period.component';
import { NewsComponent } from 'app/news/news.component';
import { MainMapComponent } from 'app/map/main-map/main-map.component';
import { NotFoundComponent } from 'app/not-found/not-found.component';


const routes: Routes = [
  {
    path: 'compliance-oversight',
    component: ComplianceOversightComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'contact_success',
    component: ContactSuccess
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'legislation',
    component: LegislationComponent
  },
  {
    path: 'process',
    component: ProcessComponent
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'p/:code',
    component: ProjectDetailComponent
  },
  {
    path: 'p/:code/commentperiod/:id',
    component: CommentPeriodComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'map',
    component: MainMapComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
