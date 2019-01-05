import { Injectable }			from '@angular/core';
import { Router, CanActivate }	from '@angular/router';



@Injectable()
export class AdminGuard implements CanActivate {

	constructor(
		private router: Router
	) {}

	canActivate(redirect) {
		if(localStorage.getItem('currentUser')) {
			var currentUser = JSON.parse(localStorage.getItem('currentUser'));
			if(currentUser.admin == 'y') {
				return true;
			}
		}


		if(redirect) {
			this.router.navigate(['/main']);
		}

		return false;
	}
	
}