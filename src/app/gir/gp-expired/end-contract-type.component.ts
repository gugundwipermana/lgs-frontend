import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndContractService } from '../../_services/end-contract.service';


@Component({
  selector: 'app-end-contract-type',
  template: `


  <div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      Expired
      <small>Type</small>
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
      <li><a href="#"><i class="fa fa-dashboard"></i> Expired</a></li>
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
                      <th>TREG</th>
                      <th>JUMLAH ORDER</th>
                      <th>OTC (Rp)</th>
                      <th>MONTHLY (Rp)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of endContracts" class="td-click">
                      <td>{{ item.TREG }}</td>
                      <td [routerLink]="['/main', 'complete', 'detail', item.TREG, type, 'BILCOMP']" >{{ item.JUMLAH }}</td>
                      <td class="td-align-right">{{ item.OTC | numberId }}</td>
                      <td class="td-align-right">{{ item.MONTHLY | numberId }}</td>
                    </tr>
                </tbody>
                <tfoot>
                <tr>
                    <th>TOTAL LGS</th>
                    <th>{{ jum_total }}</th>
                    <th class="td-align-right">{{ otc_total | numberId }}</th>
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
export class EndContractTypeComponent implements OnInit {


  private loading: Boolean = false;

  public endContracts: any;
  public type = '';

  public jum_total: number = 0;
  public otc_total: number = 0;
  public monthly_total: number = 0;


  constructor(
    public endContractService: EndContractService,
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
    

        this.endContractService.totalByTypeOrder(this.type).subscribe( data => {

            this.endContracts = data;

            var i = 0;
            for(let result of data){
              this.jum_total +=  Number(result['JUMLAH']);
              this.otc_total +=  Number(result['OTC']);
              this.monthly_total += Number(result['MONTHLY']);

              i++;
            }
            
            this.loading = false;
        })
    });
  }


}
