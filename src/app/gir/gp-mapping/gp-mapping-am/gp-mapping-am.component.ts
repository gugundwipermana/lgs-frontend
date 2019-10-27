import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AmService } from '../../../_services/am.service';
import { Am } from '../../../_models/am';
import { SharedService } from '../../../_services/shared.service';

@Component({
  selector: 'app-gp-mapping-am',
  templateUrl: './gp-mapping-am.component.html',
  styleUrls: ['./gp-mapping-am.component.css']
})
export class GpMappingAmComponent implements OnInit {
  
  public loading_treg:boolean = false;

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

  /** Total */
  public total_sam: number = 0;
  public total_am: number = 0;
  public total_jam2: number = 0;
  public total_jam1: number = 0;
  public total_asman: number = 0;
  public total_amex: number = 0;
  public total:number = 0;

  public search:string = '';

  /** Detail... */
  @Output() close = new EventEmitter<string>();
  public am_detail_active:boolean = false;
  public am_id:string;

  constructor(
    public amService: AmService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.sharedService.emitChange('AM');

    this.countJabatanPerTreg();

    var d = new Date();
    this.end_month = d.getMonth()+1;
    this.year = d.getFullYear();

    if(this.end_month == 1) {
      this.year = this.year - 1;
      this.end_month = 12;
    }

    this.getTregJabatanAm('ALL', 'ALL');
  }

  countJabatanPerTreg() {
    // this.loading = true;

    this.amService.countByTregJabatan()
      .subscribe(data => {
        this.sumJabatanPerTregs = data;

      
        for(let result of data){

          this.total_sam += Number(result['_1']);
          this.total_am += Number(result['_2']);
          this.total_jam2 += Number(result['_3']);
          this.total_jam1 += Number(result['_4']);
          this.total_asman += Number(result['_5']);
          this.total_amex += Number(result['_6']);
          this.total += Number(result['_1']) + Number(result['_2']) + Number(result['_3']) + Number(result['_4']) + Number(result['_5']) + Number(result['_6']);

        } 
      
        // this.loading = false;
      })
  }

  
  getTregJabatanAm(treg, jabatan_id) {
    this.loading_treg = true;

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
            
            this.loading_treg = false;
        })
  }


  searchByName() {

    if(this.search == '') {
      this.search = 'ALL';
    }

    this.data = [];
    this.amService.searchByName(this.search, this.year, this.start_month, this.end_month, 'ALL')
      .subscribe(data => {
        this.data = data;

      })
  }

  getAll() {
    this.getTregJabatanAm('ALL', 'ALL');
  }

  

  /**
   *  Detail AM...
   */

  amDetail(am:Am) {
    this.am_id = am.ID;
    this.am_detail_active = true;
  }

  closeAmDetail() {
    this.am_detail_active = false;
  }

}
