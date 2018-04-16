import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ScrollDirective } from './scroll.directive';

@Component({
  template: `<div id="tableTop"></div><button appScroll>`
})
class TestScrollComponent {}

describe('ScrollDirective', () => {
  let component: TestScrollComponent;
  let fixture: ComponentFixture<TestScrollComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollDirective, TestScrollComponent]
    });

    window.scrollTo(0, 500);
    fixture = TestBed.createComponent(TestScrollComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('button'));
  });

  it('should scroll to the top of the page', () => {
    inputEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(window.pageYOffset).toBe(0);
  });
});
