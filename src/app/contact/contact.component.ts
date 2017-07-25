import { Component, ViewChild, OnInit } from '@angular/core';
import { ContactForm } from '../models/contactform';
import { ContactSuccess } from './contact.success';
import { EmailService } from '../services/email.service';
import { AlertModule } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  invalid: boolean;
  model: ContactForm;
  public alerts: any = [];

  constructor(private emailService: EmailService, private router: Router, ) { }

  ngOnInit() {
    this.model = new ContactForm('', '', '');
  }

  sendEmail() {
    const self = this;
    // console.log("Form Submitted:", this.model);
    this.alerts.push({
      type: 'info',
      msg: `Submitting...`
    });
    this.emailService.sendEmail(this.model)
      .toPromise()
      .then(function (res) {
        console.log('done:', res);
        self.alerts.pop();
        setTimeout(() => {
          self.router.navigate(['/contact_success']);
        }, 3000);
      }, function (err) {
        console.log('err:', err);
        self.alerts.pop();
        self.alerts.push({
          type: 'danger',
          msg: `Sorry, was an error submitting your feedback.`,
          timeout: 3000
        });
      });
  }
}
