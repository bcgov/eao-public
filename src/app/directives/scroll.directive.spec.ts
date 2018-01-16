import { ScrollDirective } from './scroll.directive';
import { ElementRef } from '@angular/core';

describe('ScrollDirective', () => {
  const element = new ElementRef('button');
  it('should create an instance', () => {
    const directive = new ScrollDirective(element);
    expect(directive).toBeTruthy();
  });
});
