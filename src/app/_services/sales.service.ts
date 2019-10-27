import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';

@Injectable()
export class SalesService {

  private url: string;

  private url_perTregLinkOgp: string;
  private url_perTregLinkComplete: string;
  private url_perTregWifiOgp: string;
  private url_perTregWifiComplete: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) {
    this.url = settingService.getUrl();
    this.url_perTregLinkOgp = this.url+"SalesController/perTregLinkOgp";
    this.url_perTregLinkComplete = this.url+"SalesController/perTregLinkComplete";
    this.url_perTregWifiOgp = this.url+"SalesController/perTregWifiOgp";
    this.url_perTregWifiComplete = this.url+"SalesController/perTregWifiComplete";
  }

  perTregLinkOgp(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_perTregLinkOgp, options)
      .map((response: Response) => response.json());
  }

  perTregLinkComplete(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_perTregLinkComplete, options)
      .map((response: Response) => response.json());
  }

  perTregWifiOgp(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_perTregWifiOgp, options)
      .map((response: Response) => response.json());
  }

  perTregWifiComplete(): Observable<[any]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_perTregWifiComplete, options)
      .map((response: Response) => response.json());
  }

}
