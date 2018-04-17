import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ContactComponent } from './contact.component';
import { ContactForm } from '../models/contactform';

import { EmailService } from '../services/email.service';
import { Api } from '../services/api';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      declarations: [
        ContactComponent
      ],
      providers: [
        EmailService,
        Api
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should set model to be a new ContactForm object', () => {
      component.ngOnInit();
      expect(JSON.stringify(component.model)).toBe(JSON.stringify(new ContactForm('', '', '')));
    });
  });
  describe('sendEmail()', () => {
    beforeEach(() => {
      component.sendEmail();
    });
    describe('alerts', () => {
      it('should push to alerts', () => {
        expect(component.alerts.length).toBe(1);
      });
      it('should set set alert type to info', () => {
        expect(component.alerts[0].type).toBe('info');
      });
      it('should set alert msg', () => {
        expect(component.alerts[0].msg).toBe('Submitting...');
      });
    });
  });
});
