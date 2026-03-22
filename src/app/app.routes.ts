import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

{
  path: 'login',
  loadComponent: () => import('./auth/login/login')
},

{
  path: 'dashboard',
  loadComponent: () => import('./pages/dashboard/dashboard'),
  canActivate: [authGuard]
},

{
  path: 'owner',
  loadComponent: () => import('./pages/owner-page/owner-page'),
  canActivate: [authGuard]
},

{
  path:"**",
  redirectTo: '/dashboard', pathMatch: 'full'
}



];
