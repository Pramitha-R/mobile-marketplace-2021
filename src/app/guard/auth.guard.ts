import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('user');
    if(user && user !== null && user !== 'null'){
      let currentUser = JSON.parse(user);
      if(currentUser.emailVerified){
        return true;
      }
      else{
        this.router.navigateByUrl('/register');
        return false;
      }
    }

    this.router.navigateByUrl('/login');
    return false;
  }
  
}
