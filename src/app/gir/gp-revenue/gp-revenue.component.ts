import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-gp-revenue',
  templateUrl: './gp-revenue.component.html',
  styleUrls: ['./gp-revenue.component.css']
})
export class GpRevenueComponent implements OnInit {

  public submenu_title:string = 'Control panel';

  constructor(
    public sharedService: SharedService
  ) { 
    sharedService.changeEmitted$.subscribe(text => {
      this.submenu_title = text;
    })
  }

  ngOnInit() {
  }

}
