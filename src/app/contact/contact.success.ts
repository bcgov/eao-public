import { Component, Input, OnInit, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { ContactForm } from '../models/contactform';
import { EmailService } from '../services/email.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-contact-success',
  templateUrl: './contact.success.html'
})
// tslint:disable-next-line:component-class-suffix
export class ContactSuccess implements OnInit {
  constructor() {}

  ngOnInit() {}
}
