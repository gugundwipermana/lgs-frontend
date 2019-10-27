import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OgpService } from '../../_services/ogp.service';

import { Http, Headers, RequestOptions, Response }  from '@angular/http';

@Component({
  selector: 'app-order-not-valid',
  template: `

  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Order Not Valid
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Order Not Valid</li>
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

                <h3>Import from Excel</h3>
                <ul>
                    <li>ORDER ID</li>
                </ul>

                <img src="assets/img/excel_order_not_valid.jpg">
                <br/><br/>

                <input class="form-control" type="file" (change)="upload()" #fileInput />
                <hr/>



                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ORDER ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of data" class="td-click">
                            <td>{{ item.ID }}</td>
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
export class OrderNotValidComponent implements OnInit {

  private loading: Boolean = false;

  public data: any;



  @ViewChild('fileInput') inputEl: ElementRef;
  public file_url: string;

  constructor(
    public ogpService: OgpService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
    private http: Http,
  ) { }

  ngOnInit() {
    
    this.getData();
  }

  getData() {
    this.loading = true;

    this.ogpService.orderNotValid()
        .subscribe(data => { 
            this.data = data;

            this.loading = false;
        })
  }


     upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let formData = new FormData();

        formData.append("file", inputEl.files.item(0));

        this.ogpService.uploadOrderNotValidXls(formData)
                .subscribe(result => {

                    this.getData();
                    this.inputEl.nativeElement.value = "";
                    
                });
        }


}
