import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';
import { Am } from '../_models/am';

import 'rxjs/add/operator/map';

@Injectable()
export class AmService {

  private url: string;

  private url_countByTregJabatan: string;
  private url_getByTregJabatan: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();

    this.url_countByTregJabatan = this.url+"AmController/countByTregJabatan";
    this.url_getByTregJabatan = this.url+"AmController/getByTregJabatan";
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

}
