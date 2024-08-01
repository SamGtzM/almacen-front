import { Injectable } from '@angular/core';
import { ResponseI } from '../models/response.interface';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  usuario: Array<any> = [];

  us(){
    const token = localStorage.getItem('token') as string;
    const { id_usuario, email }:ResponseI = decode.jwtDecode(token);
    this.usuario = [  
      id_usuario,
      email
    ];

    return this.usuario;
  }
}