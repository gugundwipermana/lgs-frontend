import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';
import { Scn }  from '../_models/scn';

@Injectable()
export class ScnService {

  private url: string;

  private url_perTreg: string;
  private url_perTregCustomer: string;
  private url_byTreg: string;
  private url_allCustomer: string;
  private url_save: string;

  private url_onlyCategory: string;
  private url_uploadXls: string;


  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();

    this.url_perTreg = this.url+"ScnController/getPerTreg";
    this.url_perTregCustomer = this.url+"ScnController/getPerTregCustomer";
    this.url_byTreg = this.url+"ScnController/getByTreg"; // treg
    this.url_allCustomer = this.url+"ScnController/getAllCustomer";
    this.url_save = this.url+"ScnController/store";

    this.url_onlyCategory = this.url+"ScnController/getOnlyCategory";
    this.url_uploadXls = this.url+"ScnController/store_excel";
  }

  perTreg(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_perTreg, options)
      .map((response: Response) => response.json());
  }

  perTregCustomer(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_perTregCustomer, options)
      .map((response: Response) => response.json());
  }

  byTreg(treg): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_byTreg+'/'+treg, options)
      .map((response: Response) => response.json());
  }

  allCustomer(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_allCustomer, options)
      .map((response: Response) => response.json());
  }


  save(scn) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_save, JSON.stringify(scn), options)
      .map(res => res);
  }


  onlyCategory(category): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_onlyCategory+'/'+category, options)
      .map((response: Response) => response.json());
  }


//  uploadXls(formData) {
//    
//    let headers = new Headers();
//    /** In Angular 5, including the header Content-Type can invalidate your request */
//    headers.append("Content-type","multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));
//    headers.append('Accept', 'application/json');
//    let options = new RequestOptions({ headers: headers });
//
//    return this.http.post(this.url_uploadXls, formData, options)
//        .map(res => res);
//        /*
//        .catch(error => Observable.throw(error))
//        .subscribe(
//            data => console.log('success'),
//            error => console.log(error)
//        ); */
//  }


  
  uploadXls(formData) {
    return this.http.post(this.url_uploadXls, formData)
            .map((response: Response) => response.json());
  }



}
