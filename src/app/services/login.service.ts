import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development'
import { loginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.url;

  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelperService,
    private router:Router
  ) { }

  singin(user:loginI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/auth/singin`, user)
  }

  
  isAuth():boolean{
    const token = localStorage.getItem('token') as string;
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  public logout() {
    localStorage.removeItem('token') ;
    this.router.navigate(['/login']);
  }
}
