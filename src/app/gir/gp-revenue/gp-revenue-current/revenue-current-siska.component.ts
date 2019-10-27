import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RevenueService } from '../../../_services/revenue.service';

import { Http, Headers, RequestOptions, Response }  from '@angular/http';

@Component({
  selector: 'app-revenue-current-siska',
  template: `


<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      Siska
      <small>Upload</small>
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> Siska</a></li>
      <li class="active">Upload</li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">

    



  <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Form Current Month Siska</h3>
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
                <ul>
                    <li>NIPNAS GROUP / CUSTOMER ID</li>
                    <li>YEAR</li>
                    <li>MONTH</li>
                    <li>REVENUE</li>
                </ul>

                <img src="assets/img/excel_siska.jpg">
                <br/><br/>
    
    <!--
                <input type="file" (change)="fileChange($event)" placeholder="Upload file" accept=".xls,.xlsx,.csv">
    
                <hr/>

                <form (ngSubmit)="onSubmit()">
                    <input type="file" accept=".xls,.xlsx,.csv" #avatar>
                    <input type="submit" id="submit" value="Submit" />
                </form>
                <hr/>
-->

                <input class="form-control" type="file" #fileInput /> <!-- (change)="upload()" -->
                <br/>
                <button type="submit" class="btn btn-primary" (click)="upload()">Upload</button>
                <hr/>



                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th width="80">TREG</th>
                            <th>WITEL</th>
                            <th>CUSTOMER</th>
                            <th>REVENUE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of data" class="td-click">
                            <td>{{ item.TREG }}</td>
                            <td>{{ item.WITEL_NAME }}</td>
                            <td>{{ item.CUSTOMER_NAME }}</td>
                            <td>{{ item.REVENUE }}</td>
                        </tr>
                    </tbody>
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
  
   

  `]
})
export class RevenueCurrentSiskaComponent implements OnInit {

  private loading: Boolean = false;

  private year:number;
  private month:number;

  public data: any;



  @ViewChild('fileInput') inputEl: ElementRef;
  public file_url: string;

  constructor(
    public revenueService: RevenueService,
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

    this.revenueService.getInterimSiska(this.year, this.month)
        .subscribe(data => { 
            this.data = data;

            this.loading = false;
        })
  }



  /*

    fileChange(event:any) {

        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            const file = fileList[0];
            const formData = new FormData();

            formData.append('file', file, file.name);
            
            this.revenueService.uploadXlsSiska(formData, this.year, this.month)
                .subscribe( data => {

                   this.getData();
                    
                });
        }
    }


    @ViewChild('avatar') avatar: ElementRef;

    onSubmit() {      
        const formData = new FormData();
        formData.append('file', 
                        this.avatar.nativeElement.files[0], 
                        this.avatar.nativeElement.files[0].name);

        const headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        this.http.post('http://localhost:7777/dashboardLGS/api/RevenueController/store_siska_excel/'+this.year+'/'+this.month, formData, {headers: headers})
            .subscribe(
                (response) => {
                },
                (error) => {
                }                   
             );
     }


     */




     upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let formData = new FormData();

        formData.append("file", inputEl.files.item(0));

        this.revenueService.uploadXlsSiska(formData, this.year, this.month)
                .subscribe(result => {
                    this.inputEl.nativeElement.value = "";
                });
        }


}
