import { style } from '@angular/animations';
import { Directive, Input, OnChanges,ElementRef,Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appMyhighlight]',
  standalone: true
})
export class MyhighlightDirective {
  @Input() item:number=0;


  constructor(private el: ElementRef, private renderer: Renderer2) {
     this.renderer.setStyle(this.el.nativeElement, 'background-color', 'grey');
      this.renderer.setStyle(this.el.nativeElement,'color','Red');


   }
  //  ngOnChanges(changes: SimpleChanges): void {
  //  this.renderer.setStyle(this.el.nativeElement,'color','green');
  //  }

}
