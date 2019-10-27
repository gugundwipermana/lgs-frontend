import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScnService } from '../../_services/scn.service';


@Component({
  selector: 'app-scn-detail',
  template: `

<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      SCN
      <small>Detail</small>
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> SCN</a></li>
      <li class="active">Detail</li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">


  <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">{{ type }}</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
            
                <img *ngIf="loading" style="position: absolute; top:10px; left:10px;" src="assets/img/loading.gif" />

                <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>TREG</th>
                        <th>WITEL</th>
                        <th>CUSTOMER</th>
                        <th>AM</th>
                        <th>Connectivity</th>
                        <th>Content</th>
                        <th>Collaboration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of data" class="td-click">
                        <td>{{ item.TREG }}</td>
                        
                        <td>{{ item.WITEL }}</td>
                        <td>{{ item.CUSTOMER }}</td>
                        <td>{{ item.NAME }}</td>
                        <td class="td-align-right">{{ item.CONN | numberId }}</td>
                        <td class="td-align-right">{{ item.CONT | numberId }}</td>
                        <td class="td-align-right">{{ item.COLL | numberId }}</td>

                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>



    </section>
    <!-- /.content -->
</div>
  

  `,
  styles: [`
  

  `]
})
export class ScnDetailComponent implements OnInit {


  private loading: Boolean = false;

  public data: any;
  public type: number;
  
  constructor(
    public scnService: ScnService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;

    this.route.params.subscribe(params => {

        this.type = params['type'];
    
        this.scnService.onlyCategory(this.type).subscribe(data => { 
            this.data = data;    
        })
            
        this.loading = false;
        
    });
  }

}
