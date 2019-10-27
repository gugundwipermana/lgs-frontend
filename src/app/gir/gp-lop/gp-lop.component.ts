import { Component, OnInit } from '@angular/core';
import { LopService } from '../../_services/lop.service';

@Component({
  selector: 'app-gp-lop',
  templateUrl: './gp-lop.component.html',
  styleUrls: ['./gp-lop.component.css']
})
export class GpLopComponent implements OnInit {

  public loading: boolean = false;
  public data:any = [];
  public summaries:any;

  public show_form:boolean = false;
  public lop_id:number;

  constructor(
    public lopService: LopService
  ) { }

  ngOnInit() {
    this.getData();
    this.getSummary();
  }

  
  getData() {
    this.loading = true;
    this.lopService.getAll()
      .subscribe( data => {
        this.data = data;

        this.loading = false;
      })
  }

  getSummary() {
    this.loading = true;
    this.lopService.getSummary()
      .subscribe( data => {
        this.summaries = data;

        this.loading = false;
      })
  }


  /** Dialog... */
  add() {
    this.lop_id = null;
    this.showForm();
  }

  edit(id) {
    this.lop_id = id;
    this.showForm();
  }

  showForm() {
    this.show_form = true;
  }

  closeForm() {
    this.show_form = false;
  }




  delete(id: string) {
    this.lopService.delete(id)
      .subscribe(data => {
        this.refresh();
      })
  }

  refresh() {
    this.getData();
    this.getSummary();
    this.closeForm();
  }


}
