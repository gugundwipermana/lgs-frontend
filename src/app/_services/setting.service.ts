import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

  constructor() { }

  public getUrl() {
    // return "http://10.11.12.133/lgsd/backend/index.php/api/";
    return "http://localhost:7777/dashboardLGS/api/";
  }

}
