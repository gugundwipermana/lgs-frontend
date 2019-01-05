import { MainRoutingModule } from './main-routing/main-routing.module';
import { MainControlSidebarComponent } from './main-control-sidebar/main-control-sidebar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainLeftSideComponent } from './main-left-side/main-left-side.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainComponent } from './main.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * Library...
 */
import { GaugeChartComponent } from 'angular-gauge-chart'


import { AmFilterPipe }       from '../_pipe/am-filter.pipe';
import { ThousandSuffixesPipe } from '../_pipe/thousand-suffixes.pipe';
import { InterimFilterPipe } from '../_pipe/interim-filter.pipe';
import { InterimFilterSumPipe } from '../_pipe/interim-filter-sum.pipe';
import { RevenuePerFilterPipe } from '../_pipe/revenue-per-filter.pipe';
import { NumberIdPipe } from '../_pipe/numberId.pipe';


import { HomeComponent } from './home/home.component';
import { MappingComponent } from './mapping/mapping.component';
import { RevenueService } from '../_services/revenue.service';
import { MappingAmComponent } from './mapping/mapping-am/mapping-am.component';
import { MappingCustomerComponent } from './mapping/mapping-customer/mapping-customer.component';
import { MappingAccountComponent } from './mapping/mapping-account/mapping-account.component';
import { AmService } from '../_services/am.service';
import { AccountService } from '../_services/account.service';
import { CustomerService } from '../_services/customer.service';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    MainHeaderComponent,
    MainLeftSideComponent,
    MainContentComponent,
    MainFooterComponent,
    MainControlSidebarComponent,
    HomeComponent,
    MappingComponent,


    GaugeChartComponent,

    AmFilterPipe,
    ThousandSuffixesPipe,
    InterimFilterPipe,
    InterimFilterSumPipe,
    RevenuePerFilterPipe,
    NumberIdPipe,
    MappingAmComponent,
    MappingCustomerComponent,
    MappingAccountComponent,

  ],
  providers: [
    RevenueService,
    AmService,
    CustomerService,
    AccountService,
  ],
  exports: [MainComponent]
})
export class MainModule { }