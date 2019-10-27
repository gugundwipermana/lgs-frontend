import { GirRoutingModule } from './gir-routing/gir-routing.module';
import { GirDashboard1Component } from './gir-dashboard1/gir-dashboard1.component';
import { GirControlSidebarComponent } from './gir-control-sidebar/gir-control-sidebar.component';
import { GirFooterComponent } from './gir-footer/gir-footer.component';
import { GirContentComponent } from './gir-content/gir-content.component';
import { GirLeftSideComponent } from './gir-left-side/gir-left-side.component';
import { GirHeaderComponent } from './gir-header/gir-header.component';
import { GirComponent } from './gir.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Library...
 */
import { DataTableModule }     from 'angular2-datatable';



import { GpHomeComponent } from './gp-home/gp-home.component';
import { GpMappingComponent } from './gp-mapping/gp-mapping.component';
import { GpMappingCustomerComponent } from './gp-mapping/gp-mapping-customer/gp-mapping-customer.component';
import { GpMappingAmComponent } from './gp-mapping/gp-mapping-am/gp-mapping-am.component';
import { GpMappingAccountComponent } from './gp-mapping/gp-mapping-account/gp-mapping-account.component';
import { GpRevenueComponent } from './gp-revenue/gp-revenue.component';
import { GpRevenueYtdComponent } from './gp-revenue/gp-revenue-ytd/gp-revenue-ytd.component';
import { GpRevenueCurrentComponent } from './gp-revenue/gp-revenue-current/gp-revenue-current.component';
import { GpLopComponent } from './gp-lop/gp-lop.component';
import { NumberIdPipe } from '../_pipe/numberId.pipe';
import { FormsModule } from '@angular/forms';
import { GpMappingAmDetailComponent } from './gp-mapping/gp-mapping-am/gp-mapping-am-detail/gp-mapping-am-detail.component';
import { ImageCropComponent } from '../image-crop.component';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { GaugeChartComponent } from 'angular-gauge-chart';
import { ThousandSuffixesPipe } from '../_pipe/thousand-suffixes.pipe';


import { RevenueService } from '../_services/revenue.service';
import { AmService } from '../_services/am.service';
import { CustomerService } from '../_services/customer.service';
import { AccountService } from '../_services/account.service';
import { TregService } from '../_services/treg.service';
import { WitelService } from '../_services/witel.service';
import { InterimService } from '../_services/interim.service';
import { OgpService } from '../_services/ogp.service';
import { CompleteService } from '../_services/complete.service';
import { EndContractService } from '../_services/end-contract.service';
import { ScnService } from '../_services/scn.service';
import { UserService } from '../_services/user.service';
import { SalesService } from '../_services/sales.service';
import { LopService } from '../_services/lop.service';
import { ProjectChannelService } from '../_services/project-channel.service';
import { PiutangService } from '../_services/piutang.service';
import { GirFilterComponent } from './gir-filter/gir-filter.component';
import { AmFilterPipe } from '../_pipe/am-filter.pipe';
import { InterimFilterPipe } from '../_pipe/interim-filter.pipe';
import { InterimFilterSumPipe } from '../_pipe/interim-filter-sum.pipe';
import { RevenuePerFilterPipe } from '../_pipe/revenue-per-filter.pipe';
import { OgpFilterPipe } from '../_pipe/ogp-filter.pipe';
import { LopDetailComponent } from './gp-lop/lop-detail.component';
import { LopFormComponent } from './gp-lop/lop-form.component';
import { GpPiutangComponent } from './gp-piutang/gp-piutang.component';
import { PiutangDetailComponent } from './gp-piutang/piutang-detail.component';
import { PiutangKoreksiComponent } from './gp-piutang/piutang-koreksi.component';
import { PiutangRangeComponent } from './gp-piutang/piutang-range.component';
import { GpProjectChannelComponent } from './gp-project-channel/gp-project-channel.component';
import { ProjectChannelKatalogComponent } from './gp-project-channel/project-channel-katalog.component';
import { ProjectChannelPlComponent } from './gp-project-channel/project-channel-pl.component';
import { ProjectChannelTenderComponent } from './gp-project-channel/project-channel-tender.component';
import { ProjectChannelTsoComponent } from './gp-project-channel/project-channel-tso.component';
import { GpScnComponent } from './gp-scn/gp-scn.component';
import { ScnDetailComponent } from './gp-scn/scn-detail.component';
import { ScnFormComponent } from './gp-scn/scn-form.component';
import { GpUserComponent } from './gp-user/gp-user.component';
import { RevenueCurrentSiskaComponent } from './gp-revenue/gp-revenue-current/revenue-current-siska.component';
import { GpOgpComponent } from './gp-ogp/gp-ogp.component';
import { GpCompleteComponent } from './gp-complete/gp-complete.component';
import { GpSalesComponent } from './gp-sales/gp-sales.component';
import { GpExpiredComponent } from './gp-expired/gp-expired.component';
import { OgpTypeComponent } from './gp-ogp/ogp-type.component';
import { OgpDetailComponent } from './gp-ogp/ogp-detail.component';
import { OrderNotValidComponent } from './gp-ogp/order-not-valid.component';
import { CompleteTypeComponent } from './gp-complete/complete-type.component';
import { CompleteDetailComponent } from './gp-complete/complete-detail.component';
import { EndContractDetailComponent } from './gp-expired/end-contract-detail.component';
import { EndContractTypeComponent } from './gp-expired/end-contract-type.component';
import { SalesLinkOgpComponent } from './gp-sales/sales-link-ogp.component';
import { SalesLinkCompleteComponent } from './gp-sales/sales-link-complete.component';
import { SalesWifiOgpComponent } from './gp-sales/sales-wifi-ogp.component';
import { SalesWifiCompleteComponent } from './gp-sales/sales-wifi-complete.component';

@NgModule({
  imports: [
    CommonModule,
    GirRoutingModule,
    DataTableModule,
    FormsModule,
  ],
  declarations: [

    ImageCropComponent,
    ImageCropperComponent,
    GaugeChartComponent,
    AmFilterPipe,
    ThousandSuffixesPipe,
    InterimFilterPipe,
    InterimFilterSumPipe,
    RevenuePerFilterPipe,
    NumberIdPipe,
    OgpFilterPipe,
    NumberIdPipe,


    /**
     * Need recreate...
     */
    LopDetailComponent,
    LopFormComponent,
    PiutangDetailComponent,
    PiutangKoreksiComponent,
    PiutangRangeComponent,
    ProjectChannelKatalogComponent,
    ProjectChannelPlComponent,
    ProjectChannelTenderComponent,
    ProjectChannelTsoComponent,
    ScnDetailComponent,
    ScnFormComponent,
    RevenueCurrentSiskaComponent,
    OgpTypeComponent,
    OgpDetailComponent,
    OrderNotValidComponent,
    CompleteTypeComponent,
    CompleteDetailComponent,
    EndContractDetailComponent,
    EndContractTypeComponent,
    SalesLinkOgpComponent,
    SalesLinkCompleteComponent,
    SalesWifiOgpComponent,
    SalesWifiCompleteComponent,


    GirFilterComponent,

    GirComponent,
    GirHeaderComponent,
    GirLeftSideComponent,
    GirContentComponent,
    GirFooterComponent,
    GirControlSidebarComponent,
    GirDashboard1Component,
    GpHomeComponent,
    GpMappingComponent,
    GpMappingCustomerComponent,
    GpMappingAmComponent,
    GpMappingAccountComponent,
    GpRevenueComponent,
    GpRevenueYtdComponent,
    GpRevenueCurrentComponent,
    GpLopComponent,
    GpMappingAmDetailComponent,
    GpPiutangComponent,
    GpProjectChannelComponent,
    GpScnComponent,
    GpUserComponent,
    GpOgpComponent,
    GpCompleteComponent,
    GpSalesComponent,
    GpExpiredComponent,
    
  ],
  providers: [
    RevenueService,
    AmService,
    CustomerService,
    AccountService,
    TregService,
    WitelService,
    InterimService,
    OgpService,
    CompleteService,
    EndContractService,
    ScnService,
    UserService,
    SalesService,
    LopService,
    ProjectChannelService,
    PiutangService,
  ],
  exports: [GirComponent]
})
export class GirModule { }
