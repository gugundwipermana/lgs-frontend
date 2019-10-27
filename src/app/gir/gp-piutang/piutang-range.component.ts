import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PiutangService } from '../../_services/piutang.service';

import { Http, Headers, RequestOptions, Response }  from '@angular/http';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-piutang-range',
  template: `

  <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Piutang Range</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
            
                <img *ngIf="loading" style="position: absolute; top:10px; left:10px;" src="assets/img/loading.gif" />


                <div class="row">
                    <div class="col-xs-2">
                    
                        <div class="form-group">
                            <label for="exampleInputEmail1">START YEAR</label>

                            <select class="form-control" [(ngModel)]="year_start" (change)="getData()">
                               <option value="2019">2019</option>
                               <option value="2018">2018</option>
                            </select>
                        </div>

                    </div>
                    <div class="col-xs-3">
                    
                        <div class="form-group">
                            <label for="exampleInputEmail1">START MONTH</label>

                            <select class="form-control" [(ngModel)]="month_start" (change)="getData()">
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


                    <div class="col-xs-1">
                    
                    </div>
                    

                    <div class="col-xs-2">
                    
                        <div class="form-group">
                            <label for="exampleInputEmail1">END YEAR</label>

                            <select class="form-control" [(ngModel)]="year_end" (change)="getData()">
                               <option value="2019">2019</option>
                               <option value="2018">2018</option>
                            </select>
                        </div>

                    </div>
                    <div class="col-xs-3">
                    
                        <div class="form-group">
                            <label for="exampleInputEmail1">END MONTH</label>

                            <select class="form-control" [(ngModel)]="month_end" (change)="getData()">
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


                    
                    <div class="col-xs-1">

                        <div class="form-group">
                            <label for="exampleInputEmail1"></label>

                            <button type="button" (click)="exportXLSX()" class="btn btn-block btn-default btn-xs"><i class="fa fa-download"></i> Export</button>
                        </div>
                    </div>

                </div>

                <hr/>

            <div style="overflow-x: scroll;">

                <table class="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>BP NUM</th>
                          <th>ACCOUNT</th>
                          <th width="400" style="min-width:400px;">ADDRESS</th>
                          <th>TREG</th>
                          <th>WITEL</th>                
                          <th>PIC</th>

                          <th *ngFor="let item_month of range">{{ item_month }}</th>

                          <th>TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr *ngFor="let item of data" class="td-click">
                            <td>{{ item.BP_NUM }}</td>
                            <td>{{ item.ACCOUNT }}</td>
                            <td>{{ item.ADDRESS }}</td>
                            <td>{{ item.TREG }}</td>
                            <td>{{ item.WITEL }}</td>
                            <td>{{ item.PIC }}</td>

                            <td *ngFor="let item_month of range">{{ item[item_month] }}</td>
                            
                            <td>{{ item.TOTAL }}</td>
                        </tr>
                      </tbody>
                </table>
            </div>


            </div>
        </div>
    </div>
    </div>


  `,
  styles: [`
  
   

  `]
})
export class PiutangRangeComponent implements OnInit {

  private loading: Boolean = false;

  private year_start:number;
  private month_start:number;

  private year_end:number;
  private month_end:number;

  public data: any;
  public range: any;

  constructor(
    public piutangService: PiutangService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
    private http: Http,
  ) { }

  ngOnInit() {

    var d = new Date();
    this.month_start = d.getMonth()+1;
    this.year_start = d.getFullYear();

    this.month_end = d.getMonth()+1;
    this.year_end = d.getFullYear();

    if(this.month_start == 1) {
        this.year_start = this.year_start - 1;
        this.month_start = 12;
    }

    if(this.month_end == 1) {
        this.year_end = this.year_end - 1;
        this.month_end = 12;
    }

    
    this.getData();
  }

  getData() {
    console.log("get Data");


    this.piutangService.getRange(this.year_start, this.month_start, this.year_end, this.month_end)
        .subscribe(data => {
            this.data = data['datas'];

            this.range = data['ranges'];


            console.log(this.data);
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
    XLSX.writeFile(workbook, 'export-data-piutang.xlsx');
  }




}
