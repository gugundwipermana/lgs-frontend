import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public model: any = {};
  public loading = false;
  public error = '';

  hide = true;

  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor(
    public authService: AuthService,
    public router: Router,
    public authGuard: AuthGuard
  ) { }

  ngOnInit() {
    
    // add the the body classes
    // this.body.classList.add('hold-transition');
    this.body.classList.add('login-page');

    // jika sudah login, alihkan ke '/'
    if(this.authGuard.canActivate(null) == true) {
      console.log('Sudah login');
      this.router.navigate(['/gir/home']);
    }
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.EMAIL, this.model.PASSWORD)
      .subscribe(result => {
        if(result === true) {

          this.body.classList.remove('login-page');

          this.router.navigate(['/gir/home']);

          this.model.EMAIL = '';
          this.model.PASSWORD = '';

          // get user in parent component
          // this.app.getUser();

          // location.reload();

        } else {
          this.error = "Username or Password is incorrect!";
        }

        this.loading = false;
      });
  }

}
