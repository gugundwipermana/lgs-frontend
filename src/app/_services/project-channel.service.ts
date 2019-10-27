import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectChannelService {

  private url: string;

  private url_get_e_katalog: string;
  private url_get_tso: string;
  private url_get_tender: string;
  private url_get_pl: string;
  private url_get_diagram_status: string;
  private url_store_excel: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) {
    this.url = settingService.getUrl();

    this.url_get_e_katalog = this.url+"ProjectChannelController/getEKatalog"; // ($year, $month)
    this.url_get_tso = this.url+"ProjectChannelController/getTso"; // ($year, $month)
    this.url_get_tender = this.url+"ProjectChannelController/getTender"; // ($year, $month)
    this.url_get_pl = this.url+"ProjectChannelController/getPl"; // ($year, $month)
    this.url_get_diagram_status = this.url+"ProjectChannelController/getDiagramStatus"; // ($year, $month, $status)
    this.url_store_excel = this.url+"ProjectChannelController/store_excel"; // ($year, $month, $type)

  }


  getEKatalog(year, month): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_get_e_katalog+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  getTso(year, month): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_get_tso+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  getTender(year, month): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_get_tender+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  getPl(year, month): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_get_pl+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  getDiagramStatus(year, month, status): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_get_diagram_status+'/'+year+'/'+month+'/'+status, options)
      .map((response: Response) => response.json());
  }
  



  uploadXls(formData, year, month, type) {
    return this.http.post(this.url_store_excel+'/'+year+'/'+month+'/'+type, formData)
            .map((response: Response) => response.json());
  }

}
