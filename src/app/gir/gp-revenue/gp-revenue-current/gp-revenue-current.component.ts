import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../_services/shared.service';

import * as XLSX from 'xlsx';
import { InterimService } from '../../../_services/interim.service';

@Component({
  selector: 'app-gp-revenue-current',
  templateUrl: './gp-revenue-current.component.html',
  styleUrls: ['./gp-revenue-current.component.css']
})
export class GpRevenueCurrentComponent implements OnInit {

  public loading:boolean = false;
  public data: any = [];

  public month: number;
  public year: number;

  public valueFilter: any = [];

  constructor(
    public sharedService: SharedService,
    public interimService: InterimService,
  ) { }

  ngOnInit() {
    this.sharedService.emitChange('Current');

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





  private tregSearch: string;
  private witelSearch: string;
  private amSearch: string;
  private customerSearch: string;

  public filterTreg(treg: any):void {
    if (treg == 'ALL') treg = '';
    
    this.tregSearch = treg;
    this.witelSearch = '';
    this.amSearch = '';
    this.customerSearch = '';
  }
  
  public filterWitel(witel: any):void {
    if (witel == 'ALL') witel = '';
    
    this.witelSearch = witel;
    this.amSearch = '';
    this.customerSearch = '';
  }
  
  public filterAm(am: any):void {
    if (am == 'ALL') am = '';
    
    this.amSearch = am;
    this.customerSearch = '';
  }

  public filterCustomer(customer: any):void {
    if (customer == 'ALL') customer = '';
    
    this.customerSearch = customer;
  }

}
