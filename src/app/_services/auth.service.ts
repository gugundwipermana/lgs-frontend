import { Injectable } from '@angular/core';
import { SettingService } from './setting.service';

import { Http, HttpModule, Headers, Response, RequestOptions }	from '@angular/http';
import { Observable }								from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  public token: string;

	private url: string;

  	constructor(
		private http: Http,
		private settingService: SettingService) 
	{
		this.url = settingService.getUrl();
		
  		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  		this.token = currentUser && currentUser.token;
  	}

  	login(email: string, password: string): Observable<boolean> {
  		console.log(JSON.stringify({email: email, password: password}));

  		let headers = new Headers({'Content-Type': 'application/json'});
  		let options = new RequestOptions({headers: headers});

  		return this.http.post(this.url+'UserController/login', JSON.stringify({email: email, password: password}), options)
			.map((response: Response) => {
				let token = response.json() && response.json().token;
				let admin = response.json() && response.json().admin;

				if(token) {
					this.token = token;

					localStorage.setItem('currentUser', JSON.stringify({email: email, token: token, admin: admin}));
					
					return true;
				} else {
					return false;
				}
			});	
  	}

  	logout(): void {
  		this.token = null;
  		localStorage.removeItem('currentUser');
  	}

}
