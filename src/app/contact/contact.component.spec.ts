import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ContactComponent } from './contact.component';

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

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
