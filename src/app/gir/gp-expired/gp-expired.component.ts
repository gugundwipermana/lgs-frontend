import { Component, OnInit } from '@angular/core';
import { EndContractService } from '../../_services/end-contract.service';

@Component({
  selector: 'app-gp-expired',
  templateUrl: './gp-expired.component.html',
  styleUrls: ['./gp-expired.component.css']
})
export class GpExpiredComponent implements OnInit {

  public loading: boolean = false;
  public endContracts: any;

  public jum_ao: number = 0;
  public jum_mo: number = 0;
  public jum_ro: number = 0;
  public jum_so: number = 0;
  public jum_do: number = 0;
  public jum_not: number = 0;
  public total: number = 0;

  constructor(
    public endContractService: EndContractService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.endContractService.totalTypeOrder()
      .subscribe( data => {
        this.endContracts = data;

        var i = 0;
        for(let result of data){
          this.endContracts[i]['total'] = Number(result['AO']) + Number(result['MO']) + Number(result['RO']) + Number(result['SO']) + Number(result['DO']) + Number(result['NOT_VALID']) ;

          this.jum_ao += Number(result['AO']);
          this.jum_mo += Number(result['MO']);
          this.jum_ro += Number(result['RO']);
          this.jum_so += Number(result['SO']);
          this.jum_do += Number(result['DO']);
          this.jum_not += Number(result['NOT_VALID']);

          this.total += Number(this.endContracts[i]['total']);

          i++;
        } 

        this.loading = false;
      })
  }

}
