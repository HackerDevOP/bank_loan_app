import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { LoanApplication } from './pages/loan-application/loan-application';
import { ApplicationList } from './pages/application-list/application-list';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: Home
  },
  {
    path:'login',
    component: Login
  },
  {
    path:'register',
    component: Register
  },
  {
    path:'loan-application',
    component: LoanApplication
  },
  {
    path:'application-list',
    component: ApplicationList
  },
  {
    path:'**',
    component:NotFound
  }
];
