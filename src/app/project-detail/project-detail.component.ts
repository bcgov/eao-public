import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  public loading: boolean;

  private sub: Subscription;

  constructor(private _changeDetectionRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.sub = this.route.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;
        this.loading = false;

        if (!this.project.proponent) {
          this.project.proponent = { name: '' };
        }
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }
}
