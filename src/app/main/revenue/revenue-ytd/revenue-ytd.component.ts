import { Component, OnInit, ViewChild } from '@angular/core';
import { Treg } from '../../../_models/treg';
import { Witel } from '../../../_models/witel';
import { Customer } from '../../../_models/customer';
import { Am } from '../../../_models/am';
import { RevenueService } from '../../../_services/revenue.service';
import { CustomerService } from '../../../_services/customer.service';
import { AmService } from '../../../_services/am.service';
import { ActivatedRoute } from '@angular/router';
import { TregService } from '../../../_services/treg.service';
import { WitelService } from '../../../_services/witel.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-revenue-ytd',
  templateUrl: './revenue-ytd.component.html',
  styleUrls: ['./revenue-ytd.component.css']
})
export class RevenueYtdComponent implements OnInit {
  private loading: Boolean = false;
  public filter_active: boolean = false;

  public data: any;

  public tregs: Treg[] = [];
  public witels: Witel[] = [];
  public customers: Customer[] = [];
  public ams: Am[] = [];

  public param_treg: string;
  public param_witel: string;
  public param_customer: string;
  public param_am: string;

  public year: number;
  public start_month: number = 1;
  public end_month: number;


  public total_target: number = 0;
  public total_revenue: number = 0;
  public total_achieve: number = 0;


  /**
   * Bar Chart My Make...
   * 
   */
  @ViewChild("canvasBar") canvasBar;
  context: CanvasRenderingContext2D;

  constructor(
    public revenueService: RevenueService,
    public tregService: TregService,
    public witelService: WitelService,
    public customerService: CustomerService,
    public amService: AmService,
    public activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    var d = new Date();
    this.end_month = d.getMonth()+1;
     this.year = d.getFullYear();

     if(this.end_month == 1) {
      this.year = this.year - 1;
      this.end_month = 12;
    }
    
    this.param_treg = 'ALL';
    this.param_witel = 'ALL';
    this.param_customer = 'ALL';
    this.param_am = 'ALL';


    this.route.params.subscribe(params => {
      
			if(params['year'] != undefined) {

        this.year = params['year'];
        this.start_month = params['start_month'];
        this.end_month = params['end_month'];
        this.param_treg = params['treg'];
        this.param_witel = params['witel'];
        this.param_customer = params['customer'];
        this.param_am = params['am'];

      }
    });

    this.getData();

    this.getTreg();
  }


  getData() {
    this.loading = true;
    this.data = [];
    this.revenueService.getDetail(this.year, this.start_month, this.end_month, this.param_treg, this.param_witel, this.param_customer, this.param_am)
      .subscribe(data=> {
        this.data = data;
        this.loading = false;

        this.total_target = 0;
        this.total_revenue = 0;
        this.total_achieve = 0;

        for(let result of data){
          
          this.total_target += Number(result['TARGET']);
          this.total_revenue += Number(result['REVENUE']);
        } 

        this.total_achieve = this.total_revenue / this.total_target * 100;

        var group_by = 'TREG';
        if(this.param_treg != 'ALL') {
          group_by = 'WITEL_NAME';
          if(this.param_witel != 'ALL') {
            group_by = 'CUSTOMER_NAME';
          }
        }


        var groupBy = function(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
        var groube = groupBy(data, group_by);

        var myVinyls = {};

        var obj_data = [];
        Object.keys(groube).forEach(function(group_by2){

          var obj_item = [];
          var target_item = 0;
          var revenue_item = 0;

          groube[group_by2].forEach(function(val, i){
            obj_item['NAME'] = group_by2;
            target_item += Number(val.TARGET);
            revenue_item += Number(val.REVENUE);
          })

          obj_item['TARGET'] = target_item;
          obj_item['REVENUE'] = revenue_item;

          obj_data.push(obj_item);


          myVinyls["TARGET_"+group_by2] = Math.ceil(Number(target_item/1000000000));
          myVinyls[group_by2] = Math.ceil(Number(revenue_item/1000000000));


        }); 


        let canvas = this.canvasBar.nativeElement;
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
                  "#eeeeee", "#dd4b39",
                  "#eeeeee", "#fde23e",
                  "#eeeeee", "#f16e23",
                  "#eeeeee", "#57d9ff",
                  "#eeeeee", "#937e88",
                  "#eeeeee", "#67b6c7",
                  "#eeeeee", "#bccd7a",
                  "#eeeeee", "#dd4b39",
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
      
      })


      this.filter_active = false;
  }

  




  /** 
   * Filter... 
   * 
  */

  
  filter() {
    if(this.filter_active) {
      this.filter_active = false;
    } else {
      this.filter_active = true;
    }
  }


  getTreg() {
    this.tregService.getAll()
      .subscribe(data => {
        this.tregs = data;
      })
  }

  
  getWItelByTreg(treg) {
    this.witelService.getByTreg(treg)
      .subscribe(data => {
        this.witels = data;
      })
  }

  getCustomerByWItel(witel_id) {
    this.customerService.getByWitel(witel_id)
      .subscribe(data => {
        this.customers = data;
      })
  }

  getCustomorByAm(am_id) {
      this.amService.getByAm(am_id)
        .subscribe(data => {
          
          for(var i = 0; i < data.length; i++){
            
            this.customers.push({
              ID: data[i].customer.ID,
              NAME: data[i].customer.NAME,

              witel: null,
              ams: [],
              accounts: []
            });

          }

        })
  }

  getAmByWitel(witel_id) {
    this.amService.getByWitel(witel_id)
      .subscribe(data => {
        this.ams = data;
      })
  }



  /**
   * Change selected...
   * --------------------------------------------------------------------
   * filter AM muncul terlebih dahulu sebelum filter Customer, 
   * ketika di klik TREG muncul Witel yg ada di TREG, 
   * ketika di klik Witel muncul nama AM di Witel, 
   * muncul nama Customer yg di pegang oleh AM tsb
   * 
   */

  changeTreg() {
    this.param_witel = 'ALL';
    this.param_am = 'ALL';
    this.param_customer = 'ALL';

    this.getWItelByTreg(this.param_treg);
  }

  changeWitel() {
    this.param_am = 'ALL';
    this.param_customer = 'ALL';

    this.getAmByWitel(this.param_witel);
  }

  changeAm() {
    // this.param_treg = 'ALL';
    // this.param_witel = 'ALL';
    this.param_customer = 'ALL';

    console.log("Change AM...");

    // this.getData(); 
    this.getCustomorByAm(this.param_am);   
  }
  




  
  /** 
   * ------------------------------------------------
   * Export Excel
   * ------------------------------------------------
   * 
   */
  exportXLSX() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, 'export-data-revenue.xlsx');
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
  var width= 1000;
  var height = 450;
  var padding = 10;
  ctx.clearRect(0, 0, width, height);
  this.draw = function(){
      var maxValue = 0;
      for (var categ in this.options.data){
          maxValue = Math.max(maxValue,this.options.data[categ]);
      }
      var canvasActualHeight = height - padding * 2;
      var canvasActualWidth = width - padding * 2;
      //drawing the grid lines
      var gridValue = 0;
      while (gridValue <= maxValue){
          var gridY = canvasActualHeight * (1 - gridValue/maxValue) + padding;
          ctx.save();
          ctx.strokeStyle = this.options.gridColor;
          ctx.beginPath();
          ctx.moveTo(0,gridY);
          ctx.lineTo(width,gridY);
          ctx.stroke();
          ctx.restore();
          //writing grid markers
          ctx.save();
          ctx.fillStyle = this.options.gridColor;
          ctx.font = "bold 10px Arial";
          ctx.fillText(gridValue, 10,gridY - 2);
          ctx.restore();
          gridValue+=this.options.gridScale;
      }
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
      //draw legend
      barIndex = 0;
      var legend = document.querySelector("legend[for='myCanvas']");
      var div = document.createElement("div");
      legend.innerHTML = '';
      legend.appendChild(div);
      var ganjil = false;
      for (categ in this.options.data){
          var span = document.createElement("span");
          span.style.listStyle = "none";
          span.style.borderLeft = "10px solid "+this.colors[barIndex%this.colors.length];
          span.style.padding = "2px 10px";
          span.style.fontSize = "8px";
          span.style.cssFloat = "left";
          span.style.width = ""+(width / (Object.keys(this.options.data).length / 2) - 2)+"px";
          span.textContent = categ;
          if(ganjil) {
            div.appendChild(span);
          }
          barIndex++;
          if(ganjil) {
            ganjil = false;
          } else {
            ganjil = true;
          }
      }
  }
}