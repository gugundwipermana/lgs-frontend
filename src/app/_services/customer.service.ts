import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';
import { Customer } from '../_models/customer';

@Injectable()
export class CustomerService {

  private url: string;

  private url_countByTregType: string;
  private url_getByTregType: string;
  private url_getByWitel: string;

  private url_searchByName: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) {
    this.url = settingService.getUrl();

    this.url_countByTregType = this.url+"CustomerController/countByTregType";
    this.url_getByTregType = this.url+"CustomerController/getByTregType";
    this.url_getByWitel = this.url+"CustomerController/getByWitel";

    this.url_searchByName = this.url+"CustomerController/searchByName";
   }


   
  countByTregType(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_countByTregType, options)
      .map((response: Response) => response.json());
  }

  getByTregType(treg, type): Observable<Customer[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getByTregType+"/"+treg+"/"+type, options)
      .map((response: Response) => response.json());
  }

  getByWitel(witel): Observable<Customer[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getByWitel+"/"+witel, options)
      .map((response: Response) => response.json());
  }

  searchByName(val): Observable<Customer[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_searchByName+'/'+val, options)
      .map((response: Response) => response.json());
  }
}
