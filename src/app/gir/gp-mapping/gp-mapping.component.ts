import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-gp-mapping',
  templateUrl: './gp-mapping.component.html',
  styleUrls: ['./gp-mapping.component.css']
})
export class GpMappingComponent implements OnInit {

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
