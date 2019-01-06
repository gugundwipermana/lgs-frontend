import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AmService } from '../../../_services/am.service';
import { Am } from '../../../_models/am';

@Component({
  selector: 'app-mapping-am',
  templateUrl: './mapping-am.component.html',
  styleUrls: ['./mapping-am.component.css']
})
export class MappingAmComponent implements OnInit {

  public sumJabatanPerTregs: any;

  // public ams: Am[] = [];
  /** Data table... */
  public data: Am[] = [];
  public sortBy = "ID";
  public sortOrder = "asc";

  /** Revenue... */
  public year: number;
  public start_month: number = 1;
  public end_month: number;

  public treg:string;
  public jabatan:string;
  public jabatan_id:number;

  /** Detail... */
  @Output() close = new EventEmitter<string>();
  public am_detail_active:boolean = true;
  public am_id:number;

  constructor(
    public amService: AmService,
  ) { }

  ngOnInit() {
    this.countJabatanPerTreg();


    var d = new Date();
    this.end_month = d.getMonth()+1;
     this.year = d.getFullYear();

     if(this.end_month == 1) {
      this.year = this.year - 1;
      this.end_month = 12;
    }
  }

  countJabatanPerTreg() {
    this.amService.countByTregJabatan()
      .subscribe(data => {
        this.sumJabatanPerTregs = data;
      })
  }

  getTregJabatanAm(treg, jabatan_id) {
    this.jabatan_id = jabatan_id;
    this.treg = treg;

    if(this.jabatan_id == 1) {
      this.jabatan = 'SAM';
    } else if(this.jabatan_id == 2) {
      this.jabatan = 'AM';
    } else if(this.jabatan_id == 3) {
      this.jabatan = 'JAM-2';
    } else if(this.jabatan_id == 4) {
      this.jabatan = 'JAM-1';
    } else if(this.jabatan_id == 5) {
      this.jabatan = 'ASMAN';
    } else if(this.jabatan_id == 6) {
      this.jabatan = 'AMEX';
    }


    this.data = [];
    this.amService.getByTregJabatan(this.treg, this.jabatan_id, this.year, this.start_month, this.end_month)
        .subscribe(data=> {
            this.data = data;
        })
  }




  

  /**
   *  Detail AM...
   */
  amDetail(am_id) {
    this.am_id = am_id;
    this.am_detail_active = true;
  }

  closeAmDetail() {
    this.am_detail_active = false;
  }

}
