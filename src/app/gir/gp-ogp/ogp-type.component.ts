import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OgpService } from '../../_services/ogp.service';


@Component({
  selector: 'app-ogp-type',
  template: `

  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        OGP
        <small>Type</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#"><i class="fa fa-dashboard"></i> OGP</a></li>
        <li class="active">Type</li>
      </ol>
    </section>
  
    <!-- Main content -->
    <section class="content">


  <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">{{ type }}</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
            
                <img *ngIf="loading" style="position: absolute; top:10px; left:10px;" src="assets/img/loading.gif" />

                <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                      <th rowspan="2">TREG</th>
                      <th colspan="4">JUMLAH ORDER</th>
                      <th colspan="4">OTC (Rp)</th>
                      <th colspan="4">MONTHLY (Rp)</th>
                    </tr>
                    <tr>
                        <th>PROVISIONING</th>
                        <th>PENDING BASO</th>
                        <th>PENDING BILLING</th>
                        <th>TOTAL</th>

                        <th>PROVISIONING</th>
                        <th>PENDING BASO</th>
                        <th>PENDING BILLING</th>
                        <th>TOTAL</th>

                        <th>PROVISIONING</th>
                        <th>PENDING BASO</th>
                        <th>PENDING BILLING</th>
                        <th>TOTAL</th>

                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of ogps" class="td-click">
                        <td>{{ item.TREG }}</td>
                        <td [routerLink]="['/main', 'ogp', 'detail', item.TREG, type, 'PROVISIONING']" >{{ item.PROVISIONING_JML }}</td>
                        <td [routerLink]="['/main', 'ogp', 'detail', item.TREG, type, 'BASO']" >{{ item.BASO_JML }}</td>
                        <td [routerLink]="['/main', 'ogp', 'detail', item.TREG, type, 'APPROVAL']" >{{ item.APPROVAL_JML }}</td>
                        <td>{{ item.jum_total }}</td>

                        <td class="td-align-right">{{ item.PROVISIONING_OTC | numberId }}</td>
                        <td class="td-align-right">{{ item.BASO_OTC | numberId }}</td>
                        <td class="td-align-right">{{ item.APPROVAL_OTC | numberId }}</td>
                        <td class="td-align-right">{{ item.otc_total | numberId }}</td>

                        <td class="td-align-right">{{ item.PROVISIONING_MONTHLY | numberId }}</td>
                        <td class="td-align-right">{{ item.BASO_MONTHLY | numberId }}</td>
                        <td class="td-align-right">{{ item.APPROVAL_MONTHLY | numberId }}</td>
                        <td class="td-align-right">{{ item.monthly_total | numberId }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>TOTAL LGS</th>
                        <th>{{ jum_provisioning }}</th>
                        <th>{{ jum_baso }}</th>
                        <th>{{ jum_approval }}</th>
                        <th>{{ jum_total }}</th>

                        <th class="td-align-right">{{ otc_provisioning | numberId }}</th>
                        <th class="td-align-right">{{ otc_baso | numberId }}</th>
                        <th class="td-align-right">{{ otc_approval | numberId }}</th>
                        <th class="td-align-right">{{ otc_total | numberId }}</th>

                        <th class="td-align-right">{{ monthly_provisioning | numberId }}</th>
                        <th class="td-align-right">{{ monthly_baso | numberId }}</th>
                        <th class="td-align-right">{{ monthly_approval | numberId }}</th>
                        <th class="td-align-right">{{ monthly_total | numberId }}</th>
                    </tr>
                </tfoot>
                </table>
            </div>
        </div>
    </div>
    </div>



    </section>
    <!-- /.content -->
</div>
  


  `,
  styles: [`
  
    td, th {
        text-align: center;
    }


        
    .td-align-right {
      text-align: right;
    }

    th {
      vertical-align: middle;
    }

  `]
})
export class OgpTypeComponent implements OnInit {


  private loading: Boolean = false;

  public ogps: any;
  public type = '';

  public jum_provisioning: number = 0;
  public jum_baso: number = 0;
  public jum_approval: number = 0;
  public jum_total: number = 0;


  public otc_provisioning: number = 0;
  public otc_baso: number = 0;
  public otc_approval: number = 0;
  public otc_total: number = 0;

  public monthly_provisioning: number = 0;
  public monthly_baso: number = 0;
  public monthly_approval: number = 0;
  public monthly_total: number = 0;


  constructor(
    public ogpService: OgpService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;

    this.route.params.subscribe(params => {

        this.type = params['type'];
    

        this.ogpService.totalByTypeOrder(this.type).subscribe( data => {

            this.ogps = data;

            var i = 0;
            for(let result of data){
                this.ogps[i]['jum_total'] = Number(result['PROVISIONING_JML']) + Number(result['BASO_JML']) + Number(result['APPROVAL_JML']) ;

                this.jum_provisioning += Number(result['PROVISIONING_JML']);
                this.jum_baso += Number(result['BASO_JML']);
                this.jum_approval += Number(result['APPROVAL_JML']);


                this.jum_total += Number(this.ogps[i]['jum_total']);



                this.ogps[i]['otc_total'] = Number(result['PROVISIONING_OTC']) + Number(result['BASO_OTC']) + Number(result['APPROVAL_OTC']) ;

                this.otc_provisioning += Number(result['PROVISIONING_OTC']);
                this.otc_baso += Number(result['BASO_OTC']);
                this.otc_approval += Number(result['APPROVAL_OTC']);


                this.otc_total += Number(this.ogps[i]['otc_total']);



                this.ogps[i]['monthly_total'] = Number(result['PROVISIONING_MONTHLY']) + Number(result['BASO_MONTHLY']) + Number(result['APPROVAL_MONTHLY']) ;

                this.monthly_provisioning += Number(result['PROVISIONING_MONTHLY']);
                this.monthly_baso += Number(result['BASO_MONTHLY']);
                this.monthly_approval += Number(result['APPROVAL_MONTHLY']);


                this.monthly_total += Number(this.ogps[i]['monthly_total']);

                i++;
            } 
            
            this.loading = false;
        })
    });
  }

}
