import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthenticated = false
    console.log(localStorage.getItem('token'))
      if(localStorage.getItem('token')){
       isAuthenticated = true;
      }
      // console.log(isAuthenticated);
      if(!isAuthenticated){
        this.router.navigate(['/login']);
      }
    return isAuthenticated;
  }

}
