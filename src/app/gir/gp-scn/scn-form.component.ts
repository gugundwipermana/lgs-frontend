import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScnService } from '../../_services/scn.service';


@Component({
  selector: 'app-scn-form',
  template: `

<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      SCN
      <small>Form</small>
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> SCN</a></li>
      <li class="active">Form</li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">

  <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Form SCN</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
            
                <img *ngIf="loading" style="position: absolute; top:10px; left:10px;" src="assets/img/loading.gif" />

                <h3>Import from Excel</h3>
                <ul>
                    <li>(D) NIPNAS GROUP / CUSTOMER ID</li>
                    <li>CATEGORY ID</li>
                    <ul>
                        <li>(H) Connectivity</li>
                        <li>(I) Content</li>
                        <li>(J) Collaboration</li>
                    </ul>
                </ul>

                <div style="overflow-x: scroll;">
                  <img src="assets/img/excel_scn.jpg">
                </div>
                
                <input class="form-control" type="file" #fileInput /> <!-- (change)="upload()" -->
                <br/>
                <button type="submit" class="btn btn-primary" (click)="upload()">Upload</button>
                <hr/>

                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th width="80">TREG</th>
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
                            <td>{{ item.AM }}</td>
                            <td class="td-align-right">
                                <input type="text" scn_type_id="1" [attr.customer_id]="item.ID" class="form-control form-control" (keyup)=saveScn($event) value="{{ item.CONN | numberId }}">
                            </td>
                            <td class="td-align-right">
                                <input type="text" scn_type_id="2" [attr.customer_id]="item.ID" class="form-control form-control" (keyup)=saveScn($event) value="{{ item.CONT | numberId }}">
                            </td>
                            <td class="td-align-right">
                                <input type="text" scn_type_id="3" [attr.customer_id]="item.ID" class="form-control form-control" (keyup)=saveScn($event) value="{{ item.COLL | numberId }}">
                            </td>
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
export class ScnFormComponent implements OnInit {


  private loading: Boolean = false;

  public data: any;

  @ViewChild('fileInput') inputEl: ElementRef;
  public file_url: string;
  
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

    this.scnService.allCustomer()
        .subscribe(data => { 
            this.data = data;

            this.loading = false;
        })
            
  }

  saveScn(event:any) {
    var value = event.target.value;

    var customer_id:string = event.srcElement.attributes.customer_id.nodeValue; //event.target.customer_id;
    var scn_type_id:number = event.srcElement.attributes.scn_type_id.nodeValue;

    console.log(customer_id);
    console.log(scn_type_id);

    console.log({'CUSTOMER_ID': customer_id, 'SCN_CATEGORY_ID': scn_type_id, 'VALUE': value});

    this.scnService.save({'CUSTOMER_ID': customer_id, 'SCN_CATEGORY_ID': scn_type_id, 'VALUE': value})
      .subscribe(data=> {
        
      })

    }


    upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let formData = new FormData();

        formData.append("file", inputEl.files.item(0));

        this.scnService.uploadXls(formData)
                .subscribe(result => {
                    this.inputEl.nativeElement.value = "";  
                });
        }

}
