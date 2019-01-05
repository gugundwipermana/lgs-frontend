import { MainComponent } from './../main.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MappingComponent } from '../mapping/mapping.component';
import { AuthGuard } from '../../_guards/auth.guard';
import { MappingAmComponent } from '../mapping/mapping-am/mapping-am.component';
import { MappingCustomerComponent } from '../mapping/mapping-customer/mapping-customer.component';
import { MappingAccountComponent } from '../mapping/mapping-account/mapping-account.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'main',
        component: MainComponent,
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path: 'home',
            component: HomeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'mapping',
            component: MappingComponent, canActivate: [AuthGuard],
            children: [
              { path: 'am', component: MappingAmComponent, canActivate: [AuthGuard] },
              { path: 'customer', component: MappingCustomerComponent, canActivate: [AuthGuard] },
              { path: 'account', component: MappingAccountComponent, canActivate: [AuthGuard] }
            ]
          },

        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }