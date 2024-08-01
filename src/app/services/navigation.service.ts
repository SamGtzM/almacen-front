import { Injectable } from '@angular/core';
import { ResponseI } from '../models/response.interface';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  listInfo: Array<any> = []; 

  info(){
    const token = localStorage.getItem('token') as string;
    const { id_usuario, usuario, id_acceso }:ResponseI = decode.jwtDecode(token);
    this.listInfo = [  
      id_usuario,
      usuario,
      id_acceso
    ];

    return this.listInfo;
  }

}
