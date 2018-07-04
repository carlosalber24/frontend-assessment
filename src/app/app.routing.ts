import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MainAppComponent } from './pages/app/app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from '../providers/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'app', component: MainAppComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
