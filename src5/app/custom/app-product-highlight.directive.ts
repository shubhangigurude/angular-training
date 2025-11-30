import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Product } from '../catalog/product';

@Directive({
  selector: '[appAppProductHighlight]'
})
export class AppProductHighlightDirective implements OnInit {
  @Input("appAppProductHighlight") product!: Product;

  constructor(private eleRef: ElementRef, private render: Renderer2) {
    console.log("directive constructor invoked")
  }
  ngOnInit() {
    console.log("directive init invoked")
    if (this.product.stock === 0) {
      console.log(this.product.stock)
      this.render.setStyle(this.eleRef.nativeElement, "opacity", "0.5");
    }
    if (this.product.discount! > 0) {
      console.log(this.product.discount)
      this.render.setStyle(this.eleRef.nativeElement, "border", "2px solid red");

    }
  }

}
