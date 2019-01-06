import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AmService } from '../../../_services/am.service';
import { Am } from '../../../_models/am';
import { ActivatedRoute } from '@angular/router';
import { RevenueService } from '../../../_services/revenue.service';


@Component({
  selector: 'app-mapping-am-detail',
  template: `

  <div class="row" *ngIf="am" class="box-detail-am">
  
  <button (click)="closeComponent()" type="submit" class="btn btn-danger pull-right btn-sm btn-close">Close</button>
  

    <div class="col-md-3">
        <div class="box box-primary">
            <div class="box-body box-profile">
                <img class="profile-user-img img-responsive img-circle" src="{{ am.AVATAR }}" alt="User profile picture">

                <h3 class="profile-username text-center">{{ am.NAME }}</h3>

                <p class="text-muted text-center">{{ am.ID }}</p>

                <ul class="list-group list-group-unbordered">
                    <li class="list-group-item">
                        <b>Jabatan</b> <a class="pull-right">{{ am.JABATAN }}</a>
                    </li>
                    <li class="list-group-item">
                        <b>Phone</b> <a class="pull-right">{{ am.PHONE }}</a>
                    </li>
                    <li class="list-group-item">
                        <b>Email</b> <a class="pull-right">{{ am.EMAIL }}</a>
                    </li>
                </ul>
            </div>
            <!-- /.box-body -->
        </div>
    </div>
    <div class="col-md-9">
        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#activity" data-toggle="tab" aria-expanded="true">Customer</a></li>
                <li class=""><a href="#timeline" data-toggle="tab" aria-expanded="false">Edit Profile</a></li>
                <li><a href="#settings" data-toggle="tab">Settings</a></li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane active" id="activity">
                    
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                         <th>NO</th>
                        <th>NIPNAS</th>
                        <th>CUSTOMER</th>
                        <th>TARGET</th>
                        <th>REALISASI</th>
                        <th>ACHIEVEMENT</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of amCustomerDetail; let i = index">
                            <td class="td-right">{{ i+1 }}</td>
                            <td class="td-left">{{ item.ID }}</td>
                            <td class="td-left">{{ item.NAME }}</td>
                            <td class="td-right">{{ item.TARGET | numberId }}</td>
                            <td class="td-right">{{ item.REVENUE | numberId }}</td>
                            <td class="td-right">{{ item.ACHIEVE }}%</td>
                        </tr>
                    </tbody>
                </table>
                
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="timeline">
                    <form class="form-horizontal">
                    <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputName" placeholder="Name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputEmail" placeholder="Email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputName" placeholder="Name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                        <div class="col-sm-10">
                        <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputSkills" class="col-sm-2 control-label">Skills</label>

                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputSkills" placeholder="Skills">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                        <div class="checkbox">
                            <label>
                            <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>
                            </label>
                        </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-danger">Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
                <!-- /.tab-pane -->

                <div class="tab-pane" id="settings">
                    
                </div>
                <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
        </div>
    </div>
  </div>



  `,
  styles: [`
    .box-detail-am {
        position: fixed;
        top: 50px;
        left: 0;
        z-index: 9999;
        width: 100vw;
        background-color: #f5ecec;
        padding: 20px;
        border-bottom: 5px solid #dd4b39;
        max-height: 500px;
    }

    .btn-close {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

  `]
})
export class MappingAmDetailComponent implements OnInit {

  @Input() am_id: string;

  @Output() close = new EventEmitter<string>();


  private loading: Boolean = false;

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

  ngOnInit() {}

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
    this.route.params.subscribe(params => {
    
        this.getAmById(this.am_id);

    });
  }

  closeComponent() {
    this.close.emit();
  }












  /**
   * ------------------------------
   * AM
   * ------------------------------
   * @param id 
   */
  getAmById(id: string) {

    this.am = null;
    this.loading = true;

    this.amService.getById(id)
      .subscribe(data => {

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
        });
    }

    getCustomerByAm(am_id: string) {
    // remove all data
    // this.amCustomers = null;

    this.amCustomerDetail = null;

    this.loading = true;

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

            this.loading = false;
        });
    }

}
