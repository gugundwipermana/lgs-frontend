import { Component, OnInit, ViewChild } from '@angular/core';
import { OgpService } from '../../_services/ogp.service';

@Component({
  selector: 'app-gp-ogp',
  templateUrl: './gp-ogp.component.html',
  styleUrls: ['./gp-ogp.component.css']
})
export class GpOgpComponent implements OnInit {

  public loading: boolean = false;
  public ogps: any;

  public jum_ao: number = 0;
  public jum_mo: number = 0;
  public jum_ro: number = 0;
  public jum_so: number = 0;
  public jum_do: number = 0;
  public jum_not: number = 0;
  public total: number = 0;


  /** 
   * 
   * Donut Chart 
   * 
   */
  @ViewChild("canvasDonut") canvasDonut;
  context: CanvasRenderingContext2D;

  constructor(
    public ogpService: OgpService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.ogpService.totalTypeOrder()
      .subscribe( data => {
        this.ogps = data;

        

        var i = 0;
        for(let result of data){
          this.ogps[i]['total'] = Number(result['AO']) + Number(result['MO']) + Number(result['RO']) + Number(result['SO']) + Number(result['DO']) + Number(result['NOT_VALID']) ;

          this.jum_ao += Number(result['AO']);
          this.jum_mo += Number(result['MO']);
          this.jum_ro += Number(result['RO']);
          this.jum_so += Number(result['SO']);
          this.jum_do += Number(result['DO']);
          this.jum_not += Number(result['NOT_VALID']);

          this.total += Number(this.ogps[i]['total']);

          i++;
        } 


        let canvas = this.canvasDonut.nativeElement;
        this.context = canvas.getContext("2d");
     
        var myVinyls = {
          "AO": this.jum_ao,
          "MO": this.jum_mo,
          "RO": this.jum_ro,
          "SO": this.jum_so,
          "DO": this.jum_do

        };
     
        var myPiechart = new Piechart(
            {
                data: myVinyls,
                colors: ["#3dd28d","#f16e23", "#57d9ff","#937e88", '#cc0000'],
                canvas: canvas,
                legend: document.getElementById("myLegend")
            }
        );
     
        myPiechart.draw();


        this.loading = false;
      })
  }

}




/**
 * Donut Chart...
 * @param options 
 */
export class Piechart  {
  constructor(public options:any){}

  public ctx = this.options.canvas.getContext("2d");
  public colors = this.options.colors;
  public width= 130;
  public height = 130;
  draw = function(){
    var total_value = 0;
    var color_index = 0;

    for (var categ in this.options.data){
        var val = this.options.data[categ];
        total_value += val;
    }

    var start_angle = 0;
    for (categ in this.options.data){
        val = this.options.data[categ];
        var slice_angle = 2 * Math.PI * val / total_value;
        this.ctx.fillStyle = this.colors[color_index%this.colors.length];
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2,this.height/2);
        this.ctx.arc(
          this.width/2, 
          this.height/2, 
          Math.min(this.width/2,this.height/2), 
          start_angle, 
          start_angle+slice_angle
        );
        this.ctx.closePath();
        this.ctx.fill();
        start_angle += slice_angle;
        color_index++;
    }

    this.ctx.fillStyle = "#ffffff";
    this.ctx.beginPath();
    this.ctx.moveTo(this.width/2,this.height/2);

    this.ctx.arc(
      this.width/2, 
      this.height/2, 
      0.5 * Math.min(this.width/2,this.height/2),
      0, 
      2 * Math.PI,
    );

    this.ctx.closePath();
    this.ctx.fill();

    /** Ket coclor */
    if (this.options.legend) {
      color_index = 0;
      var legendHTML = "";
      for (categ in this.options.data){
          legendHTML += "<span style='font-size:8px;'><span style='display:inline-block;padding:2px 4px;border-radius:3px;color:#fff;background-color:"+this.colors[color_index++]+";'>"+categ+"</span></span>&nbsp;";
      }
      this.options.legend.innerHTML = legendHTML;
    }
  }
}

