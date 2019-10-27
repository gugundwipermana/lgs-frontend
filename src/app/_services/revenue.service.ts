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
  private url_getHomeCustomerAchieve: string;

  private url_getDetail: string;

  private url_getPerCustomer: string;
  private url_getPerAm: string;

  private url_interimSiska: string;
  private url_uploadXlsSiska: string;


  constructor(
    private http: Http,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();

    this.url_getHomeYtdCurrent = this.url+"RevenueController/getHomeYtdCurrent";
    this.url_getHomeInterim = this.url+"RevenueController/getHomeInterim";
    this.url_getHomeYtdCustomer = this.url+"RevenueController/getHomeYtdCustomer";
    this.url_getHomeYtdAm = this.url+"RevenueController/getHomeYtdAm";

    this.url_getHomeCustomerAchieve = this.url+"RevenueController/getHomeCustomerAchieve";

    this.url_getDetail = this.url+"RevenueController/detail";

    this.url_getPerCustomer = this.url+"RevenueController/getDetailCustomor";
    this.url_getPerAm = this.url+"RevenueController/getDetailAm";

    this.url_interimSiska = this.url+"RevenueController/getInterimSiska";
    this.url_uploadXlsSiska = this.url+"RevenueController/store_siska_excel";
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

  getHomeCustomerAchieve(year, month): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getHomeCustomerAchieve+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }



  



  
  getDetail(year, month_start, month_end, treg, witel_id, customer_id, am_id): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getDetail+'/'+year+'/'+month_start+'/'+month_end+'/'+treg+'/'+witel_id+'/'+customer_id+'/'+am_id, options)
      .map((response: Response) => response.json());
  }


  

  getPerCustomer(year, month_start, month_end): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getPerCustomer+'/'+year+'/'+month_start+'/'+month_end, options)
      .map((response: Response) => response.json());
  }

  getPerAm(year, month_start, month_end): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getPerAm+'/'+year+'/'+month_start+'/'+month_end, options)
      .map((response: Response) => response.json());
  }


  getInterimSiska(year, month): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_interimSiska+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

/*

  uploadXlsSiska(formData, year, month) {
    
    let headers = new Headers();
    // In Angular 5, including the header Content-Type can invalidate your request 
    headers.append("Content-type","multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(this.url_uploadXlsSiska+'/'+year+'/'+month, formData, options)
        .map(res => res);
        
        // .catch(error => Observable.throw(error))
        // .subscribe(
        //     data => console.log('success'),
        //     error => console.log(error)
        // ); 
  }

*/


  uploadXlsSiska(formData, year, month) {
    return this.http.post(this.url_uploadXlsSiska+'/'+year+'/'+month, formData)
            .map((response: Response) => response.json());
  }


}
