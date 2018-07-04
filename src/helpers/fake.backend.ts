import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Users } from '../database/users';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
 
            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {

                let info = {
                  success: false,
                  err: 'Username or Password incorrect.',
                  body: {} 
                };
                // find if any user matches login credentials
                let filteredUser = Users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });
 
                if (filteredUser.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUser[0];
                    info.success = true;
                    info.err = null;
                    info.body = {
                      id: user.id,
                      username: user.username,
                      token: 'fake-jwt-token'
                    };
 
                    return Observable.of(new HttpResponse({ status: 200, body: info }));
                } else {
                    // else return 400 bad request
                    return Observable.of(new HttpResponse({ status: 400, body: info }));
                }
            }
 
            // pass through any requests not handled above
            return next.handle(request);
             
        })
 
        // call materialize and dematerialize to ensure delay even if an error is thrown
        .materialize()
        .delay(500)
        .dematerialize();
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};