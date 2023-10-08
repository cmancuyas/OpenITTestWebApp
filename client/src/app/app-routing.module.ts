import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },

  {
    path: 'master-data',
    // runGuardsAndResolvers: 'always',
    // canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/master-data/master-data.module').then(
        (module) => module.MasterDataModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then(
        (module) => module.AccountModule
      ),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
