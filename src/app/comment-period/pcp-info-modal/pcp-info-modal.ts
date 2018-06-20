import { Component, Input } from '@angular/core'; 

@Component({
  selector: 'app-pcp-info-modal',
  templateUrl: './pcp-info-modal.component.html',
  styleUrls: ['./pcp-info-modal.component.scss']
})
export class PCPInfoModalComponent {
  @Input() commentPeriod; 
  constructor() { };

  triggerSubmitComment() {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    step2.scrollIntoView();
  };

  hideAllSteps() {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    step1.classList.add('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');
  }
}

