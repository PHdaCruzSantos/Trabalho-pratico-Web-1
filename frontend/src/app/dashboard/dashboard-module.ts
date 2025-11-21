import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile';
import { ManagePortfolioComponent } from './manage-portfolio/manage-portfolio';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    EditProfileComponent,
    ManagePortfolioComponent
  ]
})
export class DashboardModule { }
