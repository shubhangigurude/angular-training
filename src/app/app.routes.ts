import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './membership/sign-in/sign-in.component';
import { RegisterComponent } from './membership/register/register.component';
import { DetailsComponent } from './catalog/products/details/details.component';
import { ListComponent } from './catalog/products/list/list.component';
import { CartComponent } from './shopping-cart/cart/cart.component';

export const routes: Routes = [
 {path:'', component:SignInComponent},
 {path:'register', component:RegisterComponent},
 {path:'Products', component:ListComponent},
 {path:'carts', component:CartComponent}
];
