import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { Observable }   from 'rxjs';
import 'rxjs/add/operator/map';

import { Revenue }         from '../_models/revenue';
import { SettingService } from './setting.service';

@Injectable()
export class RevenueService {

  private url: string;

  /** Home */
  private url_getHomeYtdCurrent: string;
  private url_getHomeInterim: string;
  private url_getHomeYtdCustomer: string;
  private url_getHomeYtdAm: string;

  private url_getDetail: string;

  constructor(
    private http: Http,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();

    this.url_getHomeYtdCurrent = this.url+"RevenueController/getHomeYtdCurrent";
    this.url_getHomeInterim = this.url+"RevenueController/getHomeInterim";
    this.url_getHomeYtdCustomer = this.url+"RevenueController/getHomeYtdCustomer";
    this.url_getHomeYtdAm = this.url+"RevenueController/getHomeYtdAm";

    this.url_getDetail = this.url+"RevenueController/detail";
  }

  
  getgetHomeYtdCurrent(year, month_start, month_end): Observable<Revenue[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getHomeYtdCurrent+'/'+year+'/'+month_start+'/'+month_end, options)
      .map((response: Response) => response.json());
  }


  getHomeInterim(year, month): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getHomeInterim+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  getHomeYtdCustomer(year, month): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getHomeYtdCustomer+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  getHomeYtdAm(year, month): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getHomeYtdAm+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }




  
  getDetail(year, month_start, month_end, treg, witel_id, customer_id, am_id): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getDetail+'/'+year+'/'+month_start+'/'+month_end+'/'+treg+'/'+witel_id+'/'+customer_id+'/'+am_id, options)
      .map((response: Response) => response.json());
  }

}
