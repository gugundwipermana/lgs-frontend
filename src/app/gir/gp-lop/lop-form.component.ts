import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LopService } from '../../_services/lop.service';
import { Lop } from '../../_models/lop';

import { TregService } from '../../_services/treg.service';
import { WitelService } from '../../_services/witel.service';
import { CustomerService } from '../../_services/customer.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lop-form',
  template: `

  <div class="row row-dialog">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">Form LOP</h3>

              <div class="pull-right box-tools">
                <button class="btn btn-primary btn-sm" id="btn-save" (click)="save()">Save</button> &nbsp; 
                <button class="btn btn-primary btn-sm" id="btn-update" (click)="update()">Update</button> &nbsp;
                <button class="btn btn-default btn-sm active" type="button" (click)="closeComponent()">Close</button>
              </div>

            </div>
            <!-- /.box-header -->
            <div class="box-body box-body-dialog">









            <div class="nav-tabs-custom">
                <!-- Tabs within a box -->
                <ul class="nav nav-tabs pull-right">
                    <li><a href="#sales-chart" data-toggle="tab">Upload Excel</a></li>
                    <li class="active"><a href="#revenue-chart" data-toggle="tab">Manual</a></li>

                    <li class="pull-left header"><i class="fa fa-inbox"></i> Form</li>
                </ul>
                <div class="tab-content no-padding">
                    <!-- Morris chart - Sales -->
                    <div class="chart tab-pane active" id="revenue-chart">

                        <img *ngIf="loading" style="position: absolute; top:10px; left:10px;" src="assets/img/loading.gif" />
                        

                        
                        <div class="form">
                        <div class="box-body">
                        


                        <input type="hidden" class="form-control" [(ngModel)]="lop.ID">


                        <div class="row">
                            <div class="col-xs-3">
                            
                                <div class="form-group">
                                    <label for="exampleInputEmail1">TREG</label>

                                    <select class="form-control" [(ngModel)]="param_treg" (change)="changeTreg()">
                                        <option *ngFor="let treg of tregs" [value]="treg.ID">{{ treg.ID }}</option>
                                    </select>
                                </div>

                            </div>
                            <div class="col-xs-4">
                            
                                <div class="form-group">
                                    <label for="exampleInputEmail1">WITEL</label>

                                    <select class="form-control" [(ngModel)]="param_witel" (change)="changeWitel()">
                                        <option *ngFor="let witel of witels" [value]="witel.ID">{{ witel.NAME }}</option>
                                    </select>
                                </div>
                                
                            </div>
                            <div class="col-xs-5">
                            
                                <div class="form-group">
                                    <label for="exampleInputEmail1">CUSTOMER</label>

                                    <select class="form-control" [(ngModel)]="lop.CUSTOMER_ID">
                                        <option *ngFor="let customer of customers" [value]="customer.ID">{{ customer.NAME }}</option>
                                    </select>
                                </div>
                                
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">ORDER ID</label>
                                    <input type="text" class="form-control" [(ngModel)]="lop.ORDER_ID">
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">NAME</label>
                                    <input type="text" class="form-control" [(ngModel)]="lop.NAME">
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">CONTRACT VALUE</label>
                                    <input type="text" class="form-control" [(ngModel)]="lop.CONTRACT_VALUE">
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">PRODUCT</label>
                                    <select class="form-control" [(ngModel)]="lop.PRODUCT_ID">
                                        <option *ngFor="let product of products" [value]="product.KODE">{{ product.NAME }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">SOURCE</label>
                                    <select class="form-control" [(ngModel)]="lop.SOURCE_ID">
                                        <option *ngFor="let source of sources" [value]="source.ID">{{ source.NAME }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">MITRA</label>
                                    <select class="form-control" [(ngModel)]="lop.MITRA_ID">
                                        <option *ngFor="let mitra of mitras" [value]="mitra.KODE">{{ mitra.NAME }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">TOTAL REVENUE</label>
                                    <input type="text" class="form-control" [(ngModel)]="lop.TOTAL_REVENUE">
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">CURRENT MONTH REVNUE</label>
                                    <input type="text" class="form-control" [(ngModel)]="lop.CURRENT_MONTH_REVNUE">
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">ORDER STATUS</label>
                                    <input type="text" class="form-control" [(ngModel)]="lop.ORDER_STATUS">
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">PIC</label>
                                    <input type="text" class="form-control" [(ngModel)]="lop.PIC">
                                </div>
                            </div>
                        </div>


                        
                        <div class="row">
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label for="exampleInputEmail1">KB</label>

                                <select class="form-control" [(ngModel)]="lop.KB">
                                    <option value="0">NOK</option>
                                    <option value="1">OK</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label for="exampleInputEmail1">KL</label>

                                <select class="form-control" [(ngModel)]="lop.KL">
                                    <option value="0">NOK</option>
                                    <option value="1">OK</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label for="exampleInputEmail1">BAST</label>

                                <select class="form-control" [(ngModel)]="lop.BAST">
                                    <option value="0">NOK</option>
                                    <option value="1">OK</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label for="exampleInputEmail1">BASO</label>

                                <select class="form-control" [(ngModel)]="lop.BASO">
                                    <option value="0">NOK</option>
                                    <option value="1">OK</option>
                                </select>
                            </div>
                        </div>
                        </div>



                        <div class="row">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label for="exampleInputEmail1">PROGRESS DELIVERY</label>
                                <input type="text" class="form-control" [(ngModel)]="lop.PROGRESS_DELIVERY">
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label for="exampleInputEmail1">PROGRESS DOCUMNET</label>
                                <input type="text" class="form-control" [(ngModel)]="lop.PROGRESS_DOCUMNET">
                            </div>
                        </div>
                        </div>



                        
                    

                        </div>
                    </div> <!-- End form -->
                    
                    
                    </div>
                    <div class="chart tab-pane" id="sales-chart">
                    
                        


                        <h3>Import from Excel</h3>

                        <div class="row">
                            <div class="col-xs-4">
                                <ul>
                                    <li>ORDER_ID</li>
                                    <li>NIPNAS GROUP / CUSTOMER ID</li>
                                    <li>NAME (PROJECT NAME)</li>
                                    <li>CONTRACT VALUE</li>
                                    <li>PRODUCT ID</li>
                                    <li>SOURCE ID</li>
                                    <ul>
                                        <li>1	TSO</li>
                                        <li>2	Tender</li>
                                        <li>3	eKatalog</li>
                                    </ul>
                                </ul>
                            </div>
                            <div class="col-xs-4">
                                <ul>
                                    <li>TOTAL REVENUE</li>
                                    <li>CURRENT MONTH REVNUE</li>
                                    <li>MITRA ID</li>
                                    <li>ORDER STATUS</li>
                                    <li>PIC</li>
                                    <li>KB <i>(1 OK, 0 NOK)</i></li>
                                    <li>KL <i>(1 OK, 0 NOK)</i></li>
                                    <li>BAST <i>(1 OK, 0 NOK)</i></li>
                                    <li>BASO <i>(1 OK, 0 NOK)</i></li>
                                </ul>
                            </div>
                            <div class="col-xs-4">
                                <ul>
                                    <li>PROGRESS DELIVERY</li>
                                    <li>PROGRESS DOCUMNET</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div style="overflow-x: scroll;">
                            <img src="assets/img/excel_lop.jpg">
                        </div>

                        <br/><br/>
                        
                        <input class="form-control" type="file" #fileInput /> <!-- (change)="upload()" -->
                        <br/>
                        <button type="submit" class="btn btn-primary" (click)="upload()">Upload</button>
                        
                    </div>
                </div>
            </div>



            

            




    </div>
    </div>
</div>
</div>


  `,
  styles: [`

     .row-dialog {
        position: fixed;
        top: 60px;
        width: calc(100vw - 50px);
     }

     .box-body-dialog {
        overflow-y: scroll;
        max-height: calc(100vh - 200px);

     }
   
  `]
})
export class LopFormComponent implements OnInit {


  private loading: Boolean = false;

  public lop: Lop = new Lop;
  public mitras: any;
  public products: any;
  public sources: any;

  // for get customer
  public tregs: any;
  public witels: any;
  public customers: any;

  public param_treg: string;
  public param_witel: number;


  @Output() close = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<string>();
  
  @Input() lop_id:boolean;


  
  @ViewChild('fileInput') inputEl: ElementRef;
  public file_url: string;


  constructor(
    public lopService: LopService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,

    public tregService: TregService,
    public witelService: WitelService,
    public customerService: CustomerService,
  ) { }

  ngOnInit() {

    if(this.lop_id != null) {
        // get by id
        this.loading = true;
        this.lopService.getById(this.lop_id)
            .subscribe( data => {
                // this.lop = data;

                if(data != null) {

                    this.param_treg = data['TREG'];
                    this.param_witel = data['WITEL_ID'];

                    this.getCustomerByWitel(this.param_witel);

                    let data_lop = {
                        ID: data['ID'],
                        ORDER_ID: data['ORDER_ID'],
                        CUSTOMER_ID: data['CUSTOMER_ID'],
                        NAME: data['NAME'],
                        CONTRACT_VALUE: data['CONTRACT_VALUE'],
                        PRODUCT_ID: data['PRODUCT_ID'],
                        SOURCE_ID: data['SOURCE_ID'],
                        TOTAL_REVENUE: data['TOTAL_REVENUE'],
                        CURRENT_MONTH_REVNUE: data['CURRENT_MONTH_REVNUE'],
                        MITRA_ID: data['MITRA_ID'],
                        ORDER_STATUS: data['ORDER_STATUS'],
                        PIC: data['PIC'],
                        KB: data['KB'],
                        KL: data['KL'],
                        BAST: data['BAST'],
                        BASO: data['BASO'],
                        PROGRESS_DELIVERY: data['PROGRESS_DELIVERY'],
                        PROGRESS_DOCUMNET: data['PROGRESS_DOCUMNET']
                    }

                    
          
                    this.lop = data_lop;
                    this.loading = false;
                }

                  
            })

        document.getElementById('btn-save').style.visibility = 'hidden';
    } else {
        
        document.getElementById('btn-update').style.visibility = 'hidden';
    }

    this.getMitras();
    this.getProducts();
    this.getSources();

    this.getTreg();
  }


  getMitras() {
    this.loading = true;
    this.lopService.getMitras()
        .subscribe( data => {
            this.mitras = data;
            this.loading = false;
        })
  }

  getProducts() {
    this.loading = true;
    this.lopService.getProducts()
        .subscribe( data => {
            this.products = data;
            this.loading = false;
        })
  }

  getSources() {
    this.loading = true;
    this.lopService.getSources()
        .subscribe( data => {
            this.sources = data;
            this.loading = false;
        })
  }















  /**
   * ---------------------------
   * Customer select...
   * 
   */


  getTreg() {
      this.tregService.getAll()
        .subscribe( data => {
            this.tregs = data;
        })
  }

  getWitelByTreg(treg) {
    this.loading = true;
      this.witelService.getByTreg(treg)
        .subscribe( data => {
            this.witels = data;
            this.loading = false;
        })
  }

  getCustomerByWitel(witel_id) {
    this.loading = true;
      this.customerService.getByWitel(witel_id)
        .subscribe( data => {
            this.customers = data;
            this.loading = false;
        })
  }


  changeTreg() {
    this.getWitelByTreg(this.param_treg);
  }

  changeWitel() {
    this.getCustomerByWitel(this.param_witel);
  }






  
  save() {
    this.loading = true;
    this.lopService.save(this.lop).subscribe(data=> {
        this.resetForm();

        // trigger upodate data
        this.loading = false;
    });
  }

  update() {
    this.loading = true;
    this.lopService.update(this.lop).subscribe(data=> {
        this.resetForm();

        // trigger upodate data
        this.loading = false;
    });
  }

  resetForm() {
    this.lop.ORDER_ID = null;
    this.lop.CUSTOMER_ID = null;
    this.lop.NAME = null;
    this.lop.CONTRACT_VALUE = null;
    this.lop.PRODUCT_ID = null;
    this.lop.SOURCE_ID = null;
    this.lop.TOTAL_REVENUE = null;
    this.lop.CURRENT_MONTH_REVNUE = null;
    this.lop.MITRA_ID = null;
    this.lop.ORDER_STATUS = null;
    this.lop.PIC = null;
    this.lop.KB = null;
    this.lop.KL = null;
    this.lop.BAST = null;
    this.lop.BASO = null;
    this.lop.PROGRESS_DELIVERY = null;
    this.lop.PROGRESS_DOCUMNET = null;

    this.refresh.emit();
  }


  closeComponent() {
    this.close.emit();
  }




  



    upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let formData = new FormData();

        formData.append("file", inputEl.files.item(0));

        this.lopService.uploadXls(formData)
                .subscribe(result => {
                    this.resetForm();

                    // trigger upodate data
                    this.loading = false;
                    this.inputEl.nativeElement.value = "";
                });
        }




}
