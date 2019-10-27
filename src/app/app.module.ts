import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminModule } from './admin/admin.module';
import { GirModule } from './gir/gir.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

/**
 * Library...
 */
// import { GaugeChartComponent } from 'angular-gauge-chart'
// 
// 
// import { AmFilterPipe }       from './_pipe/am-filter.pipe';
// import { ThousandSuffixesPipe } from './_pipe/thousand-suffixes.pipe';
// import { InterimFilterPipe } from './_pipe/interim-filter.pipe';
// import { InterimFilterSumPipe } from './_pipe/interim-filter-sum.pipe';
// import { RevenuePerFilterPipe } from './_pipe/revenue-per-filter.pipe';
// import { NumberIdPipe } from './_pipe/numberId.pipe';

import { AppComponent } from './app.component';
import { StarterComponent } from './starter/starter.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLeftSideComponent } from './admin/admin-left-side/admin-left-side.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminControlSidebarComponent } from './admin/admin-control-sidebar/admin-control-sidebar.component';
import { AdminDashboard1Component } from './admin/admin-dashboard1/admin-dashboard1.component';
import { AuthComponent } from './auth/auth.component';
import { SettingService } from './_services/setting.service';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';

import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { NumberIdPipe } from './_pipe/numberId.pipe';
import { SharedService } from './_services/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    StarterComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
    AuthComponent,

//    GaugeChartComponent,

//    AmFilterPipe,
//    ThousandSuffixesPipe,
//    InterimFilterPipe,
//    InterimFilterSumPipe,
//    RevenuePerFilterPipe,
//    NumberIdPipe,

  // NumberIdPipe,

  ],
  imports: [
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    GirModule,
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthService,
    SettingService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
