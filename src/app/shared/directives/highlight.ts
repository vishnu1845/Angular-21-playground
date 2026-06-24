// import { Directive, ElementRef, inject, input } from '@angular/core';

// @Directive({
//   selector: '[appHighlight]',
//   host: {
//     '(mouseenter)': 'onEnter()',
//     '(mouseleave)': 'onLeave()'
//   }
// })
// export class HighlightDirective {

//   private el = inject(ElementRef);

//   // separate input for the color value
//   appHighlight = input<string>('');

//   onEnter() {
//     this.el.nativeElement.style.color = this.appHighlight() || 'crimson';
//     this.el.nativeElement.style.fontWeight = 'bold';
//   }

//   onLeave() {
//     this.el.nativeElement.style.color = '';
//     this.el.nativeElement.style.fontWeight = '';
//   }
// }



// Old way with HostBinding
import { Directive, HostBinding, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  // input() → signal-based way to receive a value from outside (parent-to-directive)
  // alias: 'appHighlight' → so [appHighlight]="'orange'" works directly
  // default value = 'crimson' → used when no argument is passed
  // color = input('crimson', { alias: 'appHighlight' });
  color = input('crimson', { alias: 'appHighlight', transform: (value: string) => value || 'crimson'});


  // @HostBinding → binds this class property to the host element's style.color
  // whenever 'textColor' changes, Angular auto-updates the DOM (no ElementRef needed)
  @HostBinding('style.color') textColor = '';

  // @HostBinding → binds this class property to the host element's style.fontWeight
  // whenever 'weight' changes, Angular auto-updates the DOM
  @HostBinding('style.fontWeight') weight = '';

  // @HostListener → listens to 'mouseenter' event on the host element
  // when mouse enters, update the bound properties → Angular reflects it to DOM
  @HostListener('mouseenter') onEnter() {
    this.textColor = this.color()  
    this.weight = 'bold';
  }

  // @HostListener → listens to 'mouseleave' event on the host element
  // when mouse leaves, reset the bound properties → Angular clears the styles
  @HostListener('mouseleave') onLeave() {
    this.textColor = '';
    this.weight = '';
  }
}