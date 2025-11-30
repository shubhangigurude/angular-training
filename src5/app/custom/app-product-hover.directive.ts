import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { Product } from '../catalog/product';

@Directive({
  selector: '[appAppProductHover]'
})
export class AppProductHoverDirective implements OnInit {
  @Input("appAppProductHover") appProductHover!: Product
  private higlightColor: string = "yellow";
  constructor(private elementRef: ElementRef, private rendrer: Renderer2) {

  }
  @HostListener('mouseenter') onMouseEnter() {
    this.rendrer.setStyle(this.elementRef.nativeElement, 'background-color', this.higlightColor)
  }
  @HostListener('mouseout') onMouseOut() {
    this.rendrer.removeStyle(this.elementRef.nativeElement, 'background-color');
  }
  ngOnInit(): void {

  }
}
