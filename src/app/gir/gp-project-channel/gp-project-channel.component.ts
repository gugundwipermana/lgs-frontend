import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectChannelService } from '../../_services/project-channel.service';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-gp-project-channel',
  templateUrl: './gp-project-channel.component.html',
  styleUrls: ['./gp-project-channel.component.css']
})
export class GpProjectChannelComponent implements OnInit {

  private loading: Boolean = false;

  private year:number;
  private month:number;

  private wins: any;
  private ogps: any;

  /** Jum */
  private jum_win_A: number;
  private jum_win_B: number;
  private jum_win_C: number;
  private jum_win_D: number;
  private jum_win_total: number;

  private jum_ogp_A: number;
  private jum_ogp_B: number;
  private jum_ogp_C: number;
  private jum_ogp_D: number;
  private jum_ogp_total: number;

  /** Nilai */
  private nil_win_A: number;
  private nil_win_B: number;
  private nil_win_C: number;
  private nil_win_D: number;
  private nil_win_total: number;

  private nil_ogp_A: number;
  private nil_ogp_B: number;
  private nil_ogp_C: number;
  private nil_ogp_D: number;
  private nil_ogp_total: number;




  /** 
   * 
   * Bar Chart 
   * 
   */
  @ViewChild("canvasBarWinA") canvasBarWinA;
  @ViewChild("canvasBarWinB") canvasBarWinB;
  @ViewChild("canvasBarWinC") canvasBarWinC;
  @ViewChild("canvasBarWinD") canvasBarWinD;

  @ViewChild("canvasBarOgpA") canvasBarOgpA;
  @ViewChild("canvasBarOgpB") canvasBarOgpB;
  @ViewChild("canvasBarOgpC") canvasBarOgpC;
  @ViewChild("canvasBarOgpD") canvasBarOgpD;

  context: CanvasRenderingContext2D;


  constructor(
    public projectChannelService: ProjectChannelService,
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
  }

  getData() {
    this.loading = true;

    this.jum_win_A = 0;
    this.jum_win_B = 0;
    this.jum_win_C = 0;
    this.jum_win_D = 0;
    this.jum_win_total = 0;

    this.nil_win_A = 0;
    this.nil_win_B = 0;
    this.nil_win_C = 0;
    this.nil_win_D = 0;
    this.nil_win_total = 0;

    this.projectChannelService.getDiagramStatus(this.year, this.month, 'win')
        .subscribe(data => { 
            this.wins = data;

            for(let result of data){
              this.jum_win_A += Number(result['CUR_A_JML']);
              this.jum_win_B += Number(result['CUR_B_JML']);
              this.jum_win_C += Number(result['CUR_C_JML']);
              this.jum_win_D += Number(result['CUR_D_JML']);

              this.nil_win_A += Number(result['CUR_A_NIL']);
              this.nil_win_B += Number(result['CUR_B_NIL']);
              this.nil_win_C += Number(result['CUR_C_NIL']);
              this.nil_win_D += Number(result['CUR_D_NIL']);
            }

            this.jum_win_total = Number(this.jum_win_A) + Number(this.jum_win_B) + Number(this.jum_win_C) + Number(this.jum_win_D);

            this.nil_win_total = Number(this.nil_win_A) + Number(this.nil_win_B) + Number(this.nil_win_C) + Number(this.nil_win_D);




            /**
             * BarChart...
             */
            var types = {
              '1': {
                'name': 'E-Katalog',
                'kode': 'CUR_A_NIL',
                'kode_target': 'PREV_A_NIL',
                'canvas': this.canvasBarWinA
              },
              '2': {
                'name': 'TSO',
                'kode': 'CUR_B_NIL',
                'kode_target': 'PREV_B_NIL',
                'canvas': this.canvasBarWinB
              },
              '3': {
                'name': 'PL',
                'kode': 'CUR_C_NIL',
                'kode_target': 'PREV_C_NIL',
                'canvas': this.canvasBarWinC
              },
              '4': {
                'name': 'Tender',
                'kode': 'CUR_D_NIL',
                'kode_target': 'PREV_D_NIL',
                'canvas': this.canvasBarWinD
              }
            };

            

            Object.keys(types).forEach(key => {

              var myVinyls = {};

              for(var i = 0; i < data.length; i++){
                myVinyls["TARGET_TREG-"+(i+1)] = Number(data[i][types[key].kode_target]);
                myVinyls["TREG-"+(i+1)] = Number(data[i][types[key].kode]);
              }

              var treg = [];
              for(var i = 0; i < data.length; i++){
                treg.push(data[i]["TREG"].substring(5, 6));
              }

              let canvas = types[key].canvas.nativeElement;
              this.context = canvas.getContext("2d");

              var myBarchart = new Barchart(
                {
                    canvas: canvas,
                    padding: 10,
                    gridScale: 50,
                    gridColor: "#eeeeee",
                    data: myVinyls,
                    type: types[key].name,
                    colors: [
                      "#cccccc", "#fde23e",
                      "#cccccc", "#f16e23",
                      "#cccccc", "#57d9ff",
                      "#cccccc", "#937e88",
                      "#cccccc", "#67b6c7",
                      "#cccccc", "#49d594",
                      "#cccccc", "#dd4b39"
                    ],
                    treg: treg
                }
              );
              myBarchart.draw();

            });


            this.loading = false;
        });
    
    this.jum_ogp_A = 0;
    this.jum_ogp_B = 0;
    this.jum_ogp_C = 0;
    this.jum_ogp_D = 0;
    this.jum_ogp_total = 0;

    this.nil_ogp_A = 0;
    this.nil_ogp_B = 0;
    this.nil_ogp_C = 0;
    this.nil_ogp_D = 0;
    this.nil_ogp_total = 0;
    
    this.projectChannelService.getDiagramStatus(this.year, this.month, 'ogp')
        .subscribe(data => { 
            this.ogps = data;


            for(let result of data){
              this.jum_ogp_A += Number(result['CUR_A_JML']);
              this.jum_ogp_B += Number(result['CUR_B_JML']);
              this.jum_ogp_C += Number(result['CUR_C_JML']);
              this.jum_ogp_D += Number(result['CUR_D_JML']);

              this.nil_ogp_A += Number(result['CUR_A_NIL']);
              this.nil_ogp_B += Number(result['CUR_B_NIL']);
              this.nil_ogp_C += Number(result['CUR_C_NIL']);
              this.nil_ogp_D += Number(result['CUR_D_NIL']);
            }

            this.jum_ogp_total = Number(this.jum_ogp_A) + Number(this.jum_ogp_B) + Number(this.jum_ogp_C) + Number(this.jum_ogp_D);

            this.nil_ogp_total = Number(this.nil_ogp_A) + Number(this.nil_ogp_B) + Number(this.nil_ogp_C) + Number(this.nil_ogp_D);


            
            /**
             * BarChart...
             */
            var types = {
              '1': {
                'name': 'E-Katalog',
                'kode': 'CUR_A_NIL',
                'kode_target': 'PREV_A_NIL',
                'canvas': this.canvasBarOgpA
              },
              '2': {
                'name': 'TSO',
                'kode': 'CUR_B_NIL',
                'kode_target': 'PREV_B_NIL',
                'canvas': this.canvasBarOgpB
              },
              '3': {
                'name': 'PL',
                'kode': 'CUR_C_NIL',
                'kode_target': 'PREV_C_NIL',
                'canvas': this.canvasBarOgpC
              },
              '4': {
                'name': 'Tender',
                'kode': 'CUR_D_NIL',
                'kode_target': 'PREV_D_NIL',
                'canvas': this.canvasBarOgpD
              }
            };

            

            Object.keys(types).forEach(key => {

              var myVinyls = {};

              for(var i = 0; i < data.length; i++){
                myVinyls["TARGET_TREG-"+(i+1)] = Number(data[i][types[key].kode_target]);
                myVinyls["TREG-"+(i+1)] = Number(data[i][types[key].kode]);
                
              }

              var treg = [];
              for(var i = 0; i < data.length; i++){
                treg.push(data[i]["TREG"].substring(5, 6));
              }

              let canvas = types[key].canvas.nativeElement;
              this.context = canvas.getContext("2d");

              var myBarchart = new Barchart(
                {
                    canvas: canvas,
                    padding: 10,
                    gridScale: 50,
                    gridColor: "#eeeeee",
                    data: myVinyls,
                    type: types[key].name,
                    colors: [
                      "#cccccc", "#fde23e",
                      "#cccccc", "#f16e23",
                      "#cccccc", "#57d9ff",
                      "#cccccc", "#937e88",
                      "#cccccc", "#67b6c7",
                      "#cccccc", "#49d594",
                      "#cccccc", "#dd4b39"
                    ],
                    treg: treg
                }
              );
              myBarchart.draw();

            });

            this.loading = false;
        });

      
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
  var width= 200;
  var height = 150;
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


      /**
       * Looping every treg (target, realisasi) if complete will make 14 looping
       */
      var index_loop = 0;
      
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


          /**
           * Label TREG
           */
          var x = (padding + barIndex * barSize);
          if(barIndex%2 != 0) {

            var labelText = 'T'+this.options.treg[index_loop];
            ctx.fillStyle = "#666666";
            ctx.font = "11px Arial";
            ctx.fillText(labelText, (x - 5), 150);

            index_loop++; // 2 looping (target, realisasi) will make 1 index
          }
          


          barIndex++;
      }

      ctx.font = "14px Arial";
      ctx.fillStyle = "#999999";
      ctx.fillText(type, 10, 15);

  }
}