import { Component, OnInit, ViewChild } from '@angular/core';
import { ScnService } from '../../_services/scn.service';

@Component({
  selector: 'app-gp-scn',
  templateUrl: './gp-scn.component.html',
  styleUrls: ['./gp-scn.component.css']
})
export class GpScnComponent implements OnInit {

  public loading: boolean = false;
  public customer_scn: any;
  public data: any;

  public jum_conn: number = 0;
  public jum_cont: number = 0;
  public jum_coll: number = 0;


  public count_category_1: number = 0;
  public count_category_2: number = 0;
  public count_category_3: number = 0;
  public count_category_4: number = 0;
  public count_category_5: number = 0;
  public count_category_6: number = 0;
  public count_category_7: number = 0;
  public count_category_8: number = 0;

  @ViewChild("canvasDonutAm") canvasDiagram;

  constructor(
    public scnService: ScnService
  ) { }

  ngOnInit() {
    this.getData();
    this.getCustomerScn();
    this.getCategoryCount();
  }

  
  getData() {
    this.loading = true;
    this.scnService.perTreg()
      .subscribe(data => {
        this.data = data;

        for(let result of data){
          this.jum_conn += Number(result['CONN']);
          this.jum_cont += Number(result['CONT']);
          this.jum_coll += Number(result['COLL']);
        } 

        this.loading = false;
      })
  }

  getCustomerScn() {
    this.loading = true;
    this.scnService.perTregCustomer()
      .subscribe(data => {
        this.customer_scn = data;
        this.loading = false;
      })
  }


  getCategoryCount() {
    this.loading = true;
    this.scnService.onlyCategory(1).subscribe(data => { this.count_category_1 = data.length });
      this.scnService.onlyCategory(2).subscribe(data => { this.count_category_2 = data.length });
        this.scnService.onlyCategory(3).subscribe(data => { this.count_category_3 = data.length });
          this.scnService.onlyCategory(4).subscribe(data => { this.count_category_4 = data.length });
            this.scnService.onlyCategory(5).subscribe(data => { this.count_category_5 = data.length });
              this.scnService.onlyCategory(6).subscribe(data => { this.count_category_6 = data.length });
                this.scnService.onlyCategory(7).subscribe(data => { this.count_category_7 = data.length });
                  this.scnService.onlyCategory(8).subscribe(data => { this.count_category_8 = data.length });

                    
                              
                    /** Diagram... */
                    let canvas = this.canvasDiagram.nativeElement;
                    var myDiagram = new Diagram(
                      {
                          canvas: canvas,
                          category_1: this.count_category_1,
                          category_2: this.count_category_2,
                          category_3: this.count_category_3,
                          category_4: this.count_category_4,
                          category_5: this.count_category_5,
                          category_6: this.count_category_6,
                          category_7: this.count_category_7,
                          category_8: this.count_category_8,
                      }
                    );
                    myDiagram.draw();
  
  }
}





/**
 * Donut Chart...
 * @param options 
 */
export class Diagram  {
  constructor(public options:any){}

  // var c = document.getElementById("myCanvas");
  public ctx = this.options.canvas.getContext("2d");
  
  public width= 300;
  public height = 320;

  draw = function() {

    

    this.ctx.beginPath();
    this.ctx.strokeStyle = "#FF0000";
    this.ctx.arc(100, 120, 90, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "#0000FF";
    this.ctx.arc(190, 120, 90, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "#00FF00";
    this.ctx.arc(145, 200, 90, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText('Connectivity', 30, 20);
    this.ctx.fillStyle = "blue";
    this.ctx.fillText('Content', 170, 20);
    this.ctx.fillStyle = "green";
    this.ctx.fillText('Collaboration', 90, 305);

  }
}