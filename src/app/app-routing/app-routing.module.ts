import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { StarterComponent } from './../starter/starter.component';
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuard } from '../_guards/auth.guard';
import { MainComponent } from '../main/main.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login',    component: AuthComponent },
      { path: '', redirectTo: 'main/home', pathMatch: 'full', canActivate: [AuthGuard]},
      { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
      
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
