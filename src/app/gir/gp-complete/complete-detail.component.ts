import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompleteService } from '../../_services/complete.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-complete-detail',
  template: `

  <div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      Complete
      <small>Detail</small>
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
      <li><a href="#"><i class="fa fa-dashboard"></i> Complete</a></li>
      <li class="active">Detail</li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">


  <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">{{ treg }} | {{ type }}</h3>
                <div class="box-tools">
                    <button type="button" (click)="exportXLSX()" class="btn btn-block btn-default btn-xs"><i class="fa fa-download"></i> Export</button>
                </div>


                <br/>
                <hr/>
                <div clas="row">
                  <div class="col-md-4"><input type="text" class="form-control form-control" [(ngModel)]="orderIdSearch" placeholder="ORDER ID"></div>
                  <div class="col-md-4"><input type="text" class="form-control form-control" [(ngModel)]="sidSearch" placeholder="SID"></div>
                  <div class="col-md-4"><input type="text" class="form-control form-control" [(ngModel)]="amSearch" placeholder="AM"></div>
                </div>

            </div>
            <!-- /.box-header -->
            <div class="box-body">
            
                <img *ngIf="loading" style="position: absolute; top:10px; left:10px;" src="assets/img/loading.gif" />
                <div class="table-responsive">
                    <table class="table table-bordered table-striped"
                    [mfData]="data | ogpFilter: orderIdSearch:sidSearch:amSearch" #mf="mfDataTable"
                    [mfRowsOnPage]="10"
                    >
                    <thead>
                        <tr> 
                            <th>NO</th>
                            <th>LI_SID</th>
                            <th>ORDER_ID</th>
                            <th>ORDER_CREATED_DATE</th>
                            <th>ORDER_CREATEDBY_NAME</th>
                            <th>ORDER_DESCRIPTION</th>
                            <th>ORDER_SUBTYPE</th>
                            <th>PREVORDER</th>
                            <th>AGREE_ITEMNUM</th>
                            <th>AGREE_NAME</th>
                            <th>AGREE_TYPE</th>
                            <th>AGREE_START_DATE</th>
                            <th>AGREE_END_DATE</th>
                            <th>LI_PRODUCTID</th>
                            <th>LI_PRODUCT_NAME</th>
                            <th>LI_PRODPARTNUM</th>
                            <th>LI_MONTHLY_PRICE</th>
                            <th>LI_OTC_PRICE</th>
                            <th>CURRENCY</th>
                            <th>LI_BANDWIDTH</th>
                            <th>LI_CREATED_DATE</th>
                            <th>LI_CREATEDBY</th>
                            <th>LI_BILLDATE</th>
                            <th>LI_BILLING_START_DATE</th>
                            <th>LI_STATUS</th>
                            <th>LI_STATUS_DATE</th>
                            <th>LI_MILESTONE</th>
                            <th>LI_MILESTONE_DATE</th>
                            <th>LI_FULFILLMENT_STATUS</th>
                            <th>LI_PAYMENT_TERM</th>
                            <th>LAST_UPDATE</th>
                            <th>PRODUCT_ACTIVATION_DATE</th>
                            <th>PROVCOM_DATE</th>
                            <th>LINE_ITEM_DESCRIPTION</th>
                            <th>AGREE_CREATEDBY_NAME</th>
                            <th>LI_CREATEDBY_NAME</th>
                            <th>AM</th>
                            <th>AGREEITEMNUMM</th>
                            <th>AGREENAME</th>
                            <th>AGREETYPE</th>
                            <th>AGREESTATUSDATE</th>
                            <th>AGREECREATEDDATE</th>
                            <th>AGREECREATEDBY</th>
                            <th>CUSTACCNTNUM</th>
                            <th>CUSTACCNTNAME</th>
                            <th>CUST_REGION</th>
                            <th>CUST_WITEL</th>
                            <th>CUST_SEGMEN</th>
                            <th>CUST_ACC_STATUS</th>
                            <th>NIPNAS</th>
                            <th>SOLD_WIL_ID</th>
                            <th>BILLACCNTNUM</th>
                            <th>BILLACCNTNAME</th>
                            <th>BILL_REGION</th>
                            <th>BILL_WITEL</th>
                            <th>BILLACCNTSTATUS</th>
                            <th>TAXNUMBER</th>
                            <th>ACCOUNTNAS</th>
                            <th>BILL_WIL_ID</th>
                            <th>SERVACCNTNUM</th>
                            <th>SERVACCNTNAME</th>
                            <th>SERVICE_REGION</th>
                            <th>SERVICE_WITEL</th>
                            <th>SERVICE_SEGMENT</th>
                            <th>SERVACCNTSTATUS</th>
                            <th>SERVICE_WIL_ID</th>
                            <th>FULFLMNT_ITEM_CODE</th>
                            <th>BILLING_TYPE_CD</th>
                            <th>PRICE_TYPE_CD</th>
                            <th>CHANGE_REASON_CD</th>
                            <th>ACCOUNT_NUM</th>
                            <th>CUSTOMER_REF</th>
                            <th>ACCOUNT_NAME</th>
                            <th>BA_TIBS</th>
                            <th>BA_LOCK</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of mf.data; let i = index" class="td-click">
                            <td>{{ data.indexOf(item) + 1 }}</td>
                            <td>{{ item.LI_SID }}</td>
                            <td>{{ item.ORDER_ID }}</td>
                            <td>{{ item.ORDER_CREATED_DATE }}</td>
                            <td>{{ item.ORDER_CREATEDBY_NAME }}</td>
                            <td>{{ item.ORDER_DESCRIPTION }}</td>
                            <td>{{ item.ORDER_SUBTYPE }}</td>
                            <td>{{ item.PREVORDER }}</td>
                            <td>{{ item.AGREE_ITEMNUM }}</td>
                            <td>{{ item.AGREE_NAME }}</td>
                            <td>{{ item.AGREE_TYPE }}</td>
                            <td>{{ item.AGREE_START_DATE }}</td>
                            <td>{{ item.AGREE_END_DATE }}</td>
                            <td>{{ item.LI_PRODUCTID }}</td>
                            <td>{{ item.LI_PRODUCT_NAME }}</td>
                            <td>{{ item.LI_PRODPARTNUM }}</td>
                            <td>{{ item.LI_MONTHLY_PRICE }}</td>
                            <td>{{ item.LI_OTC_PRICE }}</td>
                            <td>{{ item.CURRENCY }}</td>
                            <td>{{ item.LI_BANDWIDTH }}</td>
                            <td>{{ item.LI_CREATED_DATE }}</td>
                            <td>{{ item.LI_CREATEDBY }}</td>
                            <td>{{ item.LI_BILLDATE }}</td>
                            <td>{{ item.LI_BILLING_START_DATE }}</td>
                            <td>{{ item.LI_STATUS }}</td>
                            <td>{{ item.LI_STATUS_DATE }}</td>
                            <td>{{ item.LI_MILESTONE }}</td>
                            <td>{{ item.LI_MILESTONE_DATE }}</td>
                            <td>{{ item.LI_FULFILLMENT_STATUS }}</td>
                            <td>{{ item.LI_PAYMENT_TERM }}</td>
                            <td>{{ item.LAST_UPDATE }}</td>
                            <td>{{ item.PRODUCT_ACTIVATION_DATE }}</td>
                            <td>{{ item.PROVCOM_DATE }}</td>
                            <td>{{ item.LINE_ITEM_DESCRIPTION }}</td>
                            <td>{{ item.AGREE_CREATEDBY_NAME }}</td>
                            <td>{{ item.LI_CREATEDBY_NAME }}</td>
                            <td>{{ item.AM }}</td>
                            <td>{{ item.AGREEITEMNUMM }}</td>
                            <td>{{ item.AGREENAME }}</td>
                            <td>{{ item.AGREETYPE }}</td>
                            <td>{{ item.AGREESTATUSDATE }}</td>
                            <td>{{ item.AGREECREATEDDATE }}</td>
                            <td>{{ item.AGREECREATEDBY }}</td>
                            <td>{{ item.CUSTACCNTNUM }}</td>
                            <td>{{ item.CUSTACCNTNAME }}</td>
                            <td>{{ item.CUST_REGION }}</td>
                            <td>{{ item.CUST_WITEL }}</td>
                            <td>{{ item.CUST_SEGMEN }}</td>
                            <td>{{ item.CUST_ACC_STATUS }}</td>
                            <td>{{ item.NIPNAS }}</td>
                            <td>{{ item.SOLD_WIL_ID }}</td>
                            <td>{{ item.BILLACCNTNUM }}</td>
                            <td>{{ item.BILLACCNTNAME }}</td>
                            <td>{{ item.BILL_REGION }}</td>
                            <td>{{ item.BILL_WITEL }}</td>
                            <td>{{ item.BILLACCNTSTATUS }}</td>
                            <td>{{ item.TAXNUMBER }}</td>
                            <td>{{ item.ACCOUNTNAS }}</td>
                            <td>{{ item.BILL_WIL_ID }}</td>
                            <td>{{ item.SERVACCNTNUM }}</td>
                            <td>{{ item.SERVACCNTNAME }}</td>
                            <td>{{ item.SERVICE_REGION }}</td>
                            <td>{{ item.SERVICE_WITEL }}</td>
                            <td>{{ item.SERVICE_SEGMENT }}</td>
                            <td>{{ item.SERVACCNTSTATUS }}</td>
                            <td>{{ item.SERVICE_WIL_ID }}</td>
                            <td>{{ item.FULFLMNT_ITEM_CODE }}</td>
                            <td>{{ item.BILLING_TYPE_CD }}</td>
                            <td>{{ item.PRICE_TYPE_CD }}</td>
                            <td>{{ item.CHANGE_REASON_CD }}</td>
                            <td>{{ item.ACCOUNT_NUM }}</td>
                            <td>{{ item.CUSTOMER_REF }}</td>
                            <td>{{ item.ACCOUNT_NAME }}</td>
                            <td>{{ item.BA_TIBS }}</td>
                            <td>{{ item.BA_LOCK }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="7">
                                <mfBootstrapPaginator [rowsOnPageSet]="[10,50,100]"></mfBootstrapPaginator>
                            </td>
                        </tr>
                    </tfoot>
                    </table>
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
  
    td, th {
        text-align: center;
    }

  `]
})
export class CompleteDetailComponent implements OnInit {


  private loading: Boolean = false;

  // public completes: any;
  public treg = '';
  public type = '';
  public status = '';


  public data: any;


  constructor(
    public completeService: CompleteService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;

    this.route.params.subscribe(params => {

        this.treg = params['treg'];
        this.type = params['type'];
        this.status = params['status'];
    
        this.completeService.detailByTypeOrder(this.treg, this.type, this.status).subscribe( data => {

            this.data = data;
            
            this.loading = false;
        })
    });
  }



  
  
  /** 
   * ------------------------------------------------
   * Export Excel
   * ------------------------------------------------
   * 
   */
  exportXLSX() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, 'export-data-ogp.xlsx');
  }


}
