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
import { RevenueComponent } from '../revenue/revenue.component';
import { RevenueYtdComponent } from '../revenue/revenue-ytd/revenue-ytd.component';
import { RevenueCurrentComponent } from '../revenue/revenue-current/revenue-current.component';
import { CustomerComponent } from '../customer/customer.component';
import { CustomerAchComponent } from '../customer/customer-ach/customer-ach.component';
import { CustomerTierComponent } from '../customer/customer-tier/customer-tier.component';

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

          {
            path: 'revenue',
            component: RevenueComponent, canActivate: [AuthGuard],
            children: [
              { path: 'ytd/:year/:start_month/:end_month/:treg/:witel/:customer/:am', component: RevenueYtdComponent, canActivate: [AuthGuard] },
              { path: 'ytd', component: RevenueYtdComponent, canActivate: [AuthGuard] },
              { path: 'current', component: RevenueCurrentComponent, canActivate: [AuthGuard] }
            ]
          },

          {
            path: 'customer',
            component: CustomerComponent, canActivate: [AuthGuard],
            children: [
              { path: 'ach', component: CustomerAchComponent, canActivate: [AuthGuard] },
              { path: 'tier', component: CustomerTierComponent, canActivate: [AuthGuard] }
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