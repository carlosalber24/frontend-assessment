import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bodyResponse } from '../helpers/user.interface';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    constructor(private httpClient: HttpClient) {
        /**
         * Set token if saved in local storage
         */
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        this.token = activeUser && activeUser.token;
    }

    /**
     * Method to log in user 
     * @param {Object} user
     * @return {boolean}
     */
    login(user:any) {
      return this.httpClient.post<bodyResponse>('/api/authenticate', user).toPromise().then(result => {
        if (result.success){
          this.storeToken(result.body.token);
          return true;
        }
        return false;
      });
    }

    /**
     * clear token remove user from local storage to log user out
     */
    logout(): void {
      this.token = null;
      localStorage.removeItem('activeUser');
			window.location.href = '/';
    }

    /**
     * Store token in activeUser local item
     * @param {String} token
     */
		storeToken(token) {
			localStorage.setItem('activeUser', JSON.stringify({ token: token }));
    }
}
