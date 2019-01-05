import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';

@Component({
  selector: 'app-mapping-customer',
  templateUrl: './mapping-customer.component.html',
  styleUrls: ['./mapping-customer.component.css']
})
export class MappingCustomerComponent implements OnInit {

  public sumTypeCustomerPerTregs: any;

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

}
