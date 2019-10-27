import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LopService } from '../../_services/lop.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lop-detail',
  template: `

  <div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      LOP
      <small>Detail</small>
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> LOP</a></li>
      <li class="active">Detail</li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">



  <div class="row">
  <div class="col-md-12">
      <div class="box box-primary">
          <div class="box-header with-border">
              <h3 class="box-title">LOP Detail</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
          
              <img *ngIf="loading" style="position: absolute; top:10px; left:10px;" src="assets/img/loading.gif" />

              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td>TREG</td>
                    <td>{{ data.TREG }}</td>
                  </tr>
                  <tr>
                    <td>WITEL</td>
                    <td>{{ data.WITEL_NAME }}</td>
                  </tr>
                  <tr>
                    <td>CUSTOMER</td>
                    <td>{{ data.CUSTOMER_NAME }}</td>
                  </tr>
                  <tr>
                    <td>PROJECT NAME</td>
                    <td>{{ data.NAME }}</td>
                  </tr>
                  <tr>
                    <td>PIC</td>
                    <td>{{ data.PIC }}</td>
                  </tr>
                </tbody>
              </table>

              <br/>
              <hr/>
              <br/>

                <div class="row">
                  <div class="col-xs-6">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>DOKUMEN</th>
                          <th>OK</th>
                          <th>NOK</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>KB</td>
                          <td *ngIf="data.KB == 1">Y</td><td *ngIf="data.KB != 1"></td>
                          <td *ngIf="data.KB == 1"></td><td *ngIf="data.KB != 1">Y</td>
                        </tr>
                        <tr>
                          <td>KL</td>
                          <td *ngIf="data.KL == 1">Y</td><td *ngIf="data.KL != 1"></td>
                          <td *ngIf="data.KL == 1"></td><td *ngIf="data.KL != 1">Y</td>
                        </tr>
                        <tr>
                          <td>BAST</td>
                          <td *ngIf="data.BAST == 1">Y</td><td *ngIf="data.BAST != 1"></td>
                          <td *ngIf="data.BAST == 1"></td><td *ngIf="data.BAST != 1">Y</td>
                        </tr>
                        <tr>
                          <td>BASO/td>
                          <td *ngIf="data.BASO == 1">Y</td><td *ngIf="data.BASO != 1"></td>
                          <td *ngIf="data.BASO == 1"></td><td *ngIf="data.BASO != 1">Y</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-xs-6">
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td>NILAI KONTRAK</td>
                          <td>{{ data.CONTRACT_VALUE }}</td>
                        </tr>
                        <tr>
                          <td>NILAI REVENUE CURRENT MONTH</td>
                          <td>{{ data.CURRENT_MONTH_REVNUE }}</td>
                        </tr>
                        <tr>
                          <td>MITRA</td>
                          <td>{{ data.MITRA_ID }}</td>
                        </tr>
                        <tr>
                          <td>NOMOR ORDER</td>
                          <td>{{ data.ORDER_ID }}</td>
                        </tr>
                        <tr>
                          <td>STATUS</td>
                          <td>{{ data.ORDER_STATUS }}</td>
                        </tr>
                        <tr>
                          <td>PROGRESS DELIVERY</td>
                          <td>{{ data.PROGRESS_DELIVERY }}</td>
                        </tr>
                        <tr>
                          <td>PROGRESS DOKUMEN</td>
                          <td>{{ data.PROGRESS_DOCUMNET }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>

          </div>
      </div>
  </div>
  </div>


  
  </section>
  <!-- /.content -->
</div>


  `,
  styles: [`
  
   
  `]
})
export class LopDetailComponent implements OnInit {


  private loading: Boolean = false;

  public data: any;

  public id:number;


  constructor(
    public lopService: LopService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {

    this.loading = true;

    this.route.params.subscribe(params => {

      this.id = params['id'];
  
      this.lopService.getById(this.id).subscribe( data => {

          this.data = data;
          
          this.loading = false;
      })
    });
  }


}
