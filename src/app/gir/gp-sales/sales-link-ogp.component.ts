import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../_services/sales.service';


@Component({
  selector: 'app-sales-link-ogp',
  template: `

  <div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      Sales
      <small>Link OGP</small>
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
      <li><a href="#"><i class="fa fa-dashboard"></i> Sales</a></li>
      <li class="active">Link OGP</li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">


  <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Link OGP</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
            
                <img *ngIf="loading" style="position: absolute; top:10px; left:10px;" src="assets/img/loading.gif" />

                <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                      <th>TREG</th>
                      <th>ASTINET</th>
                      <th>METRO</th>
                      <th>IP TRANSIT</th>
                      <th>VPN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of data" class="td-click">
                        <td>{{ item.TREG }}</td>
                        <td>{{ item.ASTINET | numberId }}</td>
                        <td>{{ item.METRO | numberId }}</td>
                        <td>{{ item.IP_TRANSIT | numberId }}</td>
                        <td>{{ item.VPN | numberId }}</td>
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
export class SalesLinkOgpComponent implements OnInit {


  private loading: Boolean = false;

  public data: any;
  
  constructor(
    public salesService: SalesService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;

    this.salesService.perTregLinkOgp().subscribe(data => {
        this.data = data;

        this.loading = false;
    });
  }

}
