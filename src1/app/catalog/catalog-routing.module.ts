import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  // when user goes to /catalog -> show ListComponent
  { path: '', component: ListComponent },

  // optionally /catalog/list -> also show ListComponent
  { path: 'lists', component: ListComponent },
  { path: "update", component: UpdateComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'create', component: CreateComponent }
  //{path:'details/:id', loadComponent: () => import('./details/details.component').then(m => m.DetailsComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }