import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../_services/account.service';
import { SharedService } from '../../../_services/shared.service';

@Component({
  selector: 'app-gp-mapping-account',
  templateUrl: './gp-mapping-account.component.html',
  styleUrls: ['./gp-mapping-account.component.css']
})
export class GpMappingAccountComponent implements OnInit {

  public sumAccountPerTregs: any;

  public data: any[] = [];
  public treg:string;

  /** Total */
  public total_customer: number = 0;
  public total_nipnas: number = 0;
  public total_account: number = 0;

  public search:string = '';

  constructor(
    public accountService: AccountService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.sharedService.emitChange('Account');

    this.countAccountPerTreg();
    this.getAccountByTreg('ALL');
  }

  countAccountPerTreg() {
    // this.loading = true;
    this.accountService.countByTreg()
      .subscribe(data => {
        this.sumAccountPerTregs = data;

        for(let result of data){
          this.total_customer += Number(result['CUSTOMER']);
          this.total_nipnas += Number(result['NIPNAS']);
          this.total_account += Number(result['ACCOUNT']);
        }

        // this.loading = false;
      })
  }

  getAccountByTreg(treg) {
    // this.loading = true;

    this.treg = treg;

    this.data = [];
    this.accountService.getByTreg(this.treg)
        .subscribe(data=> {
            this.data = data;
            // this.loading = false;
        })
  }

  searchAccount() {

    if(this.search == '') {
      this.search = 'ALL';
    }

    this.data = [];
    this.accountService.search(this.search)
      .subscribe(data => {
        this.data = data;

      })
  }

  getAll() {
    this.getAccountByTreg('ALL');
  }

}
