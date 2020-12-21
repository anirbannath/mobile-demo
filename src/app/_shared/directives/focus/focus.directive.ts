import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]',
  exportAs: 'focus'
})
export class FocusDirective implements AfterViewInit {

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {
    this.focus();
  }

  public focus() {
    this.elementRef?.nativeElement.focus();
  }

}
