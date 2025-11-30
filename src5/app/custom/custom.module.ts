import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfDirective } from './customdirectiveif';
import { HiddenDirective } from './customdirectivehidden';
import { UnderlineDirective } from './customdirectiveunderline';
import { AppProductHighlightDirective } from './app-product-highlight.directive';
import { AppProductHoverDirective } from './app-product-hover.directive';

@NgModule({
  declarations: [IfDirective, HiddenDirective, UnderlineDirective, AppProductHighlightDirective, AppProductHoverDirective],
  imports: [CommonModule],
  exports: [IfDirective, HiddenDirective, UnderlineDirective, AppProductHighlightDirective, AppProductHoverDirective]
})
export class CustomModule { }