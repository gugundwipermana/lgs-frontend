import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';
import { Witel } from '../_models/witel';

@Injectable()
export class WitelService {

  private url: string;

  private url_byTreg: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();

    this.url_byTreg = this.url+"WitelController/getByTreg";
  }

  getByTreg(treg): Observable<Witel[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_byTreg+"/"+treg, options)
      .map((response: Response) => response.json());
  }

}
