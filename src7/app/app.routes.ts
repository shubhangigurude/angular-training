import { Routes } from '@angular/router';
import { SignInComponent } from './membership/sign-in/sign-in.component';
import { RegisterComponent } from './membership/register/register.component';

export const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }
];
