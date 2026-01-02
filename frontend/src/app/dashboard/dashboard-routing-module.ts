import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile';
import { ManagePortfolioComponent } from './manage-portfolio/manage-portfolio';
import { WorkerDashboardComponent } from './worker-dashboard/worker-dashboard';
import { JobRequestsComponent } from './job-requests/job-requests';
import { WorkerProfileComponent } from '../worker-profile/worker-profile';
import { ClientProfileComponent } from './client-profile/client-profile';
import { ClientFavoritesComponent } from './client-favorites/client-favorites.component';
import { ClientRequestsComponent } from './client-requests/client-requests.component';

const routes: Routes = [
  {
    path: '',
    component: WorkerDashboardComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: WorkerProfileComponent },
      { path: 'requests', component: JobRequestsComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'manage-portfolio', component: ManagePortfolioComponent },
      { path: 'client-profile', component: ClientProfileComponent },
      { path: 'client-favorites', component: ClientFavoritesComponent },
      { path: 'client-requests', component: ClientRequestsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
