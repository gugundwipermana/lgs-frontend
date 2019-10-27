import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { AuthService } from './auth.service';
import { SettingService } from './setting.service';
import { Observable } from 'rxjs';

@Injectable()
export class PiutangService {

  private url: string;

  private url_top: string;
  private url_getPerTreg: string;
  private url_besarPu: string;
  private url_umurPu: string;
  private url_store_excel: string;
  private url_top_koreksi: string;
  private url_getPerTreg_koreksi: string;
  private url_store_excel_koreksi: string;
  private url_summary: string;
  private url_range: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private settingService: SettingService
  ) {
    
    this.url = settingService.getUrl();

    this.url_top = this.url+"PiutangController/top";
    this.url_getPerTreg = this.url+"PiutangController/getPerTreg";
    this.url_besarPu = this.url+"PiutangController/besarPu";
    this.url_umurPu = this.url+"PiutangController/umurPu";
    this.url_store_excel = this.url+"PiutangController/store_siska_excel";
    this.url_top_koreksi = this.url+"KoreksiController/top";
    this.url_getPerTreg_koreksi = this.url+"KoreksiController/getPerTreg";
    this.url_store_excel_koreksi = this.url+"KoreksiController/store_siska_excel";
    this.url_summary = this.url+'PiutangController/summary';
    this.url_range = this.url+'PiutangController/getRange';
  }


  top (year, month, jumlah) : Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_top+'/'+year+'/'+month+'/'+jumlah, options)
      .map((response: Response) => response.json());
  }

  getPerTreg (year, month) : Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getPerTreg+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  besarPu (year, month) : Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_besarPu+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  umurPu (year, month) : Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_umurPu+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  topKoreksi (year, month, jumlah) : Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_top_koreksi+'/'+year+'/'+month+'/'+jumlah, options)
      .map((response: Response) => response.json());
  }

  getPerTregKoreksi (year, month) : Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_getPerTreg_koreksi+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }

  getSummary (year, month) : Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_summary+'/'+year+'/'+month, options)
      .map((response: Response) => response.json());
  }



  getRange (year_start, month_start, year_end, month_end) : Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.url_range+'/'+year_start+'/'+month_start+'/'+year_end+'/'+month_end, options)
      .map((response: Response) => response.json());
  }



  

  uploadXls(formData, year, month) {
    return this.http.post(this.url_store_excel+'/'+year+'/'+month, formData)
            .map((response: Response) => response.json());
  }

  uploadXlsKoreksi(formData, year, month) {
    return this.http.post(this.url_store_excel_koreksi+'/'+year+'/'+month, formData)
            .map((response: Response) => response.json());
  }

}
