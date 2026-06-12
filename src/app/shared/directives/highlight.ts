import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()'
  }
})
export class HighlightDirective {
  private el = inject(ElementRef);
  color = input('crimson', { alias: 'appHighlight' });

  onEnter() {
    this.el.nativeElement.style.color = this.color();
    this.el.nativeElement.style.fontWeight = 'bold';
    this.el.nativeElement.style.cursor = 'pointer';
  }

  onLeave() {
    this.el.nativeElement.style.color = '';
    this.el.nativeElement.style.fontWeight = '';
  }
}