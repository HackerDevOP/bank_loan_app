import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { LoanApplication } from './pages/loan-application/loan-application';
import { ApplicationList } from './pages/application-list/application-list';
import { NotFound } from './pages/not-found/not-found';
import { routeGuardGuard } from './guards/route-guard-guard';

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
    component: LoanApplication,
    canActivate:[routeGuardGuard]
  },
  {
    path:'application-list',
    component: ApplicationList,
    canActivate:[routeGuardGuard]
  },
  {
    path:'**',
    component:NotFound
  }
];
