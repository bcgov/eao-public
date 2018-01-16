import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})

export class ScrollDirective {

  constructor(el: ElementRef) { }

  @HostListener('click') onclick() {
    this.scrollTop();
  }

  private scrollTop() {
    const tableTop = document.getElementById('tableTop');
    const top = tableTop.offsetTop;
    window.scrollTo(0, top);
  }
}
