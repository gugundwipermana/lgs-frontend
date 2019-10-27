import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-gp-user',
  templateUrl: './gp-user.component.html',
  styleUrls: ['./gp-user.component.css']
})
export class GpUserComponent implements OnInit {

  public loading: boolean = false;
  public users: User[] = [];
  public user: User = new User;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getData();
  }

  
  getData() {
    this.loading = true;
    this.userService.getAll()
      .subscribe(data => {
        this.users = data;
        this.loading = false;
      })
  }

  

  save() {
    this.loading = true;

    this.userService.save(this.user)
      .subscribe(data=> {
        this.getData();
      })
  }

  delete(id) {
    this.loading = true;
    
    this.userService.delete(id)
      .subscribe(data=> {
        this.getData();
      })
  }






  
  /** 
   * ------------------------------------------------
   * Export Excel
   * ------------------------------------------------
   * 
   */
  exportXLSX() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, 'export-data-user.xlsx');
  }


}
