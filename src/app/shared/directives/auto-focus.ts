import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[appAutoFocus]' })
export class AutoFocusDirective implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}