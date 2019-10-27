import { GirDashboard1Component } from './../gir-dashboard1/gir-dashboard1.component';
import { GirComponent } from './../gir.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GpHomeComponent } from '../gp-home/gp-home.component';
import { GpMappingComponent } from '../gp-mapping/gp-mapping.component';
import { GpMappingCustomerComponent } from '../gp-mapping/gp-mapping-customer/gp-mapping-customer.component';
import { GpMappingAmComponent } from '../gp-mapping/gp-mapping-am/gp-mapping-am.component';
import { GpMappingAccountComponent } from '../gp-mapping/gp-mapping-account/gp-mapping-account.component';
import { GpRevenueYtdComponent } from '../gp-revenue/gp-revenue-ytd/gp-revenue-ytd.component';
import { GpRevenueCurrentComponent } from '../gp-revenue/gp-revenue-current/gp-revenue-current.component';
import { GpRevenueComponent } from '../gp-revenue/gp-revenue.component';
import { GpLopComponent } from '../gp-lop/gp-lop.component';
import { LopDetailComponent } from '../gp-lop/lop-detail.component';
import { PiutangDetailComponent } from '../gp-piutang/piutang-detail.component';
import { PiutangKoreksiComponent } from '../gp-piutang/piutang-koreksi.component';
import { GpPiutangComponent } from '../gp-piutang/gp-piutang.component';
import { ProjectChannelKatalogComponent } from '../gp-project-channel/project-channel-katalog.component';
import { ProjectChannelTsoComponent } from '../gp-project-channel/project-channel-tso.component';
import { ProjectChannelPlComponent } from '../gp-project-channel/project-channel-pl.component';
import { ProjectChannelTenderComponent } from '../gp-project-channel/project-channel-tender.component';
import { GpProjectChannelComponent } from '../gp-project-channel/gp-project-channel.component';
import { GpScnComponent } from '../gp-scn/gp-scn.component';
import { ScnFormComponent } from '../gp-scn/scn-form.component';
import { ScnDetailComponent } from '../gp-scn/scn-detail.component';
import { GpUserComponent } from '../gp-user/gp-user.component';
import { RevenueCurrentSiskaComponent } from '../gp-revenue/gp-revenue-current/revenue-current-siska.component';
import { AuthGuard } from '../../_guards/auth.guard';
import { GpOgpComponent } from '../gp-ogp/gp-ogp.component';
import { GpCompleteComponent } from '../gp-complete/gp-complete.component';
import { GpExpiredComponent } from '../gp-expired/gp-expired.component';
import { OgpDetailComponent } from '../gp-ogp/ogp-detail.component';
import { OgpTypeComponent } from '../gp-ogp/ogp-type.component';
import { OrderNotValidComponent } from '../gp-ogp/order-not-valid.component';
import { CompleteDetailComponent } from '../gp-complete/complete-detail.component';
import { CompleteTypeComponent } from '../gp-complete/complete-type.component';
import { EndContractDetailComponent } from '../gp-expired/end-contract-detail.component';
import { EndContractTypeComponent } from '../gp-expired/end-contract-type.component';
import { SalesLinkOgpComponent } from '../gp-sales/sales-link-ogp.component';
import { SalesLinkCompleteComponent } from '../gp-sales/sales-link-complete.component';
import { SalesWifiOgpComponent } from '../gp-sales/sales-wifi-ogp.component';
import { SalesWifiCompleteComponent } from '../gp-sales/sales-wifi-complete.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'gir',
        component: GirComponent,
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path: 'home',
            component: GpHomeComponent
          },
          {
            path: 'mapping',
            component: GpMappingComponent,
            children: [
              {
                path: 'customer',
                component: GpMappingCustomerComponent
              },
              {
                path: 'am',
                component: GpMappingAmComponent
              },
              {
                path: 'account',
                component: GpMappingAccountComponent
              }
            ] 
          },
          {
            path: 'revenue',
            component: GpRevenueComponent,
            children: [
              {
                path: 'ytd',
                component: GpRevenueYtdComponent
              },
              {
                path: 'current',
                component: GpRevenueCurrentComponent
              }
            ] 
          },
          {
            path: 'revenue/siska',
            component: RevenueCurrentSiskaComponent
          },
          
          {
            path: 'lop',
            component: GpLopComponent,
          },
          {
            path: 'lop/:id',
            component: LopDetailComponent
          },





          {
            path: 'ogp',
            component: GpOgpComponent, canActivate: [AuthGuard]
          },
          {
            path: 'ogp/order-not-valid',
            component: OrderNotValidComponent, canActivate: [AuthGuard]
          },
          {
            path: 'ogp/detail/:treg/:type/:status', component: OgpDetailComponent, canActivate: [AuthGuard]
          },
          {
            path: 'ogp/:type',
            component: OgpTypeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'complete',
            component: GpCompleteComponent, canActivate: [AuthGuard]
          },
          {
            path: 'complete/detail/:treg/:type/:status', component: CompleteDetailComponent, canActivate: [AuthGuard]
          },
          {
            path: 'complete/:type',
            component: CompleteTypeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'expired',
            component: GpExpiredComponent, canActivate: [AuthGuard]
          },
          {
            path: 'expired/detail/:treg/:type/:status', component: EndContractDetailComponent, canActivate: [AuthGuard]
          },
          {
            path: 'expired/:type',
            component: EndContractTypeComponent, canActivate: [AuthGuard]
          },

          {
            path: 'sales-bw/link-ogp',
            component: SalesLinkOgpComponent, canActivate: [AuthGuard] //,
          },
          {
            path: 'sales-bw/link-complete',
            component: SalesLinkCompleteComponent, canActivate: [AuthGuard] //,
          },
          {
            path: 'sales-bw/wifi-ogp',
            component: SalesWifiOgpComponent, canActivate: [AuthGuard] //,
          },
          {
            path: 'sales-bw/wifi-complete',
            component: SalesWifiCompleteComponent, canActivate: [AuthGuard] //,
          },




          {
            path: 'piutang',
            component: GpPiutangComponent,
            children: [
              
            ]
          },
          {
            path: 'piutang/detail',
            component: PiutangDetailComponent
          },
          {
            path: 'piutang/koreksi',
            component: PiutangKoreksiComponent
          },


          {
            path: 'project-channel',
            component: GpProjectChannelComponent,
            children: [
              
            ]
          },
          { path: 'project-channel/katalog', component: ProjectChannelKatalogComponent },
          { path: 'project-channel/tso', component: ProjectChannelTsoComponent },
          { path: 'project-channel/pl', component: ProjectChannelPlComponent },
          { path: 'project-channel/tender', component: ProjectChannelTenderComponent },
          

          {
            path: 'scn',
            component: GpScnComponent //,
          },
          {
            path: 'scn/form',
            component: ScnFormComponent //,
          },
          {
            path: 'scn/:type',
            component: ScnDetailComponent //,
          },

          {
            path: 'users',
            component: GpUserComponent //,
          },

        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class GirRoutingModule { }
