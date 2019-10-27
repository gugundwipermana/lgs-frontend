import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

  constructor() { }

  public getUrl() {
    // return "http://10.11.12.133/lgsd/backend/index.php/api/";
    // return "https://localhost:7778/dashboardLGS/api/";
    return "http://10.11.12.60/dashboard_backend/index.php/api/";
  }

}
