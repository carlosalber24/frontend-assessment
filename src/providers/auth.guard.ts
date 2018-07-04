import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
  constructor(private router: Router) { }

  /**
   * This method allows to prevent access from routes if user is not logged.
   */
  canActivate() {
    if (localStorage.getItem('activeUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/signin']);
    return false;
  }

  /**
   * This method allows to verify if any user is logged or not.
   */
  isLoggedIn() {
    if (localStorage.getItem('activeUser')) {
      // logged in so return true
      return true;
    } else {
      return false;
    }
  }
}