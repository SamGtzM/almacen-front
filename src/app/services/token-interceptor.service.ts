import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept( req:any, next:any ){

  const token = localStorage.getItem('token') as string;
    const tokenHeader = req.clone({

      setHeaders: {
        Authorization: `Bearer ${token}`
      }

    });

    return next.handle(tokenHeader);
    
  }

  constructor() { }
}


