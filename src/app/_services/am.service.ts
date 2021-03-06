import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';
import { Am } from '../_models/am';

import 'rxjs/add/operator/map';
import { AmCustomer } from '../_models/am-customer';

@Injectable()
export class AmService {

  private url: string;

  private url_countByTregJabatan: string;
  private url_getByTregJabatan: string;
  private url_byId: string;
  private url_byAm: string;
  private url_getByWitel: string;
  private url_searchByName: string;

  private url_save: string;
  private url_update: string;
  private url_delete: string;
  private url_upload: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();

    this.url_countByTregJabatan = this.url+"AmController/countByTregJabatan";
    this.url_getByTregJabatan = this.url+"AmController/getByTregJabatan";
    this.url_byId = this.url+"AmController/getById";
    this.url_byAm = this.url+"AmController/getBy/AM_ID";
    this.url_getByWitel = this.url+"AmController/getByWitel";
    this.url_searchByName = this.url+"AmController/searchByName";

    this.url_save = this.url+"AmController/store";
    this.url_update = this.url+"AmController/update";
    this.url_delete = this.url+"AmController/delete";
    this.url_upload = this.url+"AmController/upload";
  }


  
  countByTregJabatan(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_countByTregJabatan, options)
      .map((response: Response) => response.json());
  }

  getByTregJabatan(treg, jabatan_id, year, month_start, month_end): Observable<Am[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getByTregJabatan+'/'+treg+'/'+jabatan_id+'/'+year+'/'+month_start+'/'+month_end, options)
      .map((response: Response) => response.json());
  }



  
  getById(id): Observable<Am[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_byId+"/"+id, options)
      .map((response: Response) => response.json());
  }

  
  getByAm(am_id): Observable<AmCustomer[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_byAm+"/"+am_id, options)
      .map((response: Response) => response.json());
  }

  
  getByWitel(witel_id): Observable<Am[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getByWitel+"/"+witel_id, options)
      .map((response: Response) => response.json());
  }

  searchByName(val, year, month_start, month_end, treg): Observable<Am[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_searchByName+'/'+val+'/'+year+'/'+month_start+'/'+month_end+'/'+treg, options)
      .map((response: Response) => response.json());
  }



  
  /**
   * Save...
   */

  save(am) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_save, JSON.stringify(am), options)
      .map(res => res);
  }

  update(am) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_update, JSON.stringify(am), options)
      .map(res => res);
  }

  delete(id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_delete+'/'+id, options)
      .map(res => res);
  }

  
  upload(formData) {
    return this.http.post(this.url_upload, formData)
      .map((response: Response) => response.json());
  }


}
