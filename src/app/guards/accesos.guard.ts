import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import decode from 'jwt-decode';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AccesosGuard implements CanActivate {
  
  constructor(
    private LoginService: LoginService,
    public router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot):boolean{

    if (!this.LoginService.isAuth()) {
      console.log('Token no es válido o ya expiró');
      this.router.navigate(['login']);
      return false;
    } else {
      const expectedRole = route.data['expectedRole'];
      const token = localStorage.getItem('token') as string;
      const { id_acceso }:ResponseI = decode.jwtDecode(token);
      if (!expectedRole.includes(id_acceso)) {
        console.log('Usuario no autorizado para la vista');
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }

  }
  
}
