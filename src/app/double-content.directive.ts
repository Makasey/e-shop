import { AfterViewInit, Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[doubleContent]',
})
export class doubleContentDirective implements AfterViewInit {
  public isContentWasDupLicated = false;

  private elementDirective: ElementRef;

  constructor(private tml: TemplateRef<any>, private vc: ViewContainerRef) {
    this.vc.createEmbeddedView(tml);
  }

  ngAfterViewInit() {
    if (!this.isContentWasDupLicated) {
      this.vc.insert(this.vc.createEmbeddedView(this.tml));
      this.isContentWasDupLicated = true;
    }
  }
}
