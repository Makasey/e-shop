import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[zoom]',
})
export class ZoomDirective implements OnInit {
  @Input('zoomSize') size;

  @HostListener('mouseover') onMouseOver() {
    this.elementDirective.nativeElement.style.fontSize = `${this.size * 2}px`;
  }

  @HostListener('mouseout') onMouseOut() {
    this.elementDirective.nativeElement.style.fontSize = `${this.size}px`;
  }

  private elementDirective: ElementRef;

  constructor(private element: ElementRef) {
    // element.nativeElement.style.fontSize + '30px';
    element.nativeElement.style.fontSize = `${this.size}px`;
    this.elementDirective = element;
  }

  ngOnInit() {
    this.elementDirective.nativeElement.style.fontSize = `${this.size}px`;
  }
}
