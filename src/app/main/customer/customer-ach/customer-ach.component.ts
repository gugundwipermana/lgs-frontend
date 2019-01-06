import { Component, OnInit } from '@angular/core';
import { RevenueService } from '../../../_services/revenue.service';
import { ActivatedRoute } from '@angular/router';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customer-ach',
  templateUrl: './customer-ach.component.html',
  styleUrls: ['./customer-ach.component.css']
})
export class CustomerAchComponent implements OnInit {

  private loading: Boolean = false;

  public data: any;

  public year: number;
  public start_month: number = 1;
  public end_month: number;

  constructor(
    public revenueService: RevenueService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    var d = new Date();
    this.end_month = d.getMonth()+1;
    this.year = d.getFullYear();

    if(this.end_month == 1) {
      this.year = this.year - 1;
      this.end_month = 12;
    }

    this.route.params.subscribe(params => {
      
	    if(params['year'] != undefined) {

        this.year = params['year'];
        this.start_month = params['start_month'];
        this.end_month = params['end_month'];
        }
	  });

    this.getData();
  }

  
  getData() {
    this.loading = true;
    this.data = [];
    this.revenueService.getPerAm(this.year, this.start_month, this.end_month)
      .subscribe(data=> {
        this.data = data;

        this.loading = false;
      })
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
    XLSX.writeFile(workbook, 'export-data-revenue.xlsx');
  }


}
