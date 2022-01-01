import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) {}

  canActivate(): boolean {
    let currentUser = this.authService.getCurrentUser();
    if(currentUser && currentUser.token) {
      return true
    } else {
      console.warn('Not logged in, reroute to /login');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
