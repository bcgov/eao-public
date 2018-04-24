import { Component } from '@angular/core';

@Component({
  selector: 'app-submit-comment-progress-modal',
  templateUrl: './submit-comment-progress-modal.component.html',
  styleUrls: ['./submit-comment-progress-modal.component.scss']
})
export class SubmitCommentProgressModalComponent {
  constructor() { };

  triggerSubmitComment() {
    const step3 = document.getElementById('step3');
    step3.classList.add('hidden');
  };
}
