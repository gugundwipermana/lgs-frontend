import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../_services/auth.service';
import { Router }		        from '@angular/router';

@Component({
  selector: 'app-gir-header',
  templateUrl: './gir-header.component.html',
  styleUrls: ['./gir-header.component.css']
})
export class GirHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
  }


  
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
