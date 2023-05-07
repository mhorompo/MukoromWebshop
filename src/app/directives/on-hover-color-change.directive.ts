import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnHoverColorChange]'
})
export class OnHoverColorChangeDirective {

  private backgroundColor?: string;
  private color?: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.backgroundColor = this.elementRef.nativeElement.style.backgroundColor;
    this.color = this.elementRef.nativeElement.style.color;
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.style.backgroundColor = this.backgroundColor;
    this.elementRef.nativeElement.style.color = this.color;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.backgroundColor = 'blue';
    this.elementRef.nativeElement.style.color = 'white';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.backgroundColor = this.backgroundColor;
    this.elementRef.nativeElement.style.color = this.color;
  }

}
