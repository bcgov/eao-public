import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { NewsComponent } from './news.component';
import { NewsService } from '../services/news.service';

import { OrderByPipe } from '../order-by.pipe';
import { NewsTypeFilterPipe } from '../news-type-filter.pipe';
import { ProjectFilterPipe } from '../project-filter.pipe';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  // mock service
  const mockNewsService = {
    getAll: () => {
      return { subscribe: () => {} };
    }
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: NewsService, useValue: mockNewsService }
        ],
        imports: [RouterTestingModule, FormsModule, NgxPaginationModule],
        declarations: [
          NewsComponent,
          OrderByPipe,
          NewsTypeFilterPipe,
          ProjectFilterPipe
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
