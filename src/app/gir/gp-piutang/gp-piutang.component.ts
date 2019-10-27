import { Component, OnInit, ViewChild } from '@angular/core';
import { PiutangService } from '../../_services/piutang.service';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-gp-piutang',
  templateUrl: './gp-piutang.component.html',
  styleUrls: ['./gp-piutang.component.css']
})
export class GpPiutangComponent implements OnInit {

  private loading: Boolean = false;
  private loading_koreksi: Boolean = false;

  
  private year: number;
  private month: number;

  private piutangs: any;
  private koreksis: any;

  private pu: string;
  private pencapaian: string;
  private cr: string;


  @ViewChild("canvasBarPiutang") canvasBarPiutang;
  @ViewChild("canvasBarKoreksi") canvasBarKoreksi;

  @ViewChild("canvasDonutBesar") canvasDonutBesar;
  @ViewChild("canvasDonutUmur") canvasDonutUmur;

  context: CanvasRenderingContext2D;


  constructor(
    public piutangService: PiutangService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
    private http: Http,
  ) { }

  ngOnInit() {
    var d = new Date();
    this.month = d.getMonth()+1;
    this.year = d.getFullYear();

    if(this.month == 1) {
      this.year = this.year - 1;
      this.month = 12;
    }

    
    this.getData();

    this.topPiutang();
    this.besarPu();
    this.umurPu();
    this.getPerTreg();
    this.topKoreksi();
    this.getPerTregKoreksi();

    this.getSummary();
  }

  getData() {

  }

  getSummary() {
    this.piutangService.getSummary(this.year, this.month)
      .subscribe( data => {

        this.pu = data['PU'];
        this.pencapaian = data['NILAI_CEK_BAYAR'];
        this.cr = data['CR'];


        console.log(data);

      })
  }


  topPiutang() {
    this.piutangService.top(this.year, this.month, 10)
      .subscribe(data => {
        this.piutangs = data;

      })
  }

  besarPu() {
    this.piutangService.besarPu(this.year, this.month)
      .subscribe(data => {
        
        let canvas = this.canvasDonutBesar.nativeElement;
        this.context = canvas.getContext("2d");
      
        var myVinyls = {

        };

        for(var i = 0; i < data.length; i++){

          if(data[i]['BESAR'] == 'lebih_besar') data[i]['BESAR'] = 'PU > 100jt';
          if(data[i]['BESAR'] == 'lebih_kecil') data[i]['BESAR'] = 'PU < 100jt';

          var jumlah = (data[i]['JUMLAH'] / data[i]['TOTAL']) * 100;

          myVinyls[data[i]['BESAR']] = jumlah;
          
          
          console.log(myVinyls);
        }
      
        var myPiechart = new Piechart(
            {
                data: myVinyls,
                colors: ["#3dd28d","#f16e23"],
                canvas: canvas,
                legend: document.getElementById("myLegendBesar")
            }
        );
      
        myPiechart.draw();

      })
  }

  umurPu() {
    this.piutangService.umurPu(this.year, this.month)
      .subscribe(data => {
        
        let canvas = this.canvasDonutUmur.nativeElement;
        this.context = canvas.getContext("2d");
      
        var myVinyls = {

        };

        for(var i = 0; i < data.length; i++){

          if(data[i]['UMUR'] == 'lebih_kecil_6') data[i]['UMUR'] = '< 6 bulan';
          if(data[i]['UMUR'] == 'lebih_kecil_12') data[i]['UMUR'] = '12 bulan';
          if(data[i]['UMUR'] == 'lebih_besar_12') data[i]['UMUR'] = '>= 12 bulan';


          var jumlah = (data[i]['JUMLAH'] / data[i]['TOTAL']) * 100;

          myVinyls[data[i]['UMUR']] = jumlah;
          
          
          console.log(myVinyls);
        }
      
        var myPiechart = new Piechart(
            {
                data: myVinyls,
                colors: ["#3dd28d","#f16e23", "#57d9ff"],
                canvas: canvas,
                legend: document.getElementById("myLegendUmur")
            }
        );
      
        myPiechart.draw();

      })
  }

  getPerTreg() {
    this.piutangService.getPerTreg(this.year, this.month)
      .subscribe(data => {
        
              var myVinyls = {};

              for(var i = 0; i < data.length; i++){
                myVinyls["TARGET_TREG-"+(i+1)] = 0;
                myVinyls["TREG-"+(i+1)] = Number(data[i].CR);
                
              }

              let canvas = this.canvasBarPiutang.nativeElement;
              this.context = canvas.getContext("2d");

              var myBarchart = new Barchart(
                {
                    canvas: canvas,
                    padding: 10,
                    gridScale: 50,
                    gridColor: "#eeeeee",
                    data: myVinyls,
                    type: "Piutang",
                    colors: [
                      "#cccccc", "#fde23e",
                      "#cccccc", "#f16e23",
                      "#cccccc", "#57d9ff",
                      "#cccccc", "#937e88",
                      "#cccccc", "#67b6c7",
                      "#cccccc", "#49d594",
                      "#cccccc", "#dd4b39"
                    ]
                }
              );
              myBarchart.draw();

      })
  }




  /**
   * ---------------------------------
   * Koreksi
   * 
   */

  topKoreksi() {
    this.piutangService.topKoreksi(this.year, this.month, 10)
      .subscribe(data => {
        this.koreksis = data;
        
      })
  }

  getPerTregKoreksi() {
    this.piutangService.getPerTregKoreksi(this.year, this.month)
      .subscribe(data => {
        
              var myVinyls = {};

              for(var i = 0; i < data.length; i++){
                myVinyls["TARGET_TREG-"+(i+1)] = 0;
                myVinyls["TREG-"+(i+1)] = Number(data[i].NILAI_KOREKSI);
                
              }

              let canvas = this.canvasBarKoreksi.nativeElement;
              this.context = canvas.getContext("2d");

              var myBarchart = new Barchart(
                {
                    canvas: canvas,
                    padding: 10,
                    gridScale: 50,
                    gridColor: "#eeeeee",
                    data: myVinyls,
                    type: "Koreksi",
                    colors: [
                      "#cccccc", "#fde23e",
                      "#cccccc", "#f16e23",
                      "#cccccc", "#57d9ff",
                      "#cccccc", "#937e88",
                      "#cccccc", "#67b6c7",
                      "#cccccc", "#49d594",
                      "#cccccc", "#dd4b39"
                    ]
                }
              );
              myBarchart.draw();

      })
  }




}





/**
 * Bar Chart...
 * 
 */

var Barchart = function(options){
  this.options = options;
  var ctx = options.canvas.getContext("2d");
  this.colors = options.colors;
  var width= 300;
  var height = 300;
  var padding = 10;
  var type = options.type;
  this.draw = function(){

      ctx.clearRect(0, 0, width, height);

      var maxValue = 0;
      for (var categ in this.options.data){
          maxValue = Math.max(maxValue,this.options.data[categ]);
      }
      var canvasActualHeight = height - padding * 2;
      var canvasActualWidth = width - padding * 2;
      //drawing the bars
      var barIndex = 0;
      var numberOfBars = Object.keys(this.options.data).length;
      var barSize = (canvasActualWidth)/numberOfBars;
      for (categ in this.options.data){
          var val = this.options.data[categ];
          var barHeight = Math.round( canvasActualHeight * val/maxValue) ;

          if(barHeight == 0) barHeight = 1; 


          
          var x = (padding + barIndex * barSize);
          if(barIndex%2 == 0) {
            x = (padding + barIndex * barSize) + 6;
          }

          var y = (height - barHeight - (padding));

          ctx.save();
          ctx.fillStyle = this.colors[barIndex%this.colors.length];
          ctx.fillRect(
            x, // x
            y, // y
            barSize,                        // width
            barHeight);                     // height
          ctx.restore();
          barIndex++;
      }

      ctx.font = "14px Arial";
      ctx.fillStyle = "#999999";
      ctx.fillText(type, 10, 15);

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
  public width= 200;
  public height = 200;
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

    /*
    this.ctx.arc(
      this.width/2, 
      this.height/2, 
      0.5 * Math.min(this.width/2,this.height/2),
      0, 
      2 * Math.PI,
    );

    this.ctx.closePath();
    this.ctx.fill();
    */

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

