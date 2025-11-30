import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { ProductService } from './product.service';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { CounterComponent } from './counter/counter.component';
import { CreateComponent } from './create/create.component';
import { CatalogRoutingModule } from './catalog-routing.module';

const routes: Routes = [
  { path: '/list', component: ListComponent },              // optional: product list at /catalog/
  { path: 'details/:id', component: DetailsComponent },// optional
  { path: 'create', component: CreateComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'delete/:id', component: DeleteComponent }
];

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    UpdateComponent,
    DeleteComponent,
    CounterComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CatalogRoutingModule,
    ReactiveFormsModule
],
  providers: [ProductService],
  exports: [ListComponent,DeleteComponent, CreateComponent, UpdateComponent]
})
export class CatalogModule { }
