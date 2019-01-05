import { Component, OnInit } from '@angular/core';
import { AmService } from '../../../_services/am.service';

@Component({
  selector: 'app-mapping-am',
  templateUrl: './mapping-am.component.html',
  styleUrls: ['./mapping-am.component.css']
})
export class MappingAmComponent implements OnInit {

  public sumJabatanPerTregs: any;

  constructor(
    public amService: AmService,
  ) { }

  ngOnInit() {
    this.countJabatanPerTreg();
  }

  countJabatanPerTreg() {
    this.amService.countByTregJabatan()
      .subscribe(data => {
        this.sumJabatanPerTregs = data;
      })
  }

}
