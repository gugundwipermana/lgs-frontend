import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';

@Injectable()
export class EndContractService {

  private url: string;

  private url_end: string;
  private url_endByType: string;
  private url_detailEnd: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) {
    this.url = settingService.getUrl();
    this.url_end = this.url+"EndContractController/totalTypeOrder";
    this.url_endByType = this.url+"EndContractController/totalByTypeOrder";
    this.url_detailEnd = this.url+"EndContractController/detailByTypeOrder";
  }

  totalTypeOrder(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_end, options)
      .map((response: Response) => response.json());
  }

  totalByTypeOrder(type): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_endByType+'/'+type, options)
      .map((response: Response) => response.json());
  }

  detailByTypeOrder(treg, type, status): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_detailEnd+'/'+treg+'/'+type+'/'+status, options)
      .map((response: Response) => response.json());
  }

}
