import { Component, OnInit } from '@angular/core';
import { InterimService } from '../../../_services/interim.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-revenue-current',
  templateUrl: './revenue-current.component.html',
  styleUrls: ['./revenue-current.component.css']
})
export class RevenueCurrentComponent implements OnInit {

  public loading:boolean = false;
  public data: any = [];

  public month: number;
  public year: number;

  public valueFilter: any = [];

  constructor(
    public interimService: InterimService
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
    this.data = [];

    this.interimService.getData(this.year, this.month)
      .subscribe(data => {
        this.data = data;
        this.loading = false;
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
    XLSX.writeFile(workbook, 'export-data-revenue.xlsx');
  }

}
