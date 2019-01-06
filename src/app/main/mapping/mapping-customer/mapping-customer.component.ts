import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { Customer } from '../../../_models/customer';

@Component({
  selector: 'app-mapping-customer',
  templateUrl: './mapping-customer.component.html',
  styleUrls: ['./mapping-customer.component.css']
})
export class MappingCustomerComponent implements OnInit {
  
  public loading:boolean = false;
  public loading_treg:boolean = false;

  public sumTypeCustomerPerTregs: any;

  /** Data table... */
  public data: Customer[] = [];

  public treg:string;
  public type:string;

  constructor(
    public customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.countTypeCustomerPerTreg();
  }
  
  countTypeCustomerPerTreg() {
    this.loading = true;
    this.customerService.countByTregType()
      .subscribe(data => {
        this.sumTypeCustomerPerTregs = data;
        this.loading = false;
      })
  }

  getCustomerTregType(treg, type) {
    this.loading_treg = true;

    this.type = type;
    this.treg = treg;

    this.data = [];
    this.customerService.getByTregType(this.treg, this.type)
        .subscribe(data=> {
            this.data = data;
            this.loading_treg = false;
        })
  }

}
