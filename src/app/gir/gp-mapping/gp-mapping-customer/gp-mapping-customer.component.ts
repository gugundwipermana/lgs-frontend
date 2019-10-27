import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { Customer } from '../../../_models/customer';
import { SharedService } from '../../../_services/shared.service';

@Component({
  selector: 'app-gp-mapping-customer',
  templateUrl: './gp-mapping-customer.component.html',
  styleUrls: ['./gp-mapping-customer.component.css']
})
export class GpMappingCustomerComponent implements OnInit {

  public sumTypeCustomerPerTregs: any;

  /** Data table... */
  public data: Customer[] = [];

  public treg:string;
  public type:string;


  /** Total */
  public total: number = 0;
  public total_pemprov: number = 0;
  public total_pemkab: number = 0;
  public total_pemkot: number = 0;
  public total_instansi: number = 0;

  public search:string = '';

  constructor(
    public customerService: CustomerService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.sharedService.emitChange('Customer');

    this.countTypeCustomerPerTreg();

    this.getCustomerTregType('ALL', 'ALL');
  }

  countTypeCustomerPerTreg() {
    // this.loading = true;
    this.customerService.countByTregType()
      .subscribe(data => {
        this.sumTypeCustomerPerTregs = data;

        var i = 0;
        for(let result of data){

          this.total_pemprov += Number(result['PEMPROV']);
          this.total_pemkab += Number(result['PEMKAB']);
          this.total_pemkot += Number(result['PEMKOT']);
          this.total_instansi += Number(result['INSTANSI']);
          this.total += Number(result['PEMPROV']) + Number(result['PEMKAB']) + Number(result['PEMKOT']) + Number(result['INSTANSI']);


          console.log(this.total_pemprov);
          
          i++;
        }


        
        // this.loading = false;
      })
  }

  getCustomerTregType(treg, type) {
    // this.loading = true;

    this.type = type;
    this.treg = treg;

    this.data = [];
    this.customerService.getByTregType(this.treg, this.type)
        .subscribe(data=> {
            this.data = data;
            // this.loading = false;
        })
  }

  searchByName() {

    if(this.search == '') {
      this.search = 'ALL';
    }

    this.data = [];
    this.customerService.searchByName(this.search)
      .subscribe(data => {
        this.data = data;

      })
  }

  getAll() {
    this.getCustomerTregType('ALL', 'ALL');
  }

}
