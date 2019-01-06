import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';
import { Treg } from '../_models/treg';

@Injectable()
export class TregService {

  private url: string;

  private url_all: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();
    this.url_all = this.url+"TregController/getAll";
  }

  
  getAll(): Observable<Treg[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_all, options)
      .map((response: Response) => response.json());
  }

}
