import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepted");
    // Get the auth token from local storage.
    const token = localStorage.getItem('token');

    // Clone the request and add the authorization header if token is present.
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(clonedRequest);
    }

    // If no token, continue the request without modifying it.
    return next.handle(req);
  }
}
