import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectChannelService } from '../../_services/project-channel.service';

import { Http, Headers, RequestOptions, Response }  from '@angular/http';

@Component({
  selector: 'app-project-channel-tender',
  template: `

<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    Project Channel
    <small>Tender</small>
  </h1>
  <ol class="breadcrumb">
    <li><a href="#"><i class="fa fa-dashboard"></i> Project Channel</a></li>
    <li class="active">Tender</li>
  </ol>
</section>


<!-- Main content -->
<section class="content">


  <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Project Channel Tender</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
            
                <img *ngIf="loading" style="position: absolute; top:10px; left:10px;" src="assets/img/loading.gif" />


                <div class="row">
                    <div class="col-xs-3">
                    
                        <div class="form-group">
                            <label for="exampleInputEmail1">YEAR</label>

                            <select class="form-control" [(ngModel)]="year" (change)="getData()">
                               <option value="2019">2019</option>
                               <option value="2018">2018</option>
                            </select>
                        </div>

                    </div>
                    <div class="col-xs-3">
                    
                        <div class="form-group">
                            <label for="exampleInputEmail1">MONTH</label>

                            <select class="form-control" [(ngModel)]="month" (change)="getData()">
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">Maret</option>
                                <option value="4">April</option>
                                <option value="5">Mei</option>
                                <option value="6">Juni</option>
                                <option value="7">Juli</option>
                                <option value="8">Agustus</option>
                                <option value="9">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="col-xs-6">
                        
                    </div>
                </div>

                <hr/>


                <h3>Import from Excel</h3>

                <div style="overflow-x: scroll;">
                    <img src="assets/img/excel_project_tender.jpg">
                </div>
    
                
                <input class="form-control" type="file" #fileInput /> <!-- (change)="upload()" -->
                <br/>
                <button type="submit" class="btn btn-primary" (click)="upload()">Upload</button>
                <hr/>

            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>

                            <th>CUSTOMER NAME</th>
                            <th>KODE LELANG</th>
                            <th>JUDUL LELANG</th>
                            <th>AM</th>
                            <th>STATUS TENDER</th>
                            <th>SPBJ</th>
                            <th>TANGGAL</th>
                            <th>NILAI HPS</th>
                            <th>NILAI SUBMIT</th>
                            <th>R/S</th>
                            <th>KETERANGAN</th>
                            <th>STATUS PROJECT CHANNEL</th>
                            <th>TREG</th>
                            <th>CUSTOMER ID</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of data" class="td-click">

                            <td>{{ item.CUSTOMER_NAME }}</td>
                            <td>{{ item.KODE }}</td>
                            <td>{{ item.NAME }}</td>
                            <td>{{ item.AM }}</td>
                            <td>{{ item.STATUS_TRANSAKSI }}</td>
                            <td>{{ item.SPBJ }}</td>
                            <td>{{ item.TANGGAL }}</td>
                            <td>{{ item.TOTAL_HARGA }}</td>
                            <td>{{ item.TOTAL_NILAI_TRANSAKSI }}</td>
                            <td>{{ item.R_S }}</td>
                            <td>{{ item.KETERANGAN }}</td>
                            <td>{{ item.STATUS_PROJECT_CHANNEL }}</td>
                            <td>{{ item.TREG }}</td>
                            <td>{{ item.CUSTOMER_ID }}</td>
                            
                        </tr>
                    </tbody>
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
  
   

  `]
})
export class ProjectChannelTenderComponent implements OnInit {

  private loading: Boolean = false;

  private year:number;
  private month:number;

  public data: any;



  @ViewChild('fileInput') inputEl: ElementRef;
  public file_url: string;

  constructor(
    public projectChannelService: ProjectChannelService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
    private http: Http,
  ) { }

  ngOnInit() {

    var d = new Date();
    this.month = d.getMonth()+1;
    this.year = d.getFullYear();

    if(this.month == 1) {
      this.year = this.year - 1;
      this.month = 12;
    }

    
    this.getData();
  }

  getData() {
    this.loading = true;

    this.projectChannelService.getTender(this.year, this.month)
        .subscribe(data => { 
            this.data = data;

            this.loading = false;
        })
  }




     upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let formData = new FormData();

        formData.append("file", inputEl.files.item(0));

        this.projectChannelService.uploadXls(formData, this.year, this.month, 4)
                .subscribe(result => {
                    this.inputEl.nativeElement.value = "";

                    this.getData();
                });
        }


}
