import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { Customer } from '../../../_models/customer';

@Component({
  selector: 'app-mapping-customer',
  templateUrl: './mapping-customer.component.html',
  styleUrls: ['./mapping-customer.component.css']
})
export class MappingCustomerComponent implements OnInit {

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
    this.customerService.countByTregType()
      .subscribe(data => {
        this.sumTypeCustomerPerTregs = data;
      })
  }

  getCustomerTregType(treg, type) {

    this.type = type;
    this.treg = treg;

    this.data = [];
    this.customerService.getByTregType(this.treg, this.type)
        .subscribe(data=> {
            this.data = data;
        })
  }

}
