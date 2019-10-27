import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';

@Injectable()
export class OgpService {

  private url: string;

  private url_ogp: string;
  private url_ogpByType: string;
  private url_detailOgp: string;
  private url_uploadOrderNotValidXls: string;
  private url_orderNotValid: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();
    this.url_ogp = this.url+"OnGoingProcessController/totalTypeOrder";
    this.url_ogpByType = this.url+"OnGoingProcessController/totalByTypeOrder";
    this.url_detailOgp = this.url+"OnGoingProcessController/detailByTypeOrder";

    this.url_uploadOrderNotValidXls = this.url+"OnGoingProcessController/store_excel";
    this.url_orderNotValid = this.url+"OnGoingProcessController/getOrderNotValid";
  }

  
  totalTypeOrder(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_ogp, options)
      .map((response: Response) => response.json());
  }

  totalByTypeOrder(type): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_ogpByType+'/'+type, options)
      .map((response: Response) => response.json());
  }

  detailByTypeOrder(treg, type, status): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_detailOgp+'/'+treg+'/'+type+'/'+status, options)
      .map((response: Response) => response.json());
  }



  uploadOrderNotValidXls(formData) {
    return this.http.post(this.url_uploadOrderNotValidXls, formData)
            .map((response: Response) => response.json());
  }

  orderNotValid(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_orderNotValid, options)
      .map((response: Response) => response.json());
  }

}
