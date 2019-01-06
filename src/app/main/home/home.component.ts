import { Component, OnInit, ViewChild } from '@angular/core';

import { Revenue }        from '../../_models/revenue';
import { RevenueService } from '../../_services/revenue.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public loading_ytd:boolean = false;
  public loading_current:boolean = false;
  public loading_ach:boolean = false;
  public loading_tier:boolean = false;

  
  public revenueTregs: Revenue[] = [];
  public interims:any;
  public pmsCountCustomers:any;
  public pmsCountAms:any;

  public totalTarget: number = 0;
  public totalRevenue:number = 0;
  public sisaTarget: number = 0;

  public totalTarget2: number = 0;
  public totalRevenue2:number = 0;
  public sisaTarget2: number = 0;

  public month: number;
  public year: number;
  public bulan: string;
  public jabatanAms: any;



  public jum_1_ca: number = 0;
  public jum_2_ca: number = 0;
  public jum_3_ca: number = 0;
  public jum_4_ca: number = 0;

  public jum_1_am: number = 0;
  public jum_2_am: number = 0;
  public jum_3_am: number = 0;
  public jum_4_am: number = 0;



  
  /**
   *  
   * Pie Chart 
   * 
   */
  
  public name = '';

  public canvasWidth = 200;
  public needleValue = 0; // = 65;
  public centralLabel = '';
  public bottomLabel = ''; //'65'
  public options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(255, 84, 84)', 'rgb(239, 214, 19)', 'rgb(61, 204, 91)'],
      arcDelimiters: [33, 66],
      rangeLabel: ['0', '150'],
      needleStartValue: 50,
  }

  public canvasWidth2 = 200;
  public needleValue2 = 0; // = 65;
  public centralLabel2 = '';
  public options2 = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(255, 84, 84)', 'rgb(239, 214, 19)', 'rgb(61, 204, 91)'],
      arcDelimiters: [33, 66],
      rangeLabel: ['0', '150'],
      needleStartValue: 50,
  }

  

  /** 
   * 
   * Donut Chart 
   * 
   */
  @ViewChild("canvasDonutCustomer") canvasDonutCustomer;
  @ViewChild("canvasDonutAm") canvasDonutAm;
  @ViewChild("canvasBarYtd") canvasBarYtd;
  @ViewChild("canvasBarCurrent") canvasBarCurrent;
  context: CanvasRenderingContext2D;



  /**
   * 
   */
  constructor(
    public revenueService: RevenueService,
  ) { }

  ngOnInit() {
    var d = new Date();
    this.month = d.getMonth()+1;
    this.year = d.getFullYear();

    if(this.month == 1) {
      this.year = this.year - 1;
      this.month = 12;
    }

    this.getCurrentMonth();
    this.getHomeYtdCurrent(true);
    this.getHomeInterim();
    this.getHomeYtdCustomer();
    this.getHomeYtdAm();
  }

  getCurrentMonth() {
    switch(new Date().getMonth()) {
      case 0: this.bulan = 'Januari'; break;
      case 1: this.bulan = 'Februari'; break;
      case 2: this.bulan = 'Maret'; break;
      case 3: this.bulan = 'April'; break;
      case 4: this.bulan = 'Mei'; break;
      case 5: this.bulan = 'Juni'; break;
      case 6: this.bulan = 'Juli'; break;
      case 7: this.bulan = 'Agustus'; break;
      case 8: this.bulan = 'September'; break;
      case 9: this.bulan = 'Oktober'; break;
      case 10: this.bulan = 'November'; break;
      case 11: this.bulan = 'Desember'; break;
    }
  }


  refreshYtdCurrent(e) {
    if(e.target.checked){
      this.getHomeYtdCurrent(true);
    } else {
      this.getHomeYtdCurrent(false);
    }
  }

  getHomeYtdCurrent(with_interim: boolean) {
    this.loading_ytd = true;

    this.revenueService.getgetHomeYtdCurrent(this.year, 1, this.month)
        .subscribe(data => {

          if(with_interim == true) {

            
            this.revenueService.getHomeInterim(this.year, this.month)
              .subscribe(dataInterim => {
                
                let data_item = [];
                for(let result of data){                  
                  for(let interim of dataInterim) {

                    if(interim['TREG'] == result['TREG']) {
                      let target = Number(result['TARGET']) + Number(interim['TARGET']);
                      let revenue = Number(result['REVENUE']) + Number(interim['TOTAL']);
    
                      data_item.push({
                        TREG: result['TREG'], 
                        TARGET: target,
                        REVENUE: revenue,
                        ACHIEVE: (revenue / target) * 100
                      });
                    }

                  }
                }
                
                this.detailHomeYtdCurrent(data_item);

            });

          } else {
            this.detailHomeYtdCurrent(data);
          }

          this.loading_ytd = false;
        })
  }

  detailHomeYtdCurrent(data) {
    this.revenueTregs = data;

    var jumlah = 0;
    var sum = 0;
    var _totalTarget = 0;
    var _totalRealisasi = 0;

    for(var i = 0; i < data.length; i++){
      sum += (Number(data[i]['ACHIEVE'])/3)*2; // karena di tampilkan 150%, jadi harus di bagi 3 dan dikali 2
      jumlah++;
      _totalTarget += Number(data[i]['TARGET']);
      _totalRealisasi += Number(data[i]['REVENUE']);
    }

    this.totalTarget = _totalTarget;
    this.totalRevenue = _totalRealisasi;
    this.needleValue = sum/jumlah;
    this.sisaTarget = this.totalTarget - _totalRealisasi;

    var myVinyls = {};
    for(var i = 0; i < data.length; i++){
      myVinyls["TARGET_TREG-"+(i+1)] = Math.ceil(Number(data[i]['TARGET']/1000000000));
      myVinyls["TREG-"+(i+1)] = Math.ceil(Number(data[i]['REVENUE']/1000000000));
    }

    let canvas = this.canvasBarYtd.nativeElement;
    this.context = canvas.getContext("2d");
    var myBarchart = new Barchart(
      {
        canvas: canvas,
        padding: 10,
        gridScale: 50,
        gridColor: "#eeeeee",
        data: myVinyls,
        colors: [
          "#eeeeee", "#fde23e",
          "#eeeeee", "#f16e23",
          "#eeeeee", "#57d9ff",
          "#eeeeee", "#937e88",
          "#eeeeee", "#67b6c7",
          "#eeeeee", "#bccd7a",
          "#eeeeee", "#dd4b39"
        ]
      }
    );

    myBarchart.draw();
  }

  getHomeInterim() {
    this.loading_current = true;

    this.revenueService.getHomeInterim(this.year, this.month)
      .subscribe(data => {

        this.interims = data;

        var jumlah = 0;
        var sum = 0;
        var _totalTarget = 0;
        var _totalRealisasi = 0;
        for(var i = 0; i < data.length; i++){
          sum += (Number(data[i]['ACH'])/3)*2; // karena di tampilkan 150%, jadi harus di bagi 3 dan dikali 2
          jumlah++;
          _totalTarget += Number(data[i]['TARGET']);
          _totalRealisasi += Number(data[i]['SISKA']) + Number(data[i]['TIBS']) - Number(data[i]['KOREKSI']) - Number(data[i]['SODOMORO']);
        }

        this.totalTarget2 = _totalTarget;
        this.totalRevenue2 = _totalRealisasi;
        this.needleValue2 = sum/jumlah;
        this.sisaTarget2 = this.totalTarget2 - _totalRealisasi;

        var myVinyls = {};

        for(var i = 0; i < data.length; i++){
          myVinyls["TARGET_TREG-"+(i+1)] = Math.ceil(Number(data[i]['TARGET']/1000000000));
          myVinyls["TREG-"+(i+1)] = Math.ceil((Number(data[i]['SISKA']) + Number(data[i]['TIBS']) - Number(data[i]['KOREKSI']) - Number(data[i]['SODOMORO']))/1000000000);
          
        }

        let canvas = this.canvasBarCurrent.nativeElement;
        this.context = canvas.getContext("2d");

        var myBarchart = new Barchart(
          {
              canvas: canvas,
              padding: 10,
              gridScale: 50,
              gridColor: "#eeeeee",
              data: myVinyls,
              colors: [
                "#eeeeee", "#fde23e",
                "#eeeeee", "#f16e23",
                "#eeeeee", "#57d9ff",
                "#eeeeee", "#937e88",
                "#eeeeee", "#67b6c7",
                "#eeeeee", "#bccd7a",
                "#eeeeee", "#dd4b39"
              ]
          }
        );
        myBarchart.draw();

        this.loading_current = false;
    })
  }

  
  getHomeYtdAm() {
    this.loading_ach = true;

    this.revenueService.getHomeYtdAm(this.year, this.month)
      .subscribe(data => {
        this.pmsCountAms = data;  
        this.jum_1_am = 0;
        this.jum_2_am = 0;
        this.jum_3_am = 0;
        this.jum_4_am = 0;
        for(var i = 0; i < data.length; i++){
          this.jum_1_am += Number(data[i]['DIATAS_150']);
          this.jum_2_am += Number(data[i]['DIATAS_100']);
          this.jum_3_am += Number(data[i]['DIATAS_50']);
          this.jum_4_am += Number(data[i]['DIBAWAH_50']);
        }

        let canvas = this.canvasDonutAm.nativeElement;
        this.context = canvas.getContext("2d");
      
        var myVinyls = {
          "> 150%": this.jum_1_am,
          "> 100%": this.jum_2_am,
          "> 50%": this.jum_3_am,
          "< 50%": this.jum_4_am
        };
      
        var myPiechart = new Piechart(
            {
                data: myVinyls,
                colors: ["#fde23e","#f16e23", "#57d9ff","#937e88"],
                canvas: canvas,
                legend: document.getElementById("myLegendAm")
            }
        );
      
        myPiechart.draw();

        this.loading_ach = false;
    })
  }


  getHomeYtdCustomer() {
    this.loading_tier = true;

    this.revenueService.getHomeYtdCustomer(this.year, this.month)
      .subscribe(data => {

        this.pmsCountCustomers = data;     
        this.jum_1_ca = 0;
        this.jum_2_ca = 0;
        this.jum_3_ca = 0;
        this.jum_4_ca = 0;
        for(var i = 0; i < data.length; i++){
          this.jum_1_ca += Number(data[i]['DIATAS_10']);
          this.jum_2_ca += Number(data[i]['DUA_SAMPAI_10']);
          this.jum_3_ca += Number(data[i]['DUA']);
          this.jum_4_ca += Number(data[i]['ZERO']);
        }

        let canvas = this.canvasDonutCustomer.nativeElement;
        this.context = canvas.getContext("2d");
     
        var myVinyls = {
          "> 10": this.jum_1_ca,
          "2 - 10": this.jum_2_ca,
          "< 2": this.jum_3_ca,
          "ZERO": this.jum_4_ca
        };
     
        var myPiechart = new Piechart(
            {
                data: myVinyls,
                colors: ["#fde23e","#f16e23", "#57d9ff","#937e88"],
                canvas: canvas,
                legend: document.getElementById("myLegendCustomer")
            }
        );
     
        myPiechart.draw();

        this.loading_tier = false;
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




/**
 * Bar Chart...
 * 
 */

var Barchart = function(options){
  this.options = options;
  var ctx = options.canvas.getContext("2d");
  this.colors = options.colors;
  var width= 150;
  var height = 150;
  var padding = 10;
  this.draw = function(){
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
          ctx.save();
          ctx.fillStyle = this.colors[barIndex%this.colors.length];
          ctx.fillRect((padding + barIndex * barSize), (height - barHeight - padding), barSize, barHeight);
          ctx.restore();
          barIndex++;
      }

  }
}