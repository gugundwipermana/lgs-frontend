import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-mapping-account',
  templateUrl: './mapping-account.component.html',
  styleUrls: ['./mapping-account.component.css']
})
export class MappingAccountComponent implements OnInit {

  public loading:boolean = false;

  public sumAccountPerTregs: any;
  
  constructor(
    public accountService: AccountService
  ) { }

  ngOnInit() {
    this.countAccountPerTreg();
  }

  
  countAccountPerTreg() {
    this.loading = true;
    this.accountService.countByTreg()
      .subscribe(data => {
        this.sumAccountPerTregs = data;
        this.loading = false;
      })
  }


}
