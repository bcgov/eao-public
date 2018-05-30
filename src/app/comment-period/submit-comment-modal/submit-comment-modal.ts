import { Component, OnInit } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { CommentPeriodService } from '../../services/comment-period.service';
import { CommentPeriodComponent } from '../comment-period.component';

@Component({
  selector: 'app-submit-comment-modal',
  templateUrl: './submit-comment-modal.component.html',
  styleUrls: ['./submit-comment-modal.component.scss']
})

export class SubmitCommentModalComponent implements OnInit {
  public files = [];
  public comment;
  public valid: boolean;
  public loading: boolean;
  public error: boolean;
  public maxAttachmentSize = 5242880; // 5 MB

  constructor(private commentPeriodService: CommentPeriodService, private commentPeriodComponent: CommentPeriodComponent) { };

  ngOnInit() {
    this.comment = {
      author: '',
      location: '',
      visible: false,
      comment: ''
    };
  }

  removeError(event) {
    event.target.classList.remove('error');
    event.target.closest('.form-group').classList.remove('has-danger');
  }

  removeErrors() {
    const controls = document.querySelectorAll('.form-group');
    const errors = document.querySelectorAll('.error');
    for (let i = 0; i < controls.length; i++) {
      controls[i].classList.remove('has-danger');
    }
    for (let n = 0; n < errors.length; n++) {
      errors[n].classList.remove('error');
    }
  }

  displayError(element) {
    element.closest('.form-group').classList.add('has-danger');
    element.classList.add('error', 'form-control-danger');
  }

  validateAttachments(files) {
    let valid = true;

    let attachmentSize = 0;
    files.forEach(file => {
      // Ensure indiviual and total size does not exceed the limit.
      attachmentSize += file.size;
      if (file.size > this.maxAttachmentSize || attachmentSize > this.maxAttachmentSize) {
        this.displayError(document.getElementById('file'));
        valid = false;
      }
      // Ensure only allowed file types can be uploaded
      const fileTypeRegExp = /((image\/)|(application\/pdf))/;
      if (!fileTypeRegExp.test(file.type)) {
        this.displayError(document.getElementById('file'));
        valid = false;
      }
    });
    return valid;
  }

  validateFields(form) {
    if (!form.author) {
      this.displayError(document.getElementById('author'));
      this.valid = false;
    }
    if (!form.location) {
      this.displayError(document.getElementById('location'));
      this.valid = false;
    }
    if (!form.comment) {
      this.displayError(document.getElementById('comment'));
      this.valid = false;
    }
    this.valid = this.validateAttachments(this.files);
    return this.valid;
  }

  onFileChange(event, form) {
    const fileInput = <HTMLInputElement>document.getElementById('file');
    if (event.target.files.length > 0) {
      const filesList = event.target.files;
      for (let i = 0; i < filesList.length; i++ ) {
        if (this.files.length > 0) {
          const namesArray = this.files.map(file => file.name);
          if (namesArray.indexOf(filesList[i].name) < 0) {
            this.files.push(filesList[i]);
          } else {
            // TODO: WRITE ERROR STUFF HERE
            console.log('error stuff here');
          }
        } else {
          this.files.push(filesList[i]);
        }
      }
      fileInput.value = '';
    }
  }

  removeDocument(event) {
    const deleteButton = event.target;
    const fileName = deleteButton.closest('.file__list-item').querySelector('.file__list-item-name').innerHTML.trim();

    this.files.forEach((file, index) => {
      if (file.name === fileName) {
        this.files.splice(index, 1);
      }
    });
  }

  onSubmit(form) {
    const htmlForm = <HTMLFormElement>document.getElementById('submitCommentForm');
    const commentPeriodId = this.commentPeriodComponent.commentPeriod._id;
    const projectId = this.commentPeriodComponent.commentPeriod.project._id;
    const commentForm = {
      userCan: {},
      period: commentPeriodId,
      project: projectId,
      author: form.author,
      location: form.location,
      isAnonymous: form.visible ? !form.visible : true,
      comment: form.comment
    };

    this.valid = true;
    this.loading = true;

    this.validateFields(form);

    if (!this.valid) {
      this.loading = false;
      return false;
    }

    const documentsForms = [];
    this.files.forEach((doc, index) => {
      const document = new FormData();
      document.append('file', doc, doc.name);
      documentsForms.push(document);
    });

    const options = new RequestOptions();

    this.commentPeriodService.submitComment(projectId, documentsForms, commentForm, options).subscribe(
      data => {
        this.loading = false;
        htmlForm.reset();
        this.files = [];
        this.triggerSubmitComment();
      },
      error => {
        this.error = true;
        this.loading = false;
        console.log(error);
      }
    );
  }

  triggerSubmitComment() {
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    step2.classList.add('hidden');
    step3.classList.remove('hidden');
    step3.scrollIntoView();
  }

  hideAllSteps() {
    const form = <HTMLFormElement>document.getElementById('submitCommentForm');
    form.reset();
    this.removeErrors();
    this.files = [];
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    step1.classList.add('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');

    this.error = false;
  }
}
