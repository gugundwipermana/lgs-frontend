import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {

  private url: string;

  private url_countByTreg: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) {
    this.url = settingService.getUrl();

    this.url_countByTreg = this.url+"AccountController/countByTreg";
  }

  
  countByTreg(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_countByTreg, options)
      .map((response: Response) => response.json());
  }

}
