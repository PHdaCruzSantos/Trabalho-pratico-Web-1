import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile';
import { ManagePortfolioComponent } from './manage-portfolio/manage-portfolio';

const routes: Routes = [
  { path: '', redirectTo: 'edit-profile', pathMatch: 'full' },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'manage-portfolio', component: ManagePortfolioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
