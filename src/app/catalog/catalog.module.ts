import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './products/details/details.component';
import { ListComponent } from './products/list/list.component';
import { CounterComponent } from './products/counter/counter.component';
import { InsertComponent } from './products/insert/insert.component';
import { MyhighlightDirective } from '../myhighlight.directive';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [ CommonModule ,ListComponent,DetailsComponent,CounterComponent,InsertComponent,MyhighlightDirective,HttpClientModule],

  exports: [ ListComponent, InsertComponent],
  providers:[ProductService]   //it is creating singleton object

})
export class CatalogModule { }
