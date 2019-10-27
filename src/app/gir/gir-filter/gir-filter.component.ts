import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Treg } from '../../_models/treg';
import { Witel } from '../../_models/witel';
import { Customer } from '../../_models/customer';
import { Am } from '../../_models/am';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { TregService } from '../../_services/treg.service';
import { WitelService } from '../../_services/witel.service';
import { CustomerService } from '../../_services/customer.service';
import { AmService } from '../../_services/am.service';

@Component({
  selector: 'app-gir-filter',
  templateUrl: './gir-filter.component.html',
  styleUrls: ['./gir-filter.component.css']
})
export class GirFilterComponent implements OnInit {
  
  private loading: Boolean = false;
  
  @Output() tregValue = new EventEmitter<string>();
  @Output() witelValue = new EventEmitter<string>();
  @Output() amValue = new EventEmitter<string>();
  @Output() customerValue = new EventEmitter<string>();
  
  public tregs: Treg[] = [];
  public witels: Witel[] = [];
  public customers: Customer[] = [];
  public ams: Am[] = [];

  public param_treg: string;
  public param_witel: string;
  public param_customer: string;
  public param_am: string;

  constructor(
    private authService: AuthService,
    public router: Router,
    public tregService: TregService,
    public witelService: WitelService,
    public customerService: CustomerService,
    public amService: AmService,
  ) { }

  ngOnInit() {
    this.getTreg();
  }

  onSearchTregChange(tregValue : string) {
    this.tregValue.emit(tregValue);
  }




  
  getTreg() {
    // this.loading = true;
    this.tregService.getAll()
      .subscribe(data => {
        this.tregs = data;
        // this.loading = false;
      })
  }

  
  getWItelByTreg(treg) {
    this.witels = [];
    this.loading = true;
    this.witelService.getByTreg(treg)
      .subscribe(data => {
        this.witels = data;
        this.loading = false;
      })
  }

  getCustomerByWItel(witel_id) {
    this.customers = [];
    this.loading = true;
    this.customerService.getByWitel(witel_id)
      .subscribe(data => {
        this.customers = data;
        this.loading = false;
      })
  }

  getCustomorByAm(am_id) {
    this.customers = [];
    this.loading = true;
      this.amService.getByAm(am_id)
        .subscribe(data => {
          
          for(var i = 0; i < data.length; i++){
            
            this.customers.push({
              ID: data[i].customer.ID,
              NAME: data[i].customer.NAME,

              witel: null,
              ams: [],
              accounts: []
            });

          }
          this.loading = false;

        })
  }

  getAmByWitel(witel_id) {
    this.ams = [];
    this.loading = true;
    this.amService.getByWitel(witel_id)
      .subscribe(data => {
        this.ams = data;
        this.loading = false;
      })
  }



  /**
   * Change selected...
   * --------------------------------------------------------------------
   * filter AM muncul terlebih dahulu sebelum filter Customer, 
   * ketika di klik TREG muncul Witel yg ada di TREG, 
   * ketika di klik Witel muncul nama AM di Witel, 
   * muncul nama Customer yg di pegang oleh AM tsb
   * 
   */

  changeTreg() {
    this.param_witel = 'ALL';
    this.param_am = 'ALL';
    this.param_customer = 'ALL';

    this.getWItelByTreg(this.param_treg);
    this.tregValue.emit(this.param_treg);
  }

  changeWitel() {
    this.param_am = 'ALL';
    this.param_customer = 'ALL';

    this.getAmByWitel(this.param_witel);
    this.witelValue.emit(this.param_witel);
  }

  changeAm() {
    this.param_customer = 'ALL';

    this.getCustomorByAm(this.param_am);   
    this.amValue.emit(this.param_am);
  }

  changeCustomer() {
    this.customerValue.emit(this.param_customer);
  }

}
