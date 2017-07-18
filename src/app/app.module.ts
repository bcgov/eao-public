import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { NewsComponent } from './news/news.component';
import { NewsFilterPipe } from './news-filter.pipe';
import { ObjectFilterPipe } from './object-filter.pipe';
import { LegislationComponent } from './legislation/legislation.component';
import { ProcessComponent } from './process/process.component';
import { ComplianceOversightComponent } from './compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './contact/contact.component';
import { ContactSuccess } from './contact/contact.success';

@NgModule({
	declarations: [
	AppComponent,
	HomeComponent,
	ProjectComponent,
	NewsComponent,
	NewsFilterPipe,
	ObjectFilterPipe,
	LegislationComponent,
	ProcessComponent,
	ComplianceOversightComponent,
	ContactComponent,
	ContactSuccess
	],
	imports: [
	BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	HttpModule,
	AppRoutingModule,
	AlertModule.forRoot(),
	NgbModule,
	NgxPaginationModule
	],
	providers: [NewsComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
