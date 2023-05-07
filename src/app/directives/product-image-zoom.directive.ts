import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appProductImageZoom]',
})
export class ProductImageZoomDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.classList.add('zoom-in');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.remove('zoom-in');
  }
}
