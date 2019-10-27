import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PiutangService } from '../../_services/piutang.service';

import { Http, Headers, RequestOptions, Response }  from '@angular/http';

@Component({
  selector: 'app-piutang-koreksi',
  template: `

  
<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    Piutang
    <small>Koreksi</small>
  </h1>
  <ol class="breadcrumb">
    <li><a href="#"><i class="fa fa-dashboard"></i> Piutang</a></li>
    <li class="active">Koreksi</li>
  </ol>
</section>

<!-- Main content -->
<section class="content">


  <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Piutang Koreksi</h3>
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
                    <img src="assets/img/excel_koreksi.jpg">
                </div>
    
                
                <input class="form-control" type="file" #fileInput /> <!-- (change)="upload()" -->
                <br/>
                <button type="submit" class="btn btn-primary" (click)="upload()">Upload</button>
                <hr/>

            



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
export class PiutangKoreksiComponent implements OnInit {

  private loading: Boolean = false;

  private year:number;
  private month:number;

  public data: any;



  @ViewChild('fileInput') inputEl: ElementRef;
  public file_url: string;

  constructor(
    public piutangService: PiutangService,
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
    
  }




     upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let formData = new FormData();

        formData.append("file", inputEl.files.item(0));

        this.piutangService.uploadXlsKoreksi(formData, this.year, this.month)
                .subscribe(result => {
                    this.inputEl.nativeElement.value = "";

                    this.getData();

                });
        }


}
