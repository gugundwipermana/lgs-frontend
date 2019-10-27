import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { Observable }   from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthService }  from './auth.service';
import { User }         from '../_models/user';
import { SettingService } from './setting.service';

@Injectable()
export class UserService {

  private url: string;

  private url_all: string;
  private url_save: string;
  private url_update: string;
  private url_delete: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) { 
    this.url = settingService.getUrl();

    this.url_all = this.url+"UserController/getAll";
    this.url_save = this.url+"UserController/store";
    this.url_update = this.url+"UserController/update";
    this.url_delete = this.url+"UserController/delete";
  }

  
  getAll(): Observable<User[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_all, options)
      .map((response: Response) => response.json());
  }



  /**
   * Save...
   */

  save(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_save, JSON.stringify(user), options)
      .map(res => res);
  }

  update(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_update, JSON.stringify(user), options)
      .map(res => res);
  }

  delete(id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.url_delete+'/'+id, options)
      .map(res => res);
  }
  
}
