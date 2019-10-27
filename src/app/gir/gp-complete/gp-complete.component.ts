import { Component, OnInit } from '@angular/core';
import { CompleteService } from '../../_services/complete.service';


@Component({
  selector: 'app-gp-complete',
  templateUrl: './gp-complete.component.html',
  styleUrls: ['./gp-complete.component.css']
})
export class GpCompleteComponent implements OnInit {

  public loading: boolean = false;
  public completes: any;

  public jum_ao: number = 0;
  public jum_mo: number = 0;
  public jum_ro: number = 0;
  public jum_so: number = 0;
  public jum_do: number = 0;
  public jum_not: number = 0;
  public total: number = 0;

  constructor(
    public completeService: CompleteService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.completeService.totalTypeOrder()
      .subscribe( data => {
        this.completes = data;

        var i = 0;
        for(let result of data){
          this.completes[i]['total'] = Number(result['AO']) + Number(result['MO']) + Number(result['RO']) + Number(result['SO']) + Number(result['DO']) + Number(result['NOT_VALID']) ;

          this.jum_ao += Number(result['AO']);
          this.jum_mo += Number(result['MO']);
          this.jum_ro += Number(result['RO']);
          this.jum_so += Number(result['SO']);
          this.jum_do += Number(result['DO']);
          this.jum_not += Number(result['NOT_VALID']);

          this.total += Number(this.completes[i]['total']);

          i++;
        } 

        this.loading = false;
      })
  }

}
