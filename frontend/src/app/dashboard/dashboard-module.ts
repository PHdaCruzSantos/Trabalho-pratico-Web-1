import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile';
import { ManagePortfolioComponent } from './manage-portfolio/manage-portfolio';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { FormsModule } from '@angular/forms';
import { WorkerDashboardComponent } from './worker-dashboard/worker-dashboard';
import { JobRequestsComponent } from './job-requests/job-requests';
import { ClientProfileComponent } from './client-profile/client-profile';



@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    EditProfileComponent,
    ManagePortfolioComponent,
    WorkerDashboardComponent,
    JobRequestsComponent,
    ClientProfileComponent
  ]
})
export class DashboardModule { }
