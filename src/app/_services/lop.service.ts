import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';
import { Lop } from '../_models/lop';

@Injectable()
export class LopService {

  private url: string;

  private url_all: string;
  private url_summary: string;

  private url_mitras: string;
  private url_products: string;
  private url_sources: string;

  private url_save: string;
  private url_update: string;
  private url_delete: string;

  private url_byId: string;
  private url_uploadXls: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();
    this.url_all = this.url+"LopController/getAll";
    this.url_summary = this.url+"LopController/summaryTreg";

    this.url_mitras = this.url+"LopController/getMitra";
    this.url_products = this.url+"LopController/getProduct";
    this.url_sources = this.url+"LopController/getSource";

    this.url_save = this.url+"LopController/store";
    this.url_update = this.url+"LopController/update";
    this.url_delete = this.url+"LopController/delete";

    this.url_byId = this.url+"LopController/getById";
    this.url_uploadXls = this.url+"LopController/store_excel";

  }

  getAll(): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_all, options)
      .map((response: Response) => response.json());
  }

  getSummary(): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_summary, options)
      .map((response: Response) => response.json());
  }



  getMitras(): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_mitras, options)
      .map((response: Response) => response.json());
  }

  getProducts(): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_products, options)
      .map((response: Response) => response.json());
  }

  getSources(): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_sources, options)
      .map((response: Response) => response.json());
  }





  
  /**
   * Save...
   */

  save(lop) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_save, JSON.stringify(lop), options)
      .map(res => res);
  }

  update(lop) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_update, JSON.stringify(lop), options)
      .map(res => res);
  }

  delete(id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_delete+'/'+id, options)
      .map(res => res);
  }

  
  getById(id): Observable<Lop[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_byId+"/"+id, options)
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
//

  
  uploadXls(formData) {
    return this.http.post(this.url_uploadXls, formData)
            .map((response: Response) => response.json());
  }

}
