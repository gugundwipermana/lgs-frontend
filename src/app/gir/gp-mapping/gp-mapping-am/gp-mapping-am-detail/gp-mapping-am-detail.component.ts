import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Am } from '../../../../_models/am';
import { RevenueService } from '../../../../_services/revenue.service';
import { AmService } from '../../../../_services/am.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gp-mapping-am-detail',
  templateUrl: './gp-mapping-am-detail.component.html',
  styleUrls: ['./gp-mapping-am-detail.component.css']
})
export class GpMappingAmDetailComponent implements OnInit {

  @Input() am_id: string;
  @Output() close = new EventEmitter<string>();

  public revenues: any;

  public year: number;
  public start_month: number = 1;
  public end_month: number;

  private am: Am = new Am();

  private amCustomerDetail: any;

  constructor(
    public revenueService: RevenueService,
    public amService: AmService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  closeComponent() {
    this.close.emit();
  }

  ngOnChanges() {
    var d = new Date();
    this.end_month = d.getMonth()+1;
    this.year = d.getFullYear();

    if(this.end_month == 1) {
        this.year = this.year - 1;
        this.end_month = 12;
      }

    this.getData();   
  }

  getData() {
    // this.loading = true;
    this.route.params.subscribe(params => {
        this.getAmById(this.am_id);
    });
  }



  

  /**
   * ------------------------------
   * AM
   * ------------------------------
   * @param id 
   */
  getAmById(id: string) {

    this.am = null;
    this.amService.getById(id)
      .subscribe(data => {

        if(data != null) {

          let data_am = {
              ID: data['ID'],
              NAME: data['NAME'],
              EMAIL: data['EMAIL'],
              PHONE: data['PHONE'],
              JABATAN: data['JABATAN'],
              AVATAR: data['AVATAR'],
              customers: []
          }

          this.am = data_am;
          this.getCustomerByAm(id);
          // this.loading = false;
          // this.detailAm  = true;
        }
        
        });
    }

    getCustomerByAm(am_id: string) {
    this.amCustomerDetail = null;

    this.amService.getByAm(am_id)
        .subscribe(data => {

            // this.amCustomers = data;

            var amCustomorDetailArray = [];

            for(let result of data){

                
                this.revenueService.getDetail(this.year, this.start_month, this.end_month, 'ALL', 'ALL', result['customer'].ID, 'ALL')
                    .subscribe(dataDetail => {

                        amCustomorDetailArray.push({
                            ID: result['customer'].ID,
                            NAME: result['customer'].NAME,
                            TARGET: dataDetail[0].TARGET,
                            REVENUE: dataDetail[0].REVENUE,
                            ACHIEVE: dataDetail[0].ACHIEVE
                        });

                    })
            } 


            // console.log(amCustomorDetailArray);

            this.amCustomerDetail = amCustomorDetailArray;

            // this.loading = false;
        });
    }
















    saveAm() {
      this.amService.save(this.am).subscribe(data=> {
        this.getAmById(this.am_id);
      });
    }
  
    updateAm() {
      this.amService.update(this.am).subscribe(data=> {
        this.getAmById(this.am_id);
      });
    }

    setImageName(imageName: any): void {
      this.am.AVATAR = imageName;
    }
  
}
